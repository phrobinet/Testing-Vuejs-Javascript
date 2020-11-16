---
id: troubleshooting
title: Troubleshooting
---

# Troubleshooting

Euh oh, quelque chose a mal tourné ? Utilisez ce guide pour résoudre les problèmes avec Jest.

## Les tests échouent et vous ne savez pas pourquoi

Essayez d'utiliser le support de débogage intégré à Node. Note : Cela ne fonctionnera que dans Node.js 8+.

Placez une instruction `debugger;` dans l'un de vos tests, puis, dans le répertoire de votre projet, lancez :

```bash
node --inspect-brk node_modules/.bin/jest --runInBand [any other arguments here]
or on Windows
node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand [any other arguments here]
```

Jest fonctionnera ainsi dans un processus Node auquel un débogueur externe pourra se connecter. Notez que le processus s'arrêtera jusqu'à ce que le débogueur s'y connecte.

Pour déboguer dans Google Chrome (ou tout autre navigateur basé sur Chromium), ouvrez votre navigateur et allez dans `chrome://inspect` et cliquez sur "Open Dedicated DevTools for Node", ce qui vous donnera une liste des instances de nœuds disponibles auxquelles vous pouvez vous connecter. Cliquez sur l'adresse affichée dans le terminal (généralement quelque chose comme `localhost:9229`) après avoir exécuté la commande ci-dessus, et vous pourrez déboguer Jest en utilisant les DevTools de Chrome.

Les outils de développement Chrome seront affichés et un point d'arrêt sera fixé à la première ligne du script CLI de Jest (ceci est fait pour vous donner le temps d'ouvrir les outils de développement et pour empêcher que Jest ne s'exécute avant que vous n'ayez le temps de le faire). Cliquez sur le bouton qui ressemble à un bouton "play" en haut à droite de l'écran pour continuer l'exécution. Lorsque Jest exécute le test qui contient l'instruction `debugger`, l'exécution s'arrête et vous pouvez examiner la portée actuelle et la pile d'appels.

> Note : l'option `--runInBand` cli permet de s'assurer que Jest exécute le test dans le même processus plutôt que d'engendrer des processus pour des tests individuels. Normalement, Jest parallélise les tests entre les processus, mais il est difficile de déboguer plusieurs processus en même temps.

## Débugger dans VS Code

Il existe plusieurs façons de déboguer les tests Jest avec le [code de Visual Studio](https://code.visualstudio.com) intégré au [débogueur](https://code.visualstudio.com/docs/nodejs/nodejs-debugging).

Pour attacher le débogueur intégré, effectuez vos tests comme indiqué ci-dessus :

```bash
node --inspect-brk node_modules/.bin/jest --runInBand [any other arguments here]
or on Windows
node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand [any other arguments here]
```

Attachez ensuite le débogueur de VS Code en utilisant la configuration suivante `launch.json` :

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach",
      "port": 9229
    }
  ]
}
```

Pour lancer et joindre automatiquement un processus exécutant vos tests, utilisez la configuration suivante :

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Jest Tests",
      "type": "node",
      "request": "launch",
      "runtimeArgs": [
        "--inspect-brk",
        "${workspaceRoot}/node_modules/.bin/jest",
        "--runInBand"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "port": 9229
    }
  ]
}
```

ou le code suivant pour Windows :

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Jest Tests",
      "type": "node",
      "request": "launch",
      "runtimeArgs": [
        "--inspect-brk",
        "${workspaceRoot}/node_modules/jest/bin/jest.js",
        "--runInBand"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "port": 9229
    }
  ]
}
```

Si vous utilisez la [`create-react-app`](https://github.com/facebookincubator/create-react-app) de Facebook, vous pouvez déboguer vos tests Jest avec la configuration suivante :

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug CRA Tests",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/react-scripts",
      "args": ["test", "--runInBand", "--no-cache", "--env=jsdom"],
      "cwd": "${workspaceRoot}",
      "protocol": "inspector",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

Vous trouverez de plus amples informations sur le débogage des nœuds [ici](https://nodejs.org/api/debugger.html).

## Débugger dans WebStorm

La façon la plus simple de déboguer les tests Jest dans [WebStorm](https://www.jetbrains.com/webstorm/) est d'utiliser la configuration "Jest run/debug". Il lancera les tests et attachera automatiquement le débogueur.

Dans le menu WebStorm "Run", sélectionnez "Edit Configurations...". Ensuite, cliquez sur "+" et sélectionnez "Jest". Spécifiez éventuellement le fichier de configuration Jest, les options supplémentaires et les variables d'environnement. Sauvegardez la configuration, mettez les points d'arrêt dans le code, puis cliquez sur l'icône verte de débogage pour commencer le débogage.

Si vous utilisez la [`create-react-app`] (https://github.com/facebookincubator/create-react-app) de Facebook, dans la configuration de Jest run/debug, indiquez le chemin du paquet `react-scripts` dans le champ du paquet Jest et ajoutez `--env=jsdom` au champ des options de Jest.

## Question de mis en cache

Le script de transformation a été modifié ou Babel a été mis à jour et les changements ne sont pas reconnus par Jest ?

Réessayez avec [`--no-cache`](CLI.md#--cache). Jest caches a transformé les fichiers des modules pour accélérer l'exécution des tests. Si vous utilisez votre propre transformateur personnalisé, pensez à y ajouter une fonction `getCacheKey` : [getCacheKey in Relay](https://github.com/facebook/relay/blob/58cf36c73769690f0bbf90562707eadb062b029d/scripts/jest/preprocessor.js#L56-L61).

## Promesses non tenues

Si une promesse ne se concrétise pas du tout, cette erreur risque d'être rejetée :

```bash
- Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.`
```

Le plus souvent, cela est dû à des mises en œuvre contradictoires de la Promesse. Envisagez de remplacer la mise en œuvre globale de Promise par votre propre mise en œuvre, par exemple `global.Promise = jest.requireActual('promise');` et/ou consolidez les bibliothèques Promise utilisées en une seule.

Si votre test est long, vous pouvez envisager d'augmenter le délai d'attente en appelant "jest.setTimeout".

```js
jest.setTimeout(10000); // 10 second timeout
```

## Questions relatives aux gardiens

Essayez de lancer Jest avec [`--no-watchman`](CLI.md#--watchman) ou mettez l'option de configuration `watchman` à `false`.

Voir également [watchman troubleshooting](https://facebook.github.io/watchman/docs/troubleshooting).

## Les tests sont extrêmement lents sur le serveur Docker et/ou d'intégration continue (IC).

Bien que Jest soit la plupart du temps extrêmement rapide sur les ordinateurs modernes multicœurs dotés de SSD rapides, il peut être lent sur certaines configurations, comme l'ont découvert nos utilisateurs (https://github.com/facebook/jest/issues/1395) (https://github.com/facebook/jest/issues/1524#issuecomment-260246008).

Sur la base des [conclusions](https://github.com/facebook/jest/issues/1524#issuecomment-262366820), une façon d'atténuer ce problème et d'améliorer la vitesse de 50% est d'effectuer des tests de manière séquentielle.

Pour ce faire, vous pouvez effectuer des tests dans le même fil en utilisant [`--runInBand`](CLI.md#--runinband) :

```bash
# Utilisation de Jest CLI
jest --runInBand

# Utilisation du test yark (e.g. with create-react-app)
yarn test --runInBand
```

Une autre solution pour accélérer le temps d'exécution des tests sur les serveurs d'intégration continue tels que Travis-CI consiste à fixer le nombre maximum de travailleurs à ~_4_. Sur Travis-CI en particulier, cela peut réduire de moitié le temps d'exécution des tests. Note : Le plan Travis CI _libre_ disponible pour les projets open source ne comprend que 2 cœurs de processeur.

```bash
# Utilisation de Jest CLI
jest --maxWorkers=4

# Utilisation du test yarn (e.g. with create-react-app)
yarn test --maxWorkers=4
```

## `coveragePathIgnorePatterns` semble n'avoir aucun effet.

Assurez-vous que vous n'utilisez pas le plugin `babel-plugin-istanbul`. Jest enveloppe Istanbul, et donc dit aussi à Istanbul quels fichiers à instrumenter avec la collection de couverture. Lorsque vous utilisez le plugin `Babel-plugin-istanbul`, chaque fichier qui est traité par Babel aura un code de collecte de couverture, et ne sera donc pas ignoré par les `coveragePathIgnorePatterns`.

## Définir les tests

Les tests doivent être définis de manière synchrone pour que Jest puisse collecter vos tests.

À titre d'exemple pour montrer pourquoi c'est le cas, imaginez que nous écrivions un test comme ça :

```js
// Don't do this it will not work
setTimeout(() => {
  it('passes', () => expect(1).toBe(1));
}, 0);
```

Lorsque Jest exécute votre test pour collecter les `tests`, il n'en trouvera aucun parce que nous avons réglé la définition pour qu'elle se produise de manière asynchrone à la prochaine coche de la boucle d'événement.

Note : Cela signifie que lorsque vous utilisez `test.each`, vous ne pouvez pas définir la table de manière asynchrone dans un `beforeEach` / `beforeAll`.

## Toujours pas résolu ?

Voir [Aide](/help.html).
