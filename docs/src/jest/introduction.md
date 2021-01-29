
# Pour commencer

Installez Jest en utilisant[`yarn`](https://yarnpkg.com/en/package/jest):

```bash
yarn add --dev jest
```

Ou [`npm`](https://www.npmjs.com/):

```bash
npm install --save-dev jest
```

Note : La documentation de Jest utilise les commandes `yarn`, mais `npm` fonctionne également. Vous pouvez comparer les commandes `yarn` et `npm` dans la [docs yarn, ici] (https://yarnpkg.com/en/docs/migrating-from-npm#toc-cli-commands-comparison).

Commençons par écrire un test pour une fonction hypothétique qui additionne deux nombres. Tout d'abord, créez un fichier `sum.js` :

```javascript
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

Ensuite, créez un fichier nommé "sum.test.js". Celui-ci contiendra notre test réel :

```javascript
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Ajoutez la section suivante à votre `package.json` :

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Enfin, lancez `yarn test` ou `npm run test` et Jest imprimera ce message :

```bash
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
```

**Vous venez de réussir votre premier test avec Jest!**

Ce test utilisait `expect` et `to Be` pour vérifier que deux valeurs étaient exactement identiques. Pour en savoir plus sur les autres choses que Jest peut tester, voir [Using Matchers](UsingMatchers.md).

## En ligne de commande

Vous pouvez exécuter Jest directement depuis le CLI (s'il est disponible globalement dans votre `PATH`, par exemple par `yarn global add jest` ou `npm install jest --global`) avec une variété d'options utiles.

Voici comment exécuter Jest sur des fichiers correspondant à `my-test`, en utilisant `config.json` comme fichier de configuration et en affichant une notification native du système d'exploitation après l'exécution :

```bash
jest my-test --notify --config=config.json
```

Si vous souhaitez en savoir plus sur l'exécution de `jest` en ligne de commande, consultez la page [Jest CLI Options](CLI.md).

## Configuration supplémentaire

### Générer un fichier de configuration de base

En fonction de votre projet, Jest vous posera quelques questions et créera un fichier de configuration de base avec une brève description de chaque option :

```bash
jest --init
```

### Utiliser Babel

Pour utiliser [Babel](http://babeljs.io/), installez les dépendances requises via `yarn` :

```bash
yarn add --dev babel-jest @babel/core @babel/preset-env
```

Configurez Babel pour cibler votre version actuelle de Node en créant un fichier `babel.config.js` à la racine de votre projet :

```javascript
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```

**La configuration idéale pour Babel dépendra de votre projet ** Voir [Babel's docs] (https://babeljs.io/docs/en/) pour plus de détails.

<details><summary markdown="span"><strong>Making your Babel config jest-aware</strong></summary>

Jest va mettre `process.env.NODE_ENV` à `'test'` si ce n'est pas mis à un autre niveau. Vous pouvez utiliser cela dans votre configuration pour ne mettre en place que la compilation nécessaire à Jest, par exemple :

```javascript
// babel.config.js
module.exports = api => {
  const isTest = api.env('test');
  // Vous pouvez utiliser isTest pour déterminer les préréglages et les plugins à utiliser.

  return {
    // ...
  };
};
```

> Note : `babel-jest` est automatiquement installé lors de l'installation de Jest et transformera automatiquement les fichiers si une configuration babel existe dans votre projet. Pour éviter ce comportement, vous pouvez explicitement réinitialiser l'option de configuration `transform` :

```javascript
// jest.config.js
module.exports = {
  transform: {},
};
```

</details>

<details><summary markdown="span"><strong>Babel 6 support</strong></summary>

Jest 24 a abandonné son soutien à Babel 6. Nous vous recommandons vivement de passer à Babel 7, qui est activement maintenu. Toutefois, si vous ne pouvez pas passer à Babel 7, continuez à utiliser Jest 23 ou passez à Jest 24 avec "babel-jest" verrouillé à la version 23, comme dans l'exemple ci-dessous :

```
"dependencies": {
  "babel-core": "^6.26.3",
  "babel-jest": "^23.6.0",
  "babel-preset-env": "^1.7.0",
  "jest": "^24.0.0"
}
```

Bien que nous recommandions généralement d'utiliser la même version de chaque paquet Jest, ce contournement vous permettra de continuer à utiliser la dernière version de Jest avec Babel 6 pour l'instant.

</details>

### Utilisation de webpack

Jest peut être utilisé dans des projets qui utilisent [webpack](https://webpack.js.org/) pour gérer les ressources, les styles et la compilation. webpack offre des défis uniques par rapport à d'autres outils. Consultez le [guide webpack] (Webpack.md) pour commencer.

### Utilisation d'un colis

Jest peut être utilisé dans des projets qui utilisent [parcel-bundler] (https://parceljs.org/) pour gérer les actifs, les styles et la compilation, comme pour le webpack. Le paquet ne nécessite aucune configuration. Consultez le site officiel [docs](https://parceljs.org/getting_started.html) pour commencer.

### Utilisation de TypeScript

Jest supporte le TypeScript, via Babel. Tout d'abord, assurez-vous que vous avez suivi les instructions ci-dessus sur [using Babel](#using-babel). Ensuite, installez le `@babel/preset-typescript` via `yarn` :

```bash
yarn add --dev @babel/preset-typescript
```

Ajoutez ensuite `@babel/preset-typescript` à la liste des presets dans votre `babel.config.js`.

```diff
// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
+    '@babel/preset-typescript',
  ],
};
```

Cependant, il existe quelques [avertissements] (https://babeljs.io/docs/en/next/babel-plugin-transform-typescript.html#caveats) concernant l'utilisation de TypeScript avec Babel. Comme la prise en charge de TypeScript dans Babel est une transposition, Jest ne vérifiera pas la typographie de vos tests au fur et à mesure qu'ils sont effectués. Si vous le souhaitez, vous pouvez utiliser [ts-jest](https://github.com/kulshekhar/ts-jest).


# Utiliser les Matchers

Jest utilise des "matchers" pour vous permettre de tester les valeurs de différentes manières. Le présent document présente quelques correspondants couramment utilisés. Pour la liste complète, voir la [``expect` API doc](ExpectAPI.md).

## Matchers communs

La façon la plus simple de tester une valeur est de la comparer à une valeur identique.

```js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```

Dans ce code, `expect(2 + 2)` renvoie un objet "expectation". Vous ne ferez généralement pas grand chose avec ces objets "expectation", sauf appeler des correspondants sur eux. Dans ce code, `.toBe(4)` est le matcher. Quand Jest s'exécute, il suit tous les matchers qui échouent afin de pouvoir imprimer de beaux messages d'erreur pour vous.

`toBe` utilise `Object.is` pour tester l'égalité exacte. Si vous voulez vérifier la valeur d'un objet, utilisez plutôt `toEqual` :

```js
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```

La fonction `toEqual` vérifie récursivement chaque champ d'un objet ou d'un tableau.

Vous pouvez également tester l'inverse d'un matcher :

```js
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
```

## Les vérités

Dans les tests, vous devez parfois faire la distinction entre "indéfini", "nul" et "faux", mais vous ne voulez parfois pas les traiter différemment. Jest contient des aides qui vous permettent d'être explicite sur ce que vous voulez.

- `toBeNull` ne correspond qu'à `null`
- `toBeUndefined` correspondent uniquement aux résultats  `undefined`
- `toBeDefined` est l'opposé de `toBeUndefined`
- `toBeTruthy` correspond à tout ce qu'une déclaration  `if` considère comme vrai
- `toBeFalsy` correspond à tout ce qu'une déclaration `if` considère comme faux

Par exemple :

```js
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
```

Vous devez utiliser l'appariement qui correspond le plus précisément à ce que vous voulez que votre code fasse.

## Les nombres

La plupart des façons de comparer les chiffres ont des équivalents correspondants.

```js
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe et toEqual sont équivalents pour les nombres
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```

Pour l'égalité en virgule flottante, utilisez `toBeCloseTo` au lieu de `toEqual`, parce que vous ne voulez pas qu'un test dépende d'une petite erreur d'arrondi.

```js
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});
```

## Les chaînes de caractères

Vous pouvez vérifier les chaînes de caractères par rapport aux expressions régulières avec `toMatch` :

```js
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```

## Les tableaux et itérables

Vous pouvez vérifier si un tableau ou un itérable contient un élément particulier en utilisant `to contain` :

```js
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
  expect(new Set(shoppingList)).toContain('beer');
});
```

## Les exceptions

Si vous voulez tester si une fonction particulière provoque une erreur lorsqu'elle est appelée, utilisez "to throw".

```js
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(Error);

  // Vous pouvez également utiliser le message d'erreur exact ou une regexp
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/);
});
```

## Et plus

Ce n'est qu'un avant-goût. Pour obtenir la liste complète des correspondants, consultez les [documents de référence] (ExpectAPI.md).

Une fois que vous avez pris connaissance des partenaires disponibles, l'étape suivante consiste à vérifier comment Jest vous permet de [tester le code asynchrone] (TestingAsyncCode.md).


# Tester le code asynchrone

Il est courant en JavaScript que le code s'exécute de manière asynchrone. Lorsque vous avez du code qui s'exécute de manière asynchrone, Jest doit savoir quand le code qu'il teste est terminé, avant de pouvoir passer à un autre test. Jest dispose de plusieurs moyens pour gérer cela.

## Rappels

Le schéma asynchrone le plus courant est celui des rappels.

Par exemple, disons que vous avez une fonction `fetchData(callback)` qui va chercher des données et appelle `callback(data)` quand elle est terminée. Vous voulez tester que les données renvoyées sont la chaîne "peanut butter".

Par défaut, les tests de Jest se terminent lorsqu'ils atteignent la fin de leur exécution. Cela signifie que ce test ne fonctionnera _pas_ comme prévu :

```js
// Don't do this!
test('the data is peanut butter', () => {
  function callback(data) {
    expect(data).toBe('peanut butter');
  }

  fetchData(callback);
});
```

Le problème est que le test se terminera dès que `fetchData` sera terminé, avant même d'appeler le rappel.

Il existe une autre forme de `test` qui résout ce problème. Au lieu de mettre le test dans une fonction avec un argument vide, utilisez un seul argument appelé `done`. Jest attendra que le callback `done` soit appelé avant de terminer le test.

```js
test('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```

Si `done()` n'est jamais appelé, le test échouera (avec une erreur de délai d'attente), ce qui est ce que vous voulez qu'il se produise.

Si l'instruction `expect` échoue, elle lance une erreur et `done()` n'est pas appelé. Si nous voulons voir dans le journal de test pourquoi il a échoué, nous devons envelopper `expect` dans un bloc `try` et passer l'erreur dans le bloc `catch` à `done`. Sinon, nous nous retrouvons avec une erreur de temporisation opaque qui ne montre pas quelle valeur a été reçue par `expect(data)`.

## Promises

Si votre code utilise des promesses, il existe un moyen plus simple de gérer les tests asynchrones. Renvoyez une promesse de votre test, et Jest attendra que cette promesse soit résolue. Si la promesse est rejetée, le test échouera automatiquement.

Par exemple, disons que `fetchData`, au lieu d'utiliser un callback, retourne une promesse qui est censée se résoudre à la chaîne ``beurre de cacahuète``. Nous pourrions le tester avec :

```js
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

Assurez-vous de renvoyer la promesse - si vous omettez cette déclaration de `return`, votre test se terminera avant que la promesse renvoyée par `fetchData` ne soit résolue et que () n'ait une chance d'exécuter le rappel.

Si vous pensez qu'une promesse va être rejetée, utilisez la méthode `.catch`. Veillez à ajouter `expect.assertions` pour vérifier qu'un certain nombre d'affirmations sont appelées. Sinon, une promesse tenue ne sera pas rejetée.

```js
test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchData().catch(e => expect(e).toMatch('error'));
});
```

## `.resolves` / `.rejects`

Vous pouvez également utiliser le marqueur `resolves` dans votre déclaration d'attente, et Jest attendra que cette promesse se réalise. Si la promesse est rejetée, le test échouera automatiquement.

```js
test('the data is peanut butter', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});
```

Assurez-vous de renvoyer l'affirmation - si vous omettez cette déclaration `return`, votre test se terminera avant que la promesse renvoyée par `fetchData` soit résolue et que () ait une chance d'exécuter le rappel.

Si vous vous attendez à ce qu'une promesse soit rejetée, utilisez l'appariement `.rejects`. Il fonctionne de manière analogue à l'appariement `.resolves`. Si la promesse est remplie, le test échouera automatiquement.

```js
test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
});
```

## Async/Await

Vous pouvez aussi utiliser `async` et `await` dans vos tests. Pour écrire un test asynchrone, utilisez le mot-clé "asynchrone" devant la fonction passée à "test". Par exemple, le même scénario `fetchData` peut être testé avec :


```js
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```

Vous pouvez combiner `async` et `await` avec `.resolves` ou `.rejects`.

```js
test('the data is peanut butter', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  await expect(fetchData()).rejects.toThrow('error');
});
```

Dans ces cas, les termes `async` et `await` sont en fait des sucres syntaxiques pour la même logique que celle utilisée dans l'exemple des promesses.

Aucune de ces formes n'est particulièrement supérieure aux autres, et vous pouvez les mélanger et les faire correspondre à travers une base de code ou même dans un seul fichier. Cela dépend simplement du style que vous jugez plus simple pour vos tests.


# Montage et démontage

Souvent, lors de la rédaction des tests, vous devez effectuer un certain travail de préparation avant les tests, et un travail de finition après les tests. Jest fournit des fonctions d'aide pour gérer cela.

## Répétition de la mise en place pour de nombreux tests

Si vous avez un travail à faire de manière répétitive pour de nombreux tests, vous pouvez utiliser les fonctions `beforeEach` et `afterEach`.

Par exemple, disons que plusieurs tests interagissent avec une base de données de villes. Vous avez une méthode `initializeCityDatabase()` qui doit être appelée avant chacun de ces tests, et une méthode `clearCityDatabase()` qui doit être appelée après chacun de ces tests. Vous pouvez faire cela avec :

```js
beforeEach(() => {
  initializeCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```

Les fonctions `beforeEach` et `afterEach` peuvent traiter le code asynchrone de la même manière que [les tests peuvent traiter le code asynchrone] (TestingAsyncCode.md) - ils peuvent soit prendre un paramètre `done`, soit renvoyer une promesse. Par exemple, si `initializeCityDatabase()` renvoie une promesse qui s'est résolue lors de l'initialisation de la base de données, nous voudrions renvoyer cette promesse :

```js
beforeEach(() => {
  return initializeCityDatabase();
});
```

## Configuration unique

Dans certains cas, vous ne devez effectuer la configuration qu'une seule fois, au début d'un fichier. Cela peut être particulièrement gênant lorsque la configuration est asynchrone, et que vous ne pouvez donc pas la faire en ligne. Jest fournit des fonctions `beforeAll` et `afterAll` pour gérer cette situation.

Par exemple, si `initializeCityDatabase` et `clearCityDatabase` nous ont tous deux fait des promesses, et que la base de données des villes peut être réutilisée entre les tests, nous pourrions changer notre code de test en :

```js
beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```

## Champ d'application

Par défaut, les blocs `before` and `after` s'appliquent à tous les tests d'un fichier. Vous pouvez également regrouper les tests en utilisant un bloc "description". Lorsqu'ils sont à l'intérieur d'un bloc `describe`, les blocs `before` et `after` s'appliquent uniquement aux tests à l'intérieur de ce bloc `describe`.

Par exemple, disons que nous n'avons pas seulement une base de données de villes, mais aussi une base de données d'aliments. Nous pourrions faire différentes configurations pour différents tests :

```js
// S'applique à tous les tests de ce dossier
beforeEach(() => {
  return initializeCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});

describe('matching cities to foods', () => {
  // Ne s'applique qu'aux tests de ce bloc de description
  beforeEach(() => {
    return initializeFoodDatabase();
  });

  test('Vienna <3 sausage', () => {
    expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
  });

  test('San Juan <3 plantains', () => {
    expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
  });
});
```

_Notez que le niveau supérieur `beforeEach` est exécuté avant le `beforeEach` à l'intérieur du bloc `describe`. Cela peut aider à illustrer l'ordre d'exécution de tous les crochets._

```js
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```

## Ordre d'exécution des blocs de description et de test

Jest exécute tous les gestionnaires de description dans un fichier de test _before_ qu'il n'exécute un des tests réels. C'est une autre raison de faire la configuration et le démontage à l'intérieur des gestionnaires  `before*` et `after*` plutôt qu'à l'intérieur des blocs de description. Une fois que les blocs de description sont complets, par défaut Jest exécute tous les tests en série dans l'ordre où ils ont été rencontrés lors de la phase de collecte, en attendant que chacun d'entre eux soit terminé et mis en ordre avant de continuer.

Considérez le fichier de test et la sortie illustrés ci-dessous :

```js
describe('outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');
    test('test 1', () => {
      console.log('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  console.log('describe outer-b');

  test('test 1', () => {
    console.log('test for describe outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    console.log('describe inner 2');
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2');
      expect(false).toEqual(false);
    });
  });

  console.log('describe outer-c');
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2
```

## Conseils généraux

Si un test échoue, l'une des premières choses à vérifier est de savoir si le test échoue alors que c'est le seul qui fonctionne. Pour exécuter un seul test avec Jest, changez temporairement la commande "test" en "test.only" :

```js
test.only('this will be the only test that runs', () => {
  expect(true).toBe(false);
});

test('this test will not run', () => {
  expect('A').toBe('A');
});
```

Si vous avez un test qui échoue souvent lorsqu'il est exécuté dans le cadre d'une suite plus large, mais qui n'échoue pas lorsque vous l'exécutez seul, il y a fort à parier que quelque chose d'un autre test interfère avec celui-ci. Vous pouvez souvent résoudre ce problème en effaçant un état partagé avec `beforeEach`. Si vous n'êtes pas sûr qu'un état partagé est modifié, vous pouvez aussi essayer un `beforeEach` qui enregistre les données.


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


# La plateforme Jest

Vous pouvez choisir des caractéristiques spécifiques de Jest et les utiliser comme des ensembles autonomes. Voici une liste des paquets disponibles :

## jest-changed-files

Outil permettant d'identifier les fichiers modifiés dans un dépôt git/hg. Exporte deux fonctions :

- `getChangedFilesForRoots` retourne une promesse qui se résout à un objet avec les fichiers et les repos modifiés.
- `findRepos` renvoie une promesse qui se résout à un ensemble de dépôts contenus dans le chemin spécifié.

#### Exemple

```javascript
const {getChangedFilesForRoots} = require('jest-changed-files');

// imprimer l'ensemble des fichiers modifiés depuis le dernier commit dans le repo en cours
getChangedFilesForRoots(['./'], {
  lastCommit: true,
}).then(result => console.log(result.changedFiles));
```

Vous pouvez en savoir plus sur les fichiers "jest-changed-files" dans le [fichier readme] (https://github.com/facebook/jest/blob/master/packages/jest-changed-files/README.md).

## jest-diff

Outil permettant de visualiser les changements de données. Exporte une fonction qui compare deux valeurs de n'importe quel type et renvoie une chaîne "joliment imprimée" illustrant la différence entre les deux arguments.

#### Exemple

```javascript
const diff = require('jest-diff').default;

const a = {a: {b: {c: 5}}};
const b = {a: {b: {c: 6}}};

const result = diff(a, b);

// visualisation de la différence
console.log(result);
```

## jest-docblock

Outil permettant d'extraire et d'analyser les commentaires en haut d'un fichier JavaScript. Exporte diverses fonctions pour manipuler les données à l'intérieur du bloc de commentaires.

#### Exemple

```javascript
const {parseWithComments} = require('jest-docblock');

const code = `
/**
 * This is a sample
 *
 * @flow
 */

 console.log('Hello World!');
`;

const parsed = parseWithComments(code);

// imprime un objet avec deux attributs : les commentaires et les pragmas.
console.log(parsed);
```

Vous pouvez en savoir plus sur le "jest-docblock" dans le [fichier readme] (https://github.com/facebook/jest/blob/master/packages/jest-docblock/README.md).

## jest-get-type

Module qui identifie le type primitif de toute valeur JavaScript. Exporte une fonction qui renvoie une chaîne de caractères avec le type de la valeur passée en argument.

#### Exemple

```javascript
const getType = require('jest-get-type');

const array = [1, 2, 3];
const nullValue = null;
const undefinedValue = undefined;

// prints 'array'
console.log(getType(array));
// prints 'null'
console.log(getType(nullValue));
// prints 'undefined'
console.log(getType(undefinedValue));
```

## jest-validate

Outil de validation des configurations soumises par les utilisateurs. Exporte une fonction qui prend deux arguments : la configuration de l'utilisateur et un objet contenant un exemple de configuration et d'autres options. La valeur de retour est un objet avec deux attributs :

- `hasDeprecationWarnings`un booléen indiquant si la configuration soumise comporte des avertissements de déprédation,
- `isValid`, un booléen indiquant si la configuration est correcte ou non.

#### Exemple

```javascript
const {validate} = require('jest-validate');

const configByUser = {
  transform: '<rootDir>/node_modules/my-custom-transform',
};

const result = validate(configByUser, {
  comment: '  Documentation: http://custom-docs.com',
  exampleConfig: {transform: '<rootDir>/node_modules/babel-jest'},
});

console.log(result);
```

Vous pouvez en savoir plus sur `jest-validate` dans le [fichier readme] (https://github.com/facebook/jest/blob/master/packages/jest-validate/README.md).

## jest-worker

Module utilisé pour la parallélisation des tâches. Exporte une classe `JestWorker` qui prend le chemin du module Node.js et vous permet d'appeler les méthodes exportées du module comme si elles étaient des méthodes de classe, en retournant une promesse qui se résout lorsque la méthode spécifiée termine son exécution dans un processus bifurqué.

#### Exemple

```javascript
// heavy-task.js

module.exports = {
  myHeavyTask: args => {
    // long running CPU intensive task.
  },
};
```

```javascript
// main.js

async function main() {
  const worker = new Worker(require.resolve('./heavy-task.js'));

  // exécuter 2 tâches en parallèle avec des arguments différents
  const results = await Promise.all([
    worker.myHeavyTask({foo: 'bar'}),
    worker.myHeavyTask({bar: 'foo'}),
  ]);

  console.log(results);
}

main();
```

Vous pouvez en savoir plus sur le `jest-worker` dans le [fichier readme] (https://github.com/facebook/jest/blob/master/packages/jest-worker/README.md).

## pretty-format

Exporte une fonction qui convertit toute valeur JavaScript en une chaîne lisible par l'homme. Prend en charge tous les types de JavaScript intégrés dès le départ et permet l'extension pour des types d'applications spécifiques via des plugins définis par l'utilisateur.

#### Exemple

```javascript
const prettyFormat = require('pretty-format');

const val = {object: {}};
val.circularReference = val;
val[Symbol('foo')] = 'foo';
val.map = new Map([['prop', 'value']]);
val.array = [-0, Infinity, NaN];

console.log(prettyFormat(val));
```

Vous pouvez en savoir plus sur le "pretty-format" dans le [fichier readme].(https://github.com/facebook/jest/blob/master/packages/pretty-format/README.md).

# La communauté Jest

La communauté autour de Jest travaille dur pour rendre l'expérience de test encore plus grande.

La [jest-community] (https://github.com/jest-community) est une nouvelle organisation GitHub pour les ajouts de haute qualité à Jest, organisée par les mainteneurs et les collaborateurs de Jest. Il contient déjà certains de nos projets préférés, pour n'en citer que quelques-uns :

- [vscode-jest](https://github.com/jest-community/vscode-jest)
- [jest-extended](https://github.com/jest-community/jest-extended)
- [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest)
- [awesome-jest](https://github.com/jest-community/awesome-jest)

Les projets communautaires menés par une seule organisation sont un excellent moyen pour Jest d'expérimenter de nouvelles idées/techniques et approches. Encourager les contributions de la communauté et publier les contributions de manière indépendante à un rythme plus rapide.

L'organisation communautaire Jest maintient une liste [awesome-jest] (https://github.com/jest-community/awesome-jest) de grands projets et ressources liés à Jest, qui comprend tous les projets et pas seulement ceux de l'organisation communautaire Jest.


# Plus de ressources

Vous devriez maintenant avoir une bonne idée de la façon dont Jest peut vous aider à tester vos candidatures. Si vous souhaitez en savoir plus, voici quelques informations connexes que vous voudrez peut-être consulter.

## Parcourir les documents

- Découvrez [Snapshot Testing](SnapshotTesting.md), [Mock Functions](MockFunctions.md), et plus encore dans nos guides détaillés.
- Migrez vos tests existants vers Jest en suivant notre [guide de migration](MigrationGuide.md).
- Apprenez comment [configurer Jest](Configuration.md).
- Consultez la [Référence API] (GlobalAPI.md).
- [Dépannage](Dépannage.md) des problèmes avec Jest.

## Apprendre par l'exemple

Vous trouverez un certain nombre d'exemples de cas test dans le dossier [`examples`](https://github.com/facebook/jest/tree/master/examples) sur GitHub. Vous pouvez également vous inspirer des excellents tests utilisés par les projets [React](https://github.com/facebook/react/tree/master/packages/react/src/__tests__), [Relay](https://github.com/facebook/relay/tree/master/packages/react-relay/__tests__) et [React Native](https://github.com/facebook/react-native/tree/master/Libraries/Animated/src/__tests__).

## Rejoignez la communauté

Posez des questions et trouvez des réponses auprès d'autres utilisateurs de Jest comme vous. [Reactiflux](https://www.reactiflux.com/) est un chat Discord où se déroulent de nombreuses discussions sur Jest. Consultez le canal "Test".

Suivez le [compte Twitter Jest] (https://twitter.com/fbjest) et le [blog] (/blog/) pour découvrir ce qui se passe dans le monde de Jest.
