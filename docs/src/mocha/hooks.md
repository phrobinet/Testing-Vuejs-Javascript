# HOOKS


Avec son interface par défaut de type "BDD", Mocha fournit les crochets `before()`, `after()`, `beforeEach()`, et `afterEach()`. Ceux-ci doivent être utilisés pour mettre en place les conditions préalables et nettoyer après vos tests.

``` js
describe('hooks', function () {
  before(function () {
    // se déroule une fois avant le premier test dans ce bloc
  });

  after(function () {
    // s'exécute une fois après le dernier test de ce bloc
  });

  beforeEach(function () {
    // s'exécute avant chaque test dans ce bloc
  });

  afterEach(function () {
    // s'exécute après chaque test dans ce bloc
  });

  // cas d'essai
});
```

> peuvent apparaître avant, après ou entrecoupés de vos crochets. Les hooks s'exécuteront dans l'ordre où ils sont définis, selon le cas ; tous les hooks `before()` s'exécutent (une fois), puis tous les hooks `beforeEach()`, les tests, tous les hooks `afterEach()`, et enfin les hooks `after()` (une fois).

#### DESCRIBING HOOKS

Tout crochet peut être invoqué avec une description optionnelle, ce qui permet de repérer plus facilement les erreurs dans vos tests. Si une fonction est attribuée à un hameçon, ce nom sera utilisé si aucune description n'est fournie.


``` js
beforeEach(function () {
  // avant Chaque crochet
});

beforeEach(function namedFun() {
  // avantChacun:namedFun
});

beforeEach('some description', function () {
  // avantChacun : quelques descriptions
});
```

#### ASYNCHRONOUS HOOKS


Tous les crochets (`before()`, `before()`, `beforeEach()`, `afterEach()`) peuvent être synchrones ou asynchrones également, se comportant comme un test normal. Par exemple, vous pouvez souhaiter remplir la base de données avec un contenu factice avant chaque test :

``` js
describe('Connection', function () {
  var db = new Connection(),
    tobi = new User('tobi'),
    loki = new User('loki'),
    jane = new User('jane');

  beforeEach(function (done) {
    db.clear(function (err) {
      if (err) return done(err);
      db.save([tobi, loki, jane], done);
    });
  });

  describe('#find()', function () {
    it('respond with matching records', function (done) {
      db.find({type: 'User'}, function (err, res) {
        if (err) return done(err);
        res.should.have.length(3);
        done();
      });
    });
  });
});
```

#### ROOT-LEVEL HOOKS

Un hook défini au sommet d'un fichier de test (en dehors d'une suite) est un hook racine.

A partir de la version 8.0.0, les [Root Hook Plugins] (https://mochajs.org/#root-hook-plugins) sont le mécanisme préféré pour définir les crochets racine.

#### DELAYED ROOT SUITE

> ATTENTION : les suites racine retardées sont incompatibles avec le [mode parallèle] (https://mochajs.org/#parallel-tests).

Si vous devez effectuer des opérations asynchrones avant qu'une de vos suites ne soit exécutée, vous pouvez retarder la suite racine. Exécutez mocha avec le drapeau --delay. Ceci attachera une fonction de rappel spéciale, run(), au contexte global :

``` js
setTimeout(function () {
  //  faire quelques préparatifs

  describe('my suite', function () {
    // ...
  });

  run();
}, 5000);
```
