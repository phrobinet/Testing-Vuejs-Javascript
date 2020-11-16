# CODE ASYNCHRONE

En ajoutant un argument (généralement nommé done) à un it() pour un test avec un callback, Mocha saura qu'il doit attendre que cette fonction soit appelée pour terminer le test. Ce rappel accepte à la fois une instance d'erreur (ou une sous-classe de celle-ci) ou une valeur erronée ; tout autre usage est invalide et provoque une erreur (entraînant généralement l'échec du test).

``` js
describe('User', function () {
  describe('#save()', function () {
    it('should save without error', function (done) {
      var user = new User('Luna');
      user.save(function (err) {
        if (err) done(err);
        else done();
      });
    });
  });
});
```

Sinon, utilisez directement le rappel done() (qui traitera un argument d'erreur, s'il existe) :

``` js
describe('User', function () {
  describe('#save()', function () {
    it('should save without error', function (done) {
      var user = new User('Luna');
      user.save(done);
    });
  });
});
```

## TRAVAILLER AVEC DES PROMESSES

Vous pouvez également, au lieu d'utiliser le rappel `done()`, renvoyer un [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Ceci est utile si les API que vous testez renvoient des promesses au lieu de prendre des rappels :

``` js
beforeEach(function () {
  return db.clear().then(function () {
    return db.save([tobi, loki, jane]);
  });
});

describe('#find()', function () {
  it('respond with matching records', function () {
    return db.find({type: 'User'}).should.eventually.have.length(3);
  });
});
```
>Ce dernier exemple utilise [Chai as Promised] (https://www.npmjs.com/package/chai-as-promised) pour des affirmations de promesses fluides.

Dans Mocha v3.0.0 et les versions plus récentes, renvoyer une "Promesse" et appeler "done()`" entraînera une exception, car il s'agit généralement d'une erreur :

``` js
const assert = require('assert');

// antipattern
it('should complete this test', function (done) {
  return new Promise(function (resolve) {
    assert.ok(true);
    resolve();
  }).then(done);
});
```

Le test ci-dessus échouera avec `Error: Resolution method is overspecified. Specify a callback *or* return a Promise; not both.`. Dans les versions antérieures à la v3.0.0, l'appel à done() est effectivement ignoré.

## UTILISER ASYNC / AWAIT

Si votre environnement JS supporte [async / await](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/async_function), vous pouvez également écrire des tests asynchrones comme celui-ci :

```js
beforeEach(async function () {
  await db.clear();
  await db.save([tobi, loki, jane]);
});

describe('#find()', function () {
  it('responds with matching records', async function () {
    const users = await db.find({type: 'User'});
    users.should.have.length(3);
  });
});
```

