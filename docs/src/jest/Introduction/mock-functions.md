---
id: mock-functions
title: Mock Functions
---

# Les fonctions simulées

Les fonctions fictives vous permettent de tester les liens entre les codes en effaçant l'implémentation réelle d'une fonction, en capturant les appels à la fonction (et les paramètres passés dans ces appels), en capturant des instances de fonctions du constructeur lorsqu'elles sont instanciées avec `new`, et en permettant la configuration des valeurs de retour au moment du test.

Il y a deux façons de simuler des fonctions : Soit en créant une fonction fictive à utiliser dans le code de test, soit en écrivant un [`manual mock`](ManualMocks.md) pour remplacer une dépendance de module.

## Utilisation d'une fonction fictive

Imaginons que nous testions une implémentation d'une fonction "forEach", qui invoque un rappel pour chaque élément d'un tableau fourni.

```javascript
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
```

Pour tester cette fonction, nous pouvons utiliser une fonction fictive, et inspecter l'état de la fonction fictive pour nous assurer que le rappel est invoqué comme prévu.

```javascript
const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);

// La fonction de simulation est appelée deux fois
expect(mockCallback.mock.calls.length).toBe(2);

// Le premier argument du premier appel à la fonction était 0
expect(mockCallback.mock.calls[0][0]).toBe(0);

// Le premier argument du deuxième appel à la fonction était 1
expect(mockCallback.mock.calls[1][0]).toBe(1);

// La valeur de retour du premier appel à la fonction était de 42
expect(mockCallback.mock.results[0].value).toBe(42);
```

## La propriété `.mock`

Toutes les fonctions fictives ont cette propriété spéciale ".mock", qui est l'endroit où sont conservées les données sur la façon dont la fonction a été appelée et sur la fonction renvoyée. La propriété `.mock` suit également la valeur de `this` pour chaque appel, il est donc possible de l'inspecter également :

```javascript
const myMock = jest.fn();

const a = new myMock();
const b = {};
const bound = myMock.bind(b);
bound();

console.log(myMock.mock.instances);
// > [ <a>, <b> ]
```

Ces membres fictifs sont très utiles dans les tests visant à affirmer comment ces fonctions sont appelées, instanciées ou ce qu'elles renvoient :

```javascript
// La fonction a été appelée exactement une fois
expect(someMockFunction.mock.calls.length).toBe(1);

// Le premier arg du premier appel à la fonction était "first arg".
expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

// Le second arg du premier appel à la fonction était "second arg".
expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

// La valeur de retour du premier appel à la fonction était "return value".
expect(someMockFunction.mock.results[0].value).toBe('return value');

// Cette fonction a été instanciée exactement deux fois.
expect(someMockFunction.mock.instances.length).toBe(2);

// L'objet retourné par la première instanciation de cette fonction
// avait une propriété "nom" dont la valeur était fixée à "test
expect(someMockFunction.mock.instances[0].name).toEqual('test');
```

## Valeurs de rendement fictives

Les fonctions de simulation peuvent également être utilisées pour injecter des valeurs de test dans votre code pendant un test :

```javascript
const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
```

Les fonctions fictives sont également très efficaces dans un code qui utilise un style de passage de continuation fonctionnel. Le code écrit dans ce style permet d'éviter d'avoir recours à des stubs compliqués qui recréent le comportement du composant réel qu'ils remplacent, au profit de l'injection de valeurs directement dans le test juste avant leur utilisation.

```javascript
const filterTestFn = jest.fn();

// Rendre le faux retour "vrai" pour le premier appel,
// et "faux" pour le deuxième appel
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

const result = [11, 12].filter(num => filterTestFn(num));

console.log(result);
// > [11]
console.log(filterTestFn.mock.calls);
// > [ [11], [12] ]
```

La plupart des exemples réels consistent en fait à mettre la main sur une fonction fictive d'un composant dépendant et à la configurer, mais la technique est la même. Dans ces cas, essayez d'éviter la tentation de mettre en œuvre une logique à l'intérieur d'une fonction qui n'est pas directement testée.

## Modules de simulations

Supposons que nous ayons une classe qui récupère les utilisateurs de notre API. La classe utilise [axios](https://github.com/axios/axios) pour appeler l'API puis renvoie l'attribut "data" qui contient tous les utilisateurs :

```js
// users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;
```

Maintenant, afin de tester cette méthode sans toucher à l'API (et donc créer des tests lents et fragiles), nous pouvons utiliser la fonction `jest.mock(...)` pour simuler automatiquement le module axios.

Une fois le module simulé, nous pouvons fournir une `mockResolvedValue` pour `.get` qui renvoie les données sur lesquelles nous voulons que notre test s'appuie. En fait, nous disons que nous voulons que axios.get('/users.json') renvoie une fausse réponse.

```js
// users.test.js
import axios from 'axios';
import Users from './users';

jest.mock('axios');

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // ou vous pourriez utiliser les éléments suivants en fonction de votre cas d'utilisation :
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));
});
```

## Mises en œuvre simulées

Néanmoins, il y a des cas où il est utile d'aller au-delà de la capacité à spécifier des valeurs de retour et de remplacer complètement la mise en œuvre d'une fonction fictive. Cela peut être fait avec `jest.fn` ou la méthode `mockImplementationOnce` sur les fonctions fantaisies.

```javascript
const myMockFn = jest.fn(cb => cb(null, true));

myMockFn((err, val) => console.log(val));
// > true
```

La méthode "mockImplementation" est utile lorsque vous avez besoin de définir l'implémentation par défaut d'une fonction fictive qui est créée à partir d'un autre module :

```js
// foo.js
module.exports = function () {
  // une certaine mise en œuvre ;
};

// test.js
jest.mock('../foo'); // cela se produit automatiquement avec l'automatisation
const foo = require('../foo');

// foo est une fonction simulée
foo.mockImplementation(() => 42);
foo();
// > 42
```

Lorsque vous avez besoin de recréer un comportement complexe d'une fonction fictive tel que de multiples appels de fonction produisent des résultats différents, utilisez la méthode "mockImplementationOnce" :

```javascript
const myMockFn = jest
  .fn()
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));

myMockFn((err, val) => console.log(val));
// > true

myMockFn((err, val) => console.log(val));
// > false
```

Lorsque la fonction simulée est à court d'implémentations définies avec `mockImplementationOnce`, elle exécutera l'ensemble d'implémentations par défaut avec `jest.fn` (si elle est définie) :

```javascript
const myMockFn = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
// > 'first call', 'second call', 'default', 'default'
```

Pour les cas où nous avons des méthodes qui sont typiquement enchaînées (et donc qui doivent toujours retourner `this`), nous avons une API sucrée pour simplifier cela sous la forme d'une fonction `mockReturnThis()` qui se trouve également sur tous les mocks :

```javascript
const myObj = {
  myMethod: jest.fn().mockReturnThis(),
};

// est la même que

const otherObj = {
  myMethod: jest.fn(function () {
    return this;
  }),
};
```

## Noms fictifs

Vous pouvez éventuellement fournir un nom pour vos fonctions fictives, qui sera affiché à la place de "jest.fn()" dans la sortie d'erreur du test. Utilisez cette option si vous souhaitez pouvoir identifier rapidement la fonction fictive qui signale une erreur dans votre sortie de test.

```javascript
const myMockFn = jest
  .fn()
  .mockReturnValue('default')
  .mockImplementation(scalar => 42 + scalar)
  .mockName('add42');
```

## Matchers personnalisés

Enfin, pour qu'il soit moins exigeant d'affirmer comment les fonctions fictives ont été appelées, nous avons ajouté quelques fonctions de correspondance personnalisées pour vous :

```javascript
// La fonction de simulation a été appelée au moins une fois
expect(mockFunc).toHaveBeenCalled();

// La fonction fantaisie a été appelée au moins une fois avec les args spécifiés
expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);

// Le dernier appel à la fonction fantaisie a été appelé avec les args spécifiés
expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);

// Tous les appels et le nom du mock est écrit comme un instantané
expect(mockFunc).toMatchSnapshot();
```

Ces allumettes sont du sucre pour les formes courantes d'inspection de la propriété `.mock`. Vous pouvez toujours le faire vous-même manuellement si cela vous convient mieux ou si vous devez faire quelque chose de plus spécifique :

```javascript
// La fonction de simulation a été appelée au moins une fois
expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

// La fonction fantaisie a été appelée au moins une fois avec les args spécifiés
expect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);

// Le dernier appel à la fonction fantaisie a été appelé avec les args spécifiés
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
  arg1,
  arg2,
]);

// Le premier argument du dernier appel à la fonction de simulation était "42".
// (notez qu'il n'y a pas d'aide en sucre pour cette spécificité d'une affirmation)
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);

// Un snapshot vérifiera qu'un mock a été invoqué le même nombre de fois,
// dans le même ordre, avec les mêmes arguments. Elle s'affirmera également sur le nom.
expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);
expect(mockFunc.getMockName()).toBe('a mock name');
```

Pour une liste complète des correspondants, consultez les [documents de référence] (ExpectAPI.md).
