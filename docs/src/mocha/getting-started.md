# GETTING STARTED

``` js
 npm install mocha
 mkdir test
 $EDITOR test/test.js # or open with your favorite editor
```

Dans votre éditeur:

``` js
var assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
``` 

Back in the terminal:Retour dans le terminal

``` js
$ ./node_modules/mocha/bin/mocha

  Array
    #indexOf()
      ✓ should return -1 when the value is not present


  1 passing (9ms)
```

Mettre en place un script de test dans package.json :

``` js
"scripts": {
  "test": "mocha"
}
```

Puis lancez les tests avec :

``` js
$ npm test
``` 
