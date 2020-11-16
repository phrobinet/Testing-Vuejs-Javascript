# INTERFACES

Le système d'"interface" de Mocha permet aux développeurs de choisir leur style de **DSL. Mocha dispose d'interfaces BDD, TDD, Exports, QUnit** et **Require-style**.

## BDD

L'interface BDD fournit `describe()`, `context()`, `it()`, `specify()`, `before()`, `after()`, `beforeEach()`, et `afterEach()`.

`context()` n'est qu'un alias de `describe()`, et se comporte de la même manière ; il permet de garder les tests plus faciles à lire et à organiser. De même, `specify()` est un alias de `it()`.

Tous les exemples précédents ont été écrits en utilisant l'interface **BDD**.
```  js
describe('Array', function () {
  before(function () {
    // ...
  });

  describe('#indexOf()', function () {
    context('when not present', function () {
      it('should not throw an error', function () {
        (function () {
          [1, 2, 3].indexOf(4);
        }.should.not.throw());
      });
      it('should return -1', function () {
        [1, 2, 3].indexOf(4).should.equal(-1);
      });
    });
    context('when present', function () {
      it('should return the index where the element first appears in the array', function () {
        [1, 2, 3].indexOf(3).should.equal(2);
      });
    });
  });
});
```
## TDD

L'interface **TDD** fournit `suite()`, `test()`, `suiteSetup()`, `suiteTeardown()`, `setup()`, et `teardown()` :

```js
suite('Array', function () {
  setup(function () {
    // ...
  });

  suite('#indexOf()', function () {
    test('should return -1 when not present', function () {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});
```
## EXPORTS

L'interface **Exports** ressemble beaucoup au prédécesseur de Mocha [expresso] (https://github.com/tj/expresso). Les touches `before`, `after`, `beforeEach`, et `afterEach` sont des cas spéciaux, les valeurs des objets sont des suites et les valeurs des fonctions sont des cas de test :

``` js
module.exports = {
  before: function () {
    // ...
  },

  Array: {
    '#indexOf()': {
      'should return -1 when not present': function () {
        [1, 2, 3].indexOf(4).should.equal(-1);
      },
    },
  },
};
```
## QUNIT

L'interface inspirée de [QUnit](https://qunitjs.com/) correspond à l'aspect "flat" de QUnit, où le titre de la suite de tests est défini avant les cas de tests. Comme TDD, elle utilise `suite()` et `test()`, mais ressemblant à BDD, elle contient aussi `avant()`, `après()`, `avantChacun()`, et `aprèsChacun()`.

``` js
function ok(expr, msg) {
  if (!expr) throw new Error(msg);
}

suite('Array');

test('#length', function () {
  var arr = [1, 2, 3];
  ok(arr.length == 3);
});

test('#indexOf()', function () {
  var arr = [1, 2, 3];
  ok(arr.indexOf(1) == 0);
  ok(arr.indexOf(2) == 1);
  ok(arr.indexOf(3) == 2);
});

suite('String');

test('#length', function () {
  ok('foo'.length == 3);
});
```

## REQUIRE

L'interface `require` vous permet d'exiger les mots `describe` et friend directement en utilisant `require` et de les appeler comme vous le souhaitez. Cette interface est également utile si vous voulez éviter les variables globales dans vos tests.

Note : L'interface `require` ne peut pas être exécutée via l'exécutable `node`, et doit être exécutée via `mocha`.
``` js
var testCase = require('mocha').describe;
var pre = require('mocha').before;
var assertions = require('mocha').it;
var assert = require('chai').assert;

testCase('Array', function () {
  pre(function () {
    // ...
  });

  testCase('#indexOf()', function () {
    assertions('should return -1 when not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
```
