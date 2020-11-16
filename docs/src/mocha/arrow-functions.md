# LES FONCTIONS FLECHES

Passing [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) (aka “lambdas”) to Mocha is discouraged. Lambdas lexically bind `this` and cannot access the Mocha context. For example, the following code will fail:
Il est déconseillé de passer [les fonctions flèches] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) (alias "lambdas") à Mocha. Les lambdas lient lexicalement "ceci" et ne peuvent pas accéder au contexte Mocha. Par exemple, le code suivant échouera :

``` js
describe('my suite', () => {
  it('my test', () => {
    // should set the timeout of this test to 1000 ms; instead will fail
    this.timeout(1000);
    assert.ok(true);
  });
});
```

Si vous n'avez pas besoin d'utiliser le contexte de Mocha, les lambdas devraient fonctionner. Sachez que l'utilisation de lambdas sera plus douloureuse à remanier si le besoin s'en fait sentir !
