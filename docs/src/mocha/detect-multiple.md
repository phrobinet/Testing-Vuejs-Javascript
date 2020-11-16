## DETECTS MULTIPLE CALLS TO `DONE()`

Si vous utilisez des tests asynchrones basés sur le callback, Mocha lancera une erreur si `done()` est appelé plusieurs fois. Ceci est pratique pour attraper les doubles rappels accidentels.

``` js
it('double done', function (done) {
  // Calling `done()` twice is an error
  setImmediate(done);
  setImmediate(done);
});
```

En effectuant le test ci-dessus, vous obtiendrez le message d'erreur ci-dessous :

``` js
./node_modules/.bin/mocha mocha.test.js


  ✓ double done
  1) double done

  1 passing (6ms)
  1 failing

  1) double done:
     Error: done() called multiple times
      at Object.<anonymous> (mocha.test.js:1:63)
      at require (internal/module.js:11:18)
      at Array.forEach (<anonymous>)
      at startup (bootstrap_node.js:187:16)
      at bootstrap_node.js:608:3
```
