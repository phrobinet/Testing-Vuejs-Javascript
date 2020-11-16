# TESTS EN ATTENTE

"En attente" - comme dans "quelqu'un devrait éventuellement rédiger ces cas de test" - les cas de test sont ceux sans rappel :

``` js
describe('Array', function () {
  describe('#indexOf()', function () {
    // test en cours ci-dessous
    it('should return -1 when the value is not present');
  });
});
```

Les tests en attente seront inclus dans les résultats des tests et notés comme étant en attente. Un test en attente n'est pas considéré comme un test échoué.

Lisez la [section sur les tests inclus] (https://mochajs.org/#inclusive-tests) pour un exemple de correction conditionnelle d'un test comme étant en attente via this.skip().

