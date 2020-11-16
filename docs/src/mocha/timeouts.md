# TIMEOUTS

## SUITE-LEVEL

Les délais d'attente au niveau des suites peuvent être appliqués à des "suites" entières de tests, ou être désactivés via ce .timeout(0). Cette valeur sera héritée par toutes les suites et les cas de test imbriqués qui n'ont pas priorité sur cette valeur.

``` js
describe('a suite of tests', function () {
  this.timeout(500);

  it('should take less than 500ms', function (done) {
    setTimeout(done, 300);
  });

  it('should take less than 500ms as well', function (done) {
    setTimeout(done, 250);
  });
});
```

## TEST-LEVEL

Test-specific timeouts may also be applied, or the use of this.timeout(0) to disable timeouts all together:

``` js
it('should take less than 500ms', function (done) {
  this.timeout(500);
  setTimeout(done, 300);
});
```

## HOOK-LEVEL

Des délais d'attente au niveau du crochet peuvent également être appliqués :

``` js
describe('a suite of tests', function () {
  beforeEach(function (done) {
    this.timeout(3000); // A very long environment setup.
    setTimeout(done, 2500);
  });
});
```
Encore une fois, utilisez ce .timeout(0) pour désactiver le délai d'attente pour un hameçon.

> Dans la version 3.0.0 ou plus récente, un paramètre passé à this.timeout() supérieur à [la valeur maximale du délai] (https://developer.mozilla.org/docs/Web/API/WindowTimers/setTimeout#Maximum_delay_value) entraînera la désactivation du délai. Dans la version 8.0.0 ou plus récente, this.enableTimeouts() a été supprimé. Attention : Avec les tests asynchrones, si vous désactivez les délais via this.timeout(0) et n'appelez pas done(), votre test se terminera en silence.

