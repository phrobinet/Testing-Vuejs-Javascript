# DYNAMICALLY GENERATING TESTS

Étant donné que Mocha utilise des expressions `Function.prototype.call` et des fonctions pour définir des suites et des cas de test, il est facile de générer vos tests de manière dynamique. Aucune syntaxe particulière n'est requise - le bon vieux JavaScript peut être utilisé pour obtenir des fonctionnalités similaires à celles des tests "paramétrés", que vous avez pu voir dans d'autres cadres.

Prenez l'exemple suivant :

``` js
var assert = require('chai').assert;

function add() {
  return Array.prototype.slice.call(arguments).reduce(function (prev, curr) {
    return prev + curr;
  }, 0);
}

describe('add()', function () {
  var tests = [
    {args: [1, 2], expected: 3},
    {args: [1, 2, 3], expected: 6},
    {args: [1, 2, 3, 4], expected: 10},
  ];

  tests.forEach(function (test) {
    it('correctly adds ' + test.args.length + ' args', function () {
      var res = add.apply(null, test.args);
      assert.equal(res, test.expected);
    });
  });
});
```

Le code ci-dessus produira une suite avec trois spécifications :

```
$ mocha

  add()
    ✓ correctly adds 2 args
    ✓ correctly adds 3 args
    ✓ correctly adds 4 args
```

## TEST DURATION

De nombreux reporters affichent des tests de durée et de drapeau lents (par défaut : 75 ms), comme le montre ici le reporter SPEC :
! [entrez la description de l'image ici](https://mochajs.org/static/reporter-spec-duration.resize920,9999-withoutEnlargement.317409f18f.png)


Il existe trois niveaux de durée des tests (voir l'image suivante) :

1. RAPIDE : Les tests qui se déroulent à moins de la moitié du seuil "lent" affichent la durée en vert (s'il y a lieu).
2. NORMAL : Les tests qui dépassent la moitié du seuil (mais qui restent dans les limites de celui-ci) affichent la durée en jaune.
3. LENT : Les tests qui dépassent le seuil affichent la durée en rouge.


Pour modifier ce qui est considéré comme "slow", vous pouvez utiliser la méthode slow() :

```js
describe('something slow', function () {
  this.slow(300000); // five minutes

  it('should take long enough for me to go make a sandwich', function () {
    // ...
  });
});
```

