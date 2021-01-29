# INCLUSIVE TESTS

Cette caractéristique est l'inverse de .only(). En ajoutant .skip(), vous pouvez dire à Mocha d'ignorer le(s) scénario(s) de test. Tout cas ignoré sera marqué comme [pending](https://mochajs.org/#pending-tests), et signalé comme tel. Voici un exemple d'omission d'un test individuel :

``` js
describe('Array', function () {
  describe('#indexOf()', function () {
    it.skip('should return -1 unless present', function () {
      // ce test ne sera pas effectué
    });

    it('should return the index when present', function () {
      // ce test sera effectué
    });
  });
});
```

Vous pouvez également mettre un .skip() sur une suite entière. Cela équivaut à ajouter un .skip() à tous les tests de la suite. Les crochets dans la suite sont également ignorés.

``` js
describe('Array', function () {
  describe.skip('#indexOf()', function () {
    it('should return -1 unless present', function () {
      // ce test ne sera pas effectué
    });
  });
});
```

Note : Le code dans les suites sautées, qui est placé en dehors des hooks ou des tests est toujours exécuté, car mocha invoquera toujours la fonction de la suite pour construire la structure de la suite pour la visualisation.

>Bonne pratique : Utilisez .skip() au lieu de commenter les tests.

Vous pouvez également sauter au moment de l'exécution en utilisant ce .skip(). Si un test nécessite un environnement ou une configuration qui ne peut être détecté à l'avance, un saut à l'exécution est approprié. Par exemple :

``` js
it('should only test in the correct environment', function() {
  if (/* check test environment */) {
    // faire des affirmations
	} else {
    this.skip();
  }
});
```

Le test ci-dessus sera signalé comme étant en cours. Il est également important de noter que l'appel de this.skip() fera effectivement avorter le test.

>Bonne pratique : Pour éviter toute confusion, n'exécutez pas d'autres instructions dans un test ou un hook après avoir appelé this.skip().

Comparez le test ci-dessus avec le code suivant :

``` js
it('should only test in the correct environment', function() {
  if (/* check test environment */) {
    // faire des affirmations
  } else {
    // ne rien faire
  }
});
```

Comme ce test ne fait rien, il sera déclaré comme réussi.

>Bonne pratique : Ne faites rien ! Un test doit faire une affirmation ou utiliser this.skip().

Pour sauter plusieurs tests de cette manière, utilisez this.skip() dans un hook "before all" :

``` js
before(function() {
  if (/* check test environment */) {
    // code de configuration
  } else {
    this.skip();
  }
});
```
Ceci sautera tout, beforeEach/afterEach, et décrira les blocs dans la suite. Les hooks before/after sont sautés sauf s'ils sont définis au même niveau que le hook contenant ce .skip().

``` js
describe('outer', function () {
  before(function () {
    this.skip();
  });

  after(function () {
    // sera exécuté
  });

  describe('inner', function () {
    before(function () {
      // sera ignorées
    });

    after(function () {
      // sera ignorées
    });
  });
});
```

>Mise à jour dans la v7.0.0 : sauter un test dans un crochet "après tout" est interdit et entraînera une exception. Utilisez une déclaration de retour ou d'autres moyens pour annuler l'exécution du crochet.

Avant Mocha v3.0.0, ce .skip() n'était pas supporté dans les tests et les hooks asynchrones.
