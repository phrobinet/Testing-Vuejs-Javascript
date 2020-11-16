# EXÉCUTER MOKA DANS LE NAVIGATEUR

Mocha fonctionne dans le navigateur. Chaque version de Mocha aura de nouvelles versions de `./mocha.js` et `./mocha.css` à utiliser dans le navigateur.

Une configuration typique pourrait ressembler à ce qui suit, où nous appelons `mocha.setup('bdd')` pour utiliser l'interface BDD avant de charger les scripts de test, en les exécutant `onload` avec `mocha.run()`.

``` js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Mocha Tests</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://unpkg.com/mocha/mocha.css" />
  </head>
  <body>
    <div id="mocha"></div>

    <script src="https://unpkg.com/chai/chai.js"></script>
    <script src="https://unpkg.com/mocha/mocha.js"></script>

    <script class="mocha-init">
      mocha.setup('bdd');
      mocha.checkLeaks();
    </script>
    <script src="test.array.js"></script>
    <script src="test.object.js"></script>
    <script src="test.xhr.js"></script>
    <script class="mocha-exec">
      mocha.run();
    </script>
  </body>
</html>
```

## GREP

Le navigateur peut utiliser le `--grep` comme fonctionnalité. Ajoutez une chaîne d'interrogation à votre URL : grep=api`.

## CONFIGURATION DU NAVIGATEUR

Les options du moka peuvent être définies via `mocha.setup()`. Exemples :
``` js
// Utiliser l'interface "tdd".  C'est un raccourci pour paramétrer l'interface ;
// toute autre option doit être passée via un objet.
mocha.setup('tdd');

// Ceci est équivalent à ce qui précède.
mocha.setup({
  ui: 'tdd',
});

// Exemples d'options :
mocha.setup({
  allowUncaught: true,
  asyncOnly: true,
  bail: true,
  checkLeaks: true,
  forbidOnly: true,
  forbidPending: true,
  global: ['MyLib'],
  retries: 3,
  slow: '100',
  timeout: '2000',
  ui: 'bdd',
});
```

## OPTION(S) SPÉCIFIQUE(S) AU NAVIGATEUR
Le navigateur Mocha prend en charge de nombreuses options de cli, mais pas toutes. Pour utiliser une option cli qui contient un "-", veuillez convertir l'option en cas de camel-case, (par exemple "check-leaks" en "check-leaks").

**Les options qui diffèrent légèrement des [options cli] (https://mochajs.org/#command-line-usage):**
reporter` {string|constructeur} Vous pouvez passer un nom de reporter ou un constructeur de reporter personnalisé. Vous pouvez trouver des reporters recommandés pour le navigateur ici. Il est également possible d'utiliser des reporters intégrés. Leur emploi dans les navigateurs n'est ni recommandé ni pris en charge, ouvrez la console pour voir les résultats des tests.

**Options qui ne fonctionnent que dans le contexte du navigateur:**
NoHighlighting` {boolean} Si cette option est définie sur `true`, n'essayez pas d'utiliser la coloration syntaxique sur le code de test de sortie.

## RAPPORT

Le rapporteur HTML est le rapporteur par défaut lors de l'exécution de Mocha dans le navigateur. Il ressemble à ceci :

![enter image description here](https://mochajs.org/static/reporter-html.resize920,9999-withoutEnlargement.e2b1172cb9.png)

[Mochawesome](https://npm.im/mochawesome) est une excellente alternative au reporter HTML par défaut.

