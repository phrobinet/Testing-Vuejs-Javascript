---
id: jest-object
title: The Jest Object
---

# L'objet Jest

L'objet "jest" est automatiquement dans le champ d'application de chaque fichier de test. Les méthodes de l'objet `jest` aident à créer des simulations et vous permettent de contrôler le comportement général de Jest. Il peut également être importé explicitement par l'intermédiaire de `import {jest} de '@jest/globals'.

## Modules fictifs

### `jest.disableAutomock()`

Désactive la simulation automatique dans le chargeur de modules.

> Voir la section `automock` de [configuration](Configuration.md#automock-boolean) for more information

Après l'appel de cette méthode, tous les `require()`s renverront les versions réelles de chaque module (plutôt qu'une version fictive).

Configuration de Jest :

```json
{
  "automock": true
}
```

Exemple :

```js
// utils.js
export default {
  authorize: () => {
    return 'token';
  },
};
```

```js
// __tests__/disableAutomocking.js
import utils from '../utils';

jest.disableAutomock();

test('original implementation', () => {
  // Nous avons maintenant la mise en œuvre originale,
  // même si on met l'automocking dans une configuration de Jest
  expect(utils.authorize()).toBe('token');
});
```

Cela est généralement utile lorsque vous avez un scénario dans lequel le nombre de dépendances dont vous voulez vous moquer est bien inférieur à celui des dépendances dont vous ne voulez pas. Par exemple, si vous écrivez un test pour un module qui utilise un grand nombre de dépendances qui peuvent être raisonnablement classées comme "détails d'implémentation" du module, alors vous ne voulez probablement pas vous moquer de ces dépendances.

Les exemples de dépendances qui peuvent être considérées comme des "détails d'implémentation" sont des choses qui vont de l'intégration du langage (par exemple, les méthodes Array.prototype) à des méthodes d'utilité très courantes (par exemple, les utilitaires underscore/lo-dash, array, etc) et des bibliothèques entières comme React.js.

Retourne l'objet "jest" pour le chaînage.

_Note : cette méthode était auparavant appelée `autoMockOff`. Lorsque vous utilisez `babel-jest`, les appels à `disableAutomock` seront automatiquement hissés en haut du bloc de code. Utilisez `autoMockOff` si vous voulez éviter explicitement ce comportement._

### `jest.enableAutomock()`

Permet la simulation automatique dans le chargeur de modules.

Retourne l'objet `jest` pour le chaînage.

> Voir la section `automock` de [configuration](Configuration.md#automock-boolean) pour plus d'informations

Exemple :

```js
// utils.js
export default {
  authorize: () => {
    return 'token';
  },
  isAuthorized: secret => secret === 'wizard',
};
```

```js
// __tests__/enableAutomocking.js
jest.enableAutomock();

import utils from '../utils';

test('original implementation', () => {
  // now we have the mocked implementation,
  expect(utils.authorize._isMockFunction).toBeTruthy();
  expect(utils.isAuthorized._isMockFunction).toBeTruthy();
});
```

_Note : cette méthode était auparavant appelée "autoMockOn". Lors de l'utilisation de `babel-jest`, les appels à `enableAutomock` seront automatiquement hissés en haut du bloc de code. Utilisez `autoMockOn` si vous voulez éviter explicitement ce comportement._

### `jest.createMockFromModule(moduleName)`

##### renamed in Jest **26.0.0+**

Aussi sous l'alias : `.genMockFromModule(moduleName)`

En donnant le nom d'un module, utilisez le système de simulation automatique pour générer une version fictive du module pour vous.

Ceci est utile lorsque vous souhaitez créer une [simulation manuelle] (ManualMocks.md) qui étend le comportement de la simulation automatique.

Exemple :

```js
// utils.js
export default {
  authorize: () => {
    return 'token';
  },
  isAuthorized: secret => secret === 'wizard',
};
```

```js
// __tests__/createMockFromModule.test.js
const utils = jest.createMockFromModule('../utils').default;
utils.isAuthorized = jest.fn(secret => secret === 'not wizard');

test('implementation created by jest.createMockFromModule', () => {
  expect(utils.authorize.mock).toBeTruthy();
  expect(utils.isAuthorized('not wizard')).toEqual(true);
});
```

C'est ainsi que `createMockFromModule` simulera des types de données suivants :

#### `Function`

Crée une nouvelle [fonction fictive] (https://jestjs.io/docs/en/mock-functions.html). La nouvelle fonction n'a pas de paramètres formels et, lorsqu'elle est appelée, elle retourne `undefined`. Cette fonctionnalité s'applique également aux fonctions `async`.

#### `Class`

Crée une nouvelle classe. L'interface de la classe originale est conservée, toutes les fonctions et propriétés des membres de la classe seront simulées.

#### `Object`

Crée un nouvel objet profondément cloné. Les clés des objets sont conservées et leurs valeurs sont bafouées.

#### `Array`

Crée un nouveau tableau vide, en ignorant l'original.

#### `Primitives`

Crée une nouvelle propriété ayant la même valeur primitive que la propriété d'origine.

Exemple :

```
// example.js
module.exports = {
  function: function square(a, b) {
    return a * b;
  },
  asyncFunction: async function asyncSquare(a, b) {
    const result = await a * b;
    return result;
  },
  class: new class Bar {
    constructor() {
      this.array = [1, 2, 3];
    }
    foo() {}
  },
  object: {
    baz: 'foo',
    bar: {
      fiz: 1,
      buzz: [1, 2, 3],
    },
  },
  array: [1, 2, 3],
  number: 123,
  string: 'baz',
  boolean: true,
  symbol: Symbol.for('a.b.c'),
};
```

```js
// __tests__/example.test.js
const example = jest.createMockFromModule('./example');

test('should run example code', () => {
  // crée une nouvelle fonction simulée sans arguments formels.
  expect(example.function.name).toEqual('square');
  expect(example.function.length).toEqual(0);

  // Les fonctions asynchrones reçoivent le même traitement que les fonctions synchrones standard.
  expect(example.asyncFunction.name).toEqual('asyncSquare');
  expect(example.asyncFunction.length).toEqual(0);

  // crée une nouvelle classe avec la même interface, les fonctions et propriétés des membres sont simulées.
  expect(example.class.constructor.name).toEqual('Bar');
  expect(example.class.foo.name).toEqual('foo');
  expect(example.class.array.length).toEqual(0);

  // crée une version profondément clonée de l'objet original.
  expect(example.object).toEqual({
    baz: 'foo',
    bar: {
      fiz: 1,
      buzz: [],
    },
  });

  // crée un nouveau tableau vide, en ignorant le tableau original.
  expect(example.array.length).toEqual(0);

  // crée une nouvelle propriété ayant la même valeur primitive que la propriété d'origine.
  expect(example.number).toEqual(123);
  expect(example.string).toEqual('baz');
  expect(example.boolean).toEqual(true);
  expect(example.symbol).toEqual(Symbol.for('a.b.c'));
});
```

### `jest.mock(moduleName, factory, options)`

Il simule un module avec une version auto-mockée lorsqu'il est requis. Les options "usine" et "options" sont facultatives. Par exemple :

```js
// banana.js
module.exports = () => 'banana';

// __tests__/test.js
jest.mock('../banana');

const banana = require('../banana'); // banana sera explicitement  simulé.

banana(); // reviendra  'undefined' car la fonction est auto-mockée.
```

Le deuxième argument peut être utilisé pour spécifier une usine de modules explicite qui est en cours d'exécution au lieu d'utiliser la fonction d'auto-marquage de Jest :

```js
jest.mock('../moduleName', () => {
  return jest.fn(() => 42);
});

// Ceci exécute la fonction spécifiée en second argument de `jest.mock`.
const moduleName = require('../moduleName');
moduleName(); // Will return '42';
```

Lorsque l'on utilise le paramètre `factory` pour un module ES6 avec un export par défaut, la propriété "esModule : true" doit être spécifiée. Cette propriété est normalement générée par Babel / TypeScript, mais ici elle doit être définie manuellement. Lors de l'importation d'un export par défaut, il s'agit d'une instruction d'importer la propriété nommée "default" de l'objet d'export :

```js
import moduleName, {foo} from '../moduleName';

jest.mock('../moduleName', () => {
  return {
    __esModule: true,
    default: jest.fn(() => 42),
    foo: jest.fn(() => 43),
  };
});

moduleName(); // Will return 42
foo(); // Will return 43
```

Le troisième argument peut être utilisé pour créer des maquettes virtuelles - des simulations de modules qui n'existent nulle part dans le système :

```js
jest.mock(
  '../moduleName',
  () => {
    /*
      * Implémentation personnalisée d'un module qui n'existe pas dans JS,
      * comme un module généré ou un module natif en react-native.
     */
  },
  {virtual: true},
);
```

> **Warning:** L'importation d'un module dans un fichier de configuration (comme spécifié par `setupTestFrameworkScriptFile`) empêchera la simulation pour le module en question, ainsi que pour tous les modules qu'il importe.

Les modules dont on simule avec `jest.mock` ne le sont que pour le fichier qui s'appelle `jest.mock`. Un autre fichier qui importe le module obtiendra l'implémentation originale même s'il s'exécute après le fichier de test qui se moque du module.

Retourne l'objet `jest` pour le chaînage.

### `jest.unmock(moduleName)`

Indique que le système de modules ne doit jamais renvoyer une version fictive du module spécifié à partir de `require()` (par exemple, qu'il doit toujours renvoyer le module réel).

L'utilisation la plus courante de cette API est la spécification du module qu'un test donné a l'intention de tester (et ne veut donc pas être automatiquement simulé).

Retourne l'objet `jest` pour le chaînage.

### `jest.doMock(moduleName, factory, options)`

Lorsque vous utilisez `babel-jest`, les appels à `mock` seront automatiquement hissés en haut du bloc de code. Utilisez cette méthode si vous voulez éviter explicitement ce comportement.

Un exemple d'utilité est lorsque vous voulez simuler un module différemment dans le même fichier :

```js
beforeEach(() => {
  jest.resetModules();
});

test('moduleName 1', () => {
  jest.doMock('../moduleName', () => {
    return jest.fn(() => 1);
  });
  const moduleName = require('../moduleName');
  expect(moduleName()).toEqual(1);
});

test('moduleName 2', () => {
  jest.doMock('../moduleName', () => {
    return jest.fn(() => 2);
  });
  const moduleName = require('../moduleName');
  expect(moduleName()).toEqual(2);
});
```

L'utilisation de `jest.doMock()` avec les importations ES6 nécessite des étapes supplémentaires. Suivez ces étapes si vous ne voulez pas utiliser `require` dans vos tests :

- Nous devons spécifier la propriété `__esModule : true` (voir l'API [`jest.mock()`](#jestmockmodulename-factory-options) pour plus d'informations).
- Les importations de modules ES6 statiques sont placées en haut du fichier, donc nous devons les importer dynamiquement en utilisant `import()`.
- Enfin, nous avons besoin d'un environnement qui supporte l'importation dynamique. Veuillez consulter [Using Babel](GettingStarted.md#using-babel) pour la configuration initiale. Ensuite, ajoutez le plugin [babel-plugin-dynamic-import-node](https://www.npmjs.com/package/babel-plugin-dynamic-import-node), ou un équivalent, à votre configuration Babel pour permettre l'importation dynamique dans Node.


```js
beforeEach(() => {
  jest.resetModules();
});

test('moduleName 1', () => {
  jest.doMock('../moduleName', () => {
    return {
      __esModule: true,
      default: 'default1',
      foo: 'foo1',
    };
  });
  return import('../moduleName').then(moduleName => {
    expect(moduleName.default).toEqual('default1');
    expect(moduleName.foo).toEqual('foo1');
  });
});

test('moduleName 2', () => {
  jest.doMock('../moduleName', () => {
    return {
      __esModule: true,
      default: 'default2',
      foo: 'foo2',
    };
  });
  return import('../moduleName').then(moduleName => {
    expect(moduleName.default).toEqual('default2');
    expect(moduleName.foo).toEqual('foo2');
  });
});
```

Renvoie l'objet `jest` pour l'enchaînement.

### `jest.dontMock(moduleName)`

Lorsque vous utilisez `babel-jest`, les appels à `unmock` seront automatiquement hissés en haut du bloc de code. Utilisez cette méthode si vous voulez éviter explicitement ce comportement.

Renvoie l'objet "plaisanterie" pour l'enchaînement.

### `jest.setMock(moduleName, moduleExports)`

Fournit explicitement l'objet fictif que le système de modules doit retourner pour le module spécifié.

Il arrive parfois que la maquette générée automatiquement par le système de modules que vous devriez normalement recevoir ne soit pas suffisante pour vos besoins de test. Normalement, dans ces circonstances, vous devez écrire une [maquette manuelle] (ManualMocks.md) qui est plus adéquate pour le module en question. Toutefois, dans de très rares cas, même une maquette manuelle ne convient pas à vos besoins et vous devez la construire vous-même dans le cadre de votre test.

Dans ces rares cas, vous pouvez utiliser cette API pour remplir manuellement l'emplacement dans le registre des modules de la maquette du système de modules.

Renvoie l'objet "Jest" pour l'enchaînement.

_Note Il est recommandé d'utiliser [`jest.mock()`](#jestmockmodulename-factory-options) à la place. Le second argument de l'API `jest.mock` est une usine de modules au lieu de l'objet module exporté attendu._

### `jest.requireActual(moduleName)`

Renvoie le module réel au lieu d'un module fictif, en contournant tous les contrôles pour savoir si le module doit recevoir une implémentation fictive ou non.

Exemple :

```js
jest.mock('../myModule', () => {
  // Exiger que le module d'origine ne soit pas fictif...
  const originalModule = jest.requireActual('../myModule');

  return {
    __esModule: true, // A utiliser lorsque vous traitez avec les esModules
    ...originalModule,
    getRandom: jest.fn().mockReturnValue(10),
  };
});

const getRandom = require('../myModule').getRandom;

getRandom(); // Always returns 10
```

### `jest.requireMock(moduleName)`

Renvoie un module fictif au lieu du module réel en contournant tous les contrôles pour savoir si le module doit être requise normalement ou non.

### `jest.resetModules()`

Réinitialise le registre des modules - le cocha de tous les modules requis. Ceci est utile pour isoler les modules où l'état local pourrait entrer en conflit entre les tests.

Example:

```js
const sum1 = require('../sum');
jest.resetModules();
const sum2 = require('../sum');
sum1 === sum2;
// > faux (les deux modules de la somme sont des "instances" distinctes du module de la somme).
```

Exemple dans un test :

```js
beforeEach(() => {
  jest.resetModules();
});

test('works', () => {
  const sum = require('../sum');
});

test('works too', () => {
  const sum = require('../sum');
  // Sum est une copie différente du module sum du test précédent.
});
```

Renvoie l'objet `jest` pour l'enchaînement.

### `jest.isolateModules(fn)`

Le module `jest.isolateModules(fn)` va plus loin que `jest.resetModules()` et crée un registre sandbox pour les modules qui sont chargés à l'intérieur de la fonction de callback. Ceci est utile pour isoler des modules spécifiques pour chaque test afin que l'état local du module ne soit pas en conflit entre les tests.

```js
let myModule;
jest.isolateModules(() => {
  myModule = require('myModule');
});

const otherCopyOfMyModule = require('myModule');
```

## Les fonctions fictifs

### `jest.fn(implementation)`

Renvoie une nouvelle [fonction fictive] non utilisée (MockFunctionAPI.md). Optionnellement, prend une implémentation fictive.

```js
const mockFn = jest.fn();
mockFn();
expect(mockFn).toHaveBeenCalled();

// Avec une mise en œuvre simulée :
const returnsTrue = jest.fn(() => true);
console.log(returnsTrue()); // true;
```

### `jest.isMockFunction(fn)`

Détermine si la fonction donnée est une fonction simulée.

### `jest.spyOn(object, methodName)`

Créer une fonction similaire à `jest.fn` mais suit également les appels à `object[methodName]`. Renvoie un Jeset [fonction fictive](MockFunctionAPI.md).

_Note : Par défaut, `jest.spyOn` appelle aussi la méthode **spy**. C'est un comportement différent de la plupart des autres bibliothèques de test. Si vous voulez écraser la fonction originale, vous pouvez utiliser `jest.spyOn(object, methodName).mockImplementation(() => customImplementation)` ou `object[methodName] = jest.fn(() => customImplementation);`_

Exemple :

```js
const video = {
  play() {
    return true;
  },
};

module.exports = video;
```

Exemple de test :

```js
const video = require('./video');

test('plays video', () => {
  const spy = jest.spyOn(video, 'play');
  const isPlaying = video.play();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);

  spy.mockRestore();
});
```

### `jest.spyOn(object, methodName, accessType?)`

Depuis Jest 22.1.0+, la méthode `jest.spyOn` prend un troisième argument optionnel de `accessType` qui peut être soit `'get'' soit `'set'', qui s'avère utile lorsque vous voulez espionner un getter ou un setter, respectivement.

Exemple :

```js
const video = {
  // C'est un getter!
  get play() {
    return true;
  },
};

module.exports = video;

const audio = {
  _volume: false,
  // C'est un setter!
  set volume(value) {
    this._volume = value;
  },
  get volume() {
    return this._volume;
  },
};

module.exports = audio;
```

Example test:

```js
const video = require('./video');

test('plays video', () => {
  const spy = jest.spyOn(video, 'play', 'get'); // Nous passons 'get'
  const isPlaying = video.play;

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);

  spy.mockRestore();
});

const audio = require('./audio');

test('plays audio', () => {
  const spy = jest.spyOn(audio, 'volume', 'set'); // Nous passons 'set'
  audio.volume = 100;

  expect(spy).toHaveBeenCalled();
  expect(audio.volume).toBe(100);

  spy.mockRestore();
});
```

### `jest.clearAllMocks()`

Efface les propriétés `mock.calls` et `mock.instances` de tous les simulations. Cela équivaut à appeler [`.mockClear()`](MockFunctionAPI.md#mockfnmockclear) sur chaque fonction fantaisie.

Retourne l'objet `jest` pour le chaînage.

### `jest.resetAllMocks()`

Rétablit l'état de toutes les simulations. Cela équivaut à appeler  [`.mockReset()`](MockFunctionAPI.md#mockfnmockreset) sur chaque fonction simulée.

Retourne l'objet `jest` pour le chaînage.

### `jest.restoreAllMocks()`

Rétablit la valeur d'origine de toutes les simulations. Cela équivaut à appeler [`.mockRestore()`](MockFunctionAPI.md#mockfnmockrestore) sur chaque fonction simulée. Attention, `jest.restoreAllMocks()` ne fonctionne que lorsque la simulation a été créé avec `jest.spyOn` ; les autres simulations nécessiteront que vous les restauriez manuellement.

## Minuteries factices

### `jest.useFakeTimers(implementation?: 'modern' | 'legacy')`

Demande à Jest d'utiliser des versions factices des fonctions standard de la minuterie (`setTimeout`, `setIntervalle`, `clearTimeout`, `clearIntervalle`, `nextTick`, `setImmediate` et `clearImmediate`).

Si vous passez `"modern"` comme argument, [`@sinonjs/fake-timers`] (https://github.com/sinonjs/fake-timers) sera utilisé comme implémentation au lieu des faux chronomètres de Jest. Cela permet également de se moquer des minuteries supplémentaires comme "Date". Le comportement par défaut de Jest 27 sera "moderne".

Retourne l'objet `jest` pour le chaînage.

### `jest.useRealTimers()`

Donne instruction à Jest d'utiliser les versions réelles des fonctions standard de la minuterie.

Retourne l'objet `jest` pour le chaînage.
### `jest.runAllTicks()`

Evacue la file d'attente des **micro-tâches** (généralement interfacée dans le nœud via `process.nextTick`).

Lorsque cette API est appelée, toutes les micro-tâches en attente qui ont été mises en file d'attente via `process.nextTick` seront exécutées. De plus, si ces micro-tâches programment elles-mêmes de nouvelles micro-tâches, celles-ci seront continuellement épuisées jusqu'à ce qu'il ne reste plus de micro-tâches dans la file d'attente.

### `jest.runAllTimers()`

Evacue à la fois la **macro** file d'attente des tâches (c'est-à-dire toutes les tâches mises en file d'attente par `setTimeout()`, `setInterval()`, et `setImmediate()`) et la **micro** file d'attente des tâches (généralement interfacée dans le nœud  via `process.nextTick`).

Lorsque cette API est appelée, toutes les macro-tâches et micro-tâches en attente seront exécutées. Si ces tâches planifient elles-mêmes de nouvelles tâches, celles-ci seront continuellement épuisées jusqu'à ce qu'il ne reste plus de tâches dans la file d'attente.

Ceci est souvent utile pour exécuter de manière synchrone les setTimeouts pendant un test afin d'affirmer de manière synchrone un certain comportement qui ne se produirait qu'après les rappels `setTimeout()` ou `setInterval()` exécutés. Voir la doc [Timer mocks](TimerMocks.md) pour plus d'informations.

### `jest.runAllImmediates()`

Evacue toutes les tâches mises en file d'attente par `setImmediate()`.

> Note : Cette fonction n'est pas disponible lors de l'utilisation de la mise en œuvre de faux minuteurs modernes

### `jest.advanceTimersByTime(msToRun)`

##### renamed in Jest **22.0.0+**

Aussi sous l'alias : `.runTimersToTime()`

Exécute uniquement la file d'attente des macro-taches (c'est-à-dire toutes les tâches mises en file d'attente par `setTimeout()` ou `setInterval()` et `setImmediate()`).

Lorsque cette API est appelée, tous les temporisateurs sont avancés de `msToRun` millisecondes. Toutes les "macro-tâches" en attente qui ont été mises en file d'attente via `setTimeout()` ou `setInterval()`, et qui seraient exécutées dans ce laps de temps seront exécutées. De plus, si ces macro-tâches prévoient de nouvelles macro-tâches qui seraient exécutées dans le même délai, celles-ci seront exécutées jusqu'à ce qu'il ne reste plus de macro-tâches dans la file d'attente, qui devraient être exécutées dans les "msToRun" millisecondes.

### `jest.runOnlyPendingTimers()`

Exécute uniquement les macro-tâches qui sont actuellement en attente (c'est-à-dire uniquement les tâches qui ont été mises en file d'attente par `setTimeout()` ou `setInterval()` jusqu'à ce point). Si l'une des macro-tâches actuellement en attente prévoit de nouvelles macro-tâches, ces nouvelles tâches ne seront pas exécutées par cet appel.

Ceci est utile pour des scénarios tels que celui où le module testé programme un `setTimeout()` dont le rappel programme un autre `setTimeout()` de manière récursive (ce qui signifie que le programme ne s'arrête jamais). Dans ces scénarios, il est utile de pouvoir avancer dans le temps d'une seule étape à la fois.

### `jest.advanceTimersToNextTimer(steps)`

Avance tous les chronomètres de la milliseconde nécessaire pour que seuls les prochains temps morts/intervalles s'écoulent.

En option, vous pouvez fournir des "étapes", de sorte que le nombre d'étapes des prochains temps morts/intervalles sera exécuté.

### `jest.clearAllTimers()`

Supprime du système de minuterie toute minuterie en attente.

Cela signifie que si des minuteries ont été programmées (mais n'ont pas encore été exécutées), elles seront effacées et n'auront jamais la possibilité d'être exécutées à l'avenir.

### `jest.getTimerCount()`

Renvoie le nombre de fausses minuteries encore en fonctionnement.

### `jest.setSystemTime(now?: number | Date)`

Régler l'heure système actuelle utilisée par les faux minuteurs. Simule un utilisateur qui change l'horloge système pendant que votre programme est en cours d'exécution. Cela affecte l'heure actuelle mais ne provoque pas en soi le déclenchement des minuteurs, par exemple ; ils se déclencheront exactement comme ils l'auraient fait sans l'appel à `jest.setSystemTime()`.

> Note : Cette fonction n'est disponible que si l'on utilise l'implémentation de faux minuteurs modernes

### `jest.getRealSystemTime()`

Lorsque l'on se moque du temps, on se moque aussi de `Date.now()`. Si, pour une raison quelconque, vous avez besoin d'accéder à l'heure actuelle, vous pouvez invoquer cette fonction.

> Note : Cette fonction n'est disponible que si l'on utilise l'implémentation de faux minuteurs modernes

## Divers

### `jest.setTimeout(timeout)`

Définissez l'intervalle de temps par défaut pour les tests et les crochets avant/après en millisecondes. Cela n'affecte que le fichier de test à partir duquel cette fonction est appelée.

_Note : L'intervalle de temps par défaut est de 5 secondes si cette méthode n'est pas appelée._

_Note : Si vous voulez définir le délai d'attente pour tous les fichiers de test, un bon endroit pour le faire est dans `setupFilesAfterEnv`._

Exemple :

```js
jest.setTimeout(1000); // 1 second
```

### `jest.retryTimes()`

Exécute les tests échoués n fois jusqu'à ce qu'ils soient réussis ou jusqu'à ce que le nombre maximum de tentatives soit épuisé. Cela ne fonctionne qu'avec [jest-circus] (https://github.com/facebook/jest/tree/master/packages/jest-circus) !

Exemple dans un test :

```js
jest.retryTimes(3);
test('will fail', () => {
  expect(true).toBe(false);
});
```

Renvoie l'objet `jest` pour l'enchaînement.
