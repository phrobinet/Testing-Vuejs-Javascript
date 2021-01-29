# PLUGINS DE CROCHET DE RACINE

>Nouveau dans la v8.0.0.

Dans certains cas, vous voudrez peut-être un [hook](https://mochajs.org/#hooks) avant (ou après) chaque test dans chaque fichier. On appelle cela des "root hooks". Avant la v8.0.0, la façon d'y parvenir était d'utiliser un `--fichier` combiné avec des crochets de racine (voir [exemple ci-dessus](https://mochajs.org/#root-hooks-are-not-global)). Cela fonctionne toujours dans la v8.0.0, mais pas lors de l'exécution de tests en mode parallèle ! Pour cette raison, il est fortement déconseillé d'utiliser des "root hooks" avec cette méthode, et cela pourrait être déconseillé à l'avenir.

Un plugin de root hook est un fichier JavaScript chargé via [`--require`](https://mochajs.org/#-require-module-r-module) qui "enregistre" un ou plusieurs root hooks à utiliser dans tous les fichiers de test.

## DÉFINITION D'UN PLUGIN ROOT HOOK

Un fichier Root Hook Plugin est un script qui exporte (via `module.exports`) une propriété `mochaHooks`. Il est chargé via `--require` dans le fichier.

Voici un exemple simple qui définit un root hook, écrit en utilisant la syntaxe CJS et ESM.

**Avec CommonJS**
```js
// test/hooks.js

exports.mochaHooks = {
  beforeEach(done) {
    // Faire quelque chose avant chaque test
    done();
  },
};
```

**Avec les modules ES**
Nous utilisons l'extension ".mjs" dans ces exemples.

Conseil : si vous avez des difficultés à faire fonctionner les modules ES, reportez-vous à la [documentation Node.js] (https://nodejs.org/api/esm.html).


``` js
// test/hooks.mjs

export const mochaHooks = {
  beforeEach(done) {
    // Faire quelque chose avant chaque test
    done();
  },
};
```
>Note: Further examples will use ESM syntax.


## CROCHETS DE RACINE DISPONIBLES

Les root hooks fonctionnent avec n'importe quelle interface, mais les noms de propriété ne changent pas. En d'autres termes, si vous utilisez l'interface tdd, les cartes de suiteSetup à beforeAll, et les cartes de configuration à beforeEach.

Les root hooks disponibles et leur comportement :


- `beforeAll`:
-- En mode **série** (par défaut de Mocha), avant que tous les tests ne commencent, une seule fois
-- En mode **parallèle**, à exécuter avant le début de tous les tests, pour chaque fichier
- `beforeEach`:
-- Dans les deux modes, il faut courir avant chaque test
- `afterAll`:
-- En mode série, s'exécute après la fin de tous les tests, une seule fois
-- En mode parallèle, à la fin de tous les tests, pour chaque fichier
- `afterEach`:
-- Dans les deux modes, exécuter après chaque test

Comme pour les autres crochets, `this` fait référence à l'objet de contexte actuel :

``` js
// test/hooks.mjs

export const mochaHooks = {
  beforeAll() {
    // sauter tous les tests pour bob
    if (require('os').userInfo().username === 'bob') {
      return this.skip();
    }
  },
};
```

## PLUSIEURS CROCHETS DE RACINE DANS UN SEUL PLUGIN

Plusieurs root hooks peuvent être définis dans un seul plugin, à des fins d'organisation. Par exemple :
``` js
// test/hooks.mjs

export const mochaHooks = {
  beforeEach: [
    function (done) {
      // faire quelque chose avant chaque test,
      // puis lancez le prochain crochet de ce tableau
    },
    async function () {
      // les fonctions d'asynchronisation ou de retour de promesse sont autorisées
    },
  ],
};
```
## LES PLUGINS ROOT HOOK PEUVENT EXPORTER UNE FONCTION

Si vous avez besoin d'effectuer une certaine logique - comme choisir un crochet de racine de manière conditionnelle, en fonction de l'environnement - `mokaHooks` peut être une fonction qui renvoie l'objet attendu.
``` js
// test/hooks.mjs

export const mochaHooks = () => {
  if (process.env.CI) {
    // racine crochets objet
    return {
      beforeEach: [
        function () {
          // CI-specific beforeEach
        },
        function () {
          // d'autres IC spécifiques avant chaque
        },
      ],
    };
  }
  // racine crochets objet
  return {
    beforeEach() {
      // regular beforeEach
    },
  };
};
```

Si vous devez effectuer une opération asynchrone, les mokaHooks peuvent être prometteurs :

```js
// test/hooks.mjs

export const mochaHooks = async () => {
  const result = await checkSomething();
  // n'utilisez un crochet de racine que si le "résultat" est vrai
  if (result) {
    // objet crochets de racine
    return {
      beforeEach() {
        // quelque chose
      },
    };
  }
};
```

## PLUSIEURS PLUGINS ROOT HOOK

De multiples plugins root hook peuvent être enregistrés en utilisant `--require` plusieurs fois. Par exemple, pour enregistrer les hooks racine dans `hooks-a.js` et `hooks-b.js`, utilisez `--require hooks-a.js --require hooks-b.js`. Ceux-ci seront enregistrés (et exécutés) dans l'ordre.

## MIGRATION DES TESTS POUR UTILISER DES PLUGINS DE TYPE "ROOT HOOK
Pour migrer vos tests en utilisant des root hooks vers un plugin root hook :

1. Trouvez vos root hooks (hooks définis en dehors d'une suite - habituellement `describe()` callback).
2. Créez un nouveau fichier, par exemple, `test/hooks.js`.
3. Déplacez vos hooks racine dans `test/hooks.js`.
4. Dans `test/hooks.js`, faites de vos crochets un membre d'une propriété exportée `mochaHooks`.
5. Utilisez `--require test/hooks.js` (encore mieux : utilisez un [fichier de configuration](https://mochajs.org/#configuring-mocha-nodejs) avec {`"require" : "test/hooks.js"}`) lorsque vous effectuez vos tests.

Par exemple, étant donné le fichier suivant, `test/test.spec.js`, contenant des crochets de racine :
``` js
// test/test.spec.js

beforeEach(function () {
  // installation globale pour tous les tests
});

  // nettoyage final unique
});

describe('my test suite', function () {
  it('should have run my global setup', function () {
    // faire une affirmation
  });
});
```

Votre test/hooks.js (pour cet exemple, un module CJS) doit contenir :

```js
// test/hooks.js

exports.mochaHooks = {
  beforeEach(function() {
  // installation globale pour tous les tests
  }),
  afterAll(function() {
  // nettoyage final unique
  })
};
```

>NOTE : Attention ! `après` devient `après-tout` et `avant` devient `avant-tout`.

Votre `test/test.spec.js` original devrait maintenant contenir :

```js
// test/test.spec.js

describe('my test suite', function () {
  it('should have run my global setup', function () {
    // faire une affirmation
  });
});
```
L'exécution de `mocha --require test/hooks.js test/test.spec.js` s'effectuera comme auparavant (et est maintenant prête à être utilisée avec [`--parallèle`](https://mochajs.org/#-parallel-p)).

## MIGRATION D'UNE BIBLIOTHÈQUE POUR UTILISER DES PLUGINS DE HOOK ROOT

Si vous êtes un responsable de bibliothèque, et que votre bibliothèque utilise des "root hooks", vous pouvez migrer en remaniant votre point d'entrée :


Votre bibliothèque devrait toujours exporter un [`mochaHooks object`.](https://mochajs.org/#defining-a-root-hook-plugin)
Pour maintenir la rétrocompatibilité, lancez vos hooks racine si et seulement si `global.beforeEach` (ou tout autre hook pertinent) existe.
Demandez à vos utilisateurs de `--require <your-package>` lorsqu'ils exécutent moka.
