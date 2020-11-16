# EXCLUSIVE TESTS

>ATTENTION : les tests exclusifs sont incompatibles avec le [mode parallèle] (https://mochajs.org/#parallel-tests).

La fonction d'exclusivité vous permet de n'exécuter que la suite ou le scénario de test spécifié en ajoutant .only() à la fonction. Voici un exemple d'exécution d'une suite particulière :

``` js
describe('Array', function () {
  describe.only('#indexOf()', function () {
    // ...
  });
});
```

Note : Toutes les suites imbriquées seront toujours exécutées.

Voici un exemple d'exécution d'un scénario de test individuel :

``` js
describe('Array', function () {
  describe('#indexOf()', function () {
    it.only('should return -1 unless present', function () {
      // ...
    });

    it('should return the index when present', function () {
      // ...
    });
  });
});
```

Avant la version 3.0.0, .only() utilisait la correspondance de chaînes de caractères pour décider des tests à exécuter ; ce n'est plus le cas. À partir de la version 3.0.0, le fichier .only() peut être utilisé plusieurs fois pour définir un sous-ensemble de tests à exécuter :

``` js
describe('Array', function () {
  describe('#indexOf()', function () {
    it.only('should return -1 unless present', function () {
      // this test will be run
    });

    it.only('should return the index when present', function () {
      // this test will also be run
    });

    it('should return -1 if called with a non-Array context', function () {
      // this test will not be run
    });
  });
});
```

Vous pouvez également choisir plusieurs suites :

``` js
describe('Array', function () {
  describe.only('#indexOf()', function () {
    it('should return -1 unless present', function () {
      // this test will be run
    });

    it('should return the index when present', function () {
      // this test will also be run
    });
  });

  describe.only('#concat()', function () {
    it('should return a new Array', function () {
      // this test will also be run
    });
  });

  describe('#slice()', function () {
    it('should return a new Array', function () {
      // this test will not be run
    });
  });
});
```

Mais les tests auront la priorité :

``` js
describe('Array', function () {
  describe.only('#indexOf()', function () {
    it.only('should return -1 unless present', function () {
      // this test will be run
    });

    it('should return the index when present', function () {
      // this test will not be run
    });
  });
});
```

Note : Les crochets, s'ils sont présents, seront quand même exécutés.

Veillez à ne pas utiliser le .only() pour le contrôle de version, à moins que vous ne le pensiez vraiment ! Pour ce faire, on peut exécuter mocha avec l'option --forbid-only dans la commande de test d'intégration continue (ou dans un hook git precommit).
