---
id: watch-plugins
title: Les plugins de surveillances
---

# Les plugins de surveillances

Le système de plugin de montre Jest permet de se connecter à des parties spécifiques de Jest et de définir des invites de menu en mode montre qui exécutent le code sur simple pression d'une touche. Combinées, ces fonctionnalités vous permettent de développer des expériences interactives adaptées à votre flux de travail.

## Watch Plugin Interface

```javascript
class MyWatchPlugin {
  // Ajouter des crochets aux événements du cycle de vie des Jest
  apply(jestHooks) {}

  // Obtenez les informations nécessaires pour les plugins interactifs
  getUsageInfo(globalConfig) {}

  // Exécuté lorsque la clé de `getUsageInfo` est entrée
  run(globalConfig, updateConfigAndRun) {}
}
```

## Hooking into Jest

Pour connecter votre watch plugin à Jest, ajoutez son chemin sous `watchPlugins` dans votre configuration Jest :

```javascript
// jest.config.js
module.exports = {
  // ...
  watchPlugins: ['path/to/yourWatchPlugin'],
};
```

Des plugins de surveillance personnalisés peuvent ajouter des accroches aux événements de Jest. Ces accroches peuvent être ajoutées avec ou sans clé interactive dans le menu du mode montre.

### `apply(jestHooks)`

Des crochets de bouffon peuvent être attachés en appliquant la méthode "Appliquer". Cette méthode reçoit un argument "jestHooks" qui permet au plugin de s'accrocher à des parties spécifiques du cycle de vie d'un test.

```javascript
class MyWatchPlugin {
  apply(jestHooks) {}
}
```

Vous trouverez ci-dessous les crochets disponibles dans Jest.

#### `jestHooks.shouldRunTestSuite(testSuiteInfo)`

Renvoie un booléen (ou `Promise<boolean>` pour la gestion des opérations asynchrones) pour spécifier si un test doit être exécuté ou non.

Par exemple :

```javascript
class MyWatchPlugin {
  apply(jestHooks) {
    jestHooks.shouldRunTestSuite(testSuiteInfo => {
      return testSuiteInfo.testPath.includes('my-keyword');
    });

    // or a promise
    jestHooks.shouldRunTestSuite(testSuiteInfo => {
      return Promise.resolve(testSuiteInfo.testPath.includes('my-keyword'));
    });
  }
}
```

#### `jestHooks.onTestRunComplete(results)`

Il est appelé à la fin de chaque essai. Il a les résultats des tests comme argument.

Par exemple :

```javascript
class MyWatchPlugin {
  apply(jestHooks) {
    jestHooks.onTestRunComplete(results => {
      this._hasSnapshotFailure = results.snapshot.failure;
    });
  }
}
```

#### `jestHooks.onFileChange({projects})`

Est appelé chaque fois qu'il y a un changement dans le système de fichiers

- `projects: Array<config: ProjectConfig, testPaths: Array<string>`: Comprend tous les parcours de test que Jest surveille.

Par exemple :

```javascript
class MyWatchPlugin {
  apply(jestHooks) {
    jestHooks.onFileChange(({projects}) => {
      this._projects = projects;
    });
  }
}
```

## Watch Menu Integration

Les plugins de surveillance personnalisés peuvent également ajouter ou remplacer des fonctionnalités au menu de surveillance en spécifiant une paire clé/guide dans la méthode "GetUsageInfo" et une méthode "Run" pour l'exécution de la clé.

### `getUsageInfo(globalConfig)`

Pour ajouter une clé au menu de surveillance, implémentez la méthode "getUsageInfo", en retournant une clé et l'invite :

```javascript
class MyWatchPlugin {
  getUsageInfo(globalConfig) {
    return {
      key: 's',
      prompt: 'do something',
    };
  }
}
```

Cela ajoutera une ligne dans le menu du mode surveillance _(`› Press s to do something.`)_

```text
Watch Usage
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press s to do something. // <-- This is our plugin
 › Press Enter to trigger a test run.
```

**Note**: Si la clé de votre plugin existe déjà en tant que clé par défaut, votre plugin remplacera cette clé.

### `run(globalConfig, updateConfigAndRun)`

Pour gérer les événements de pression de la touche retournée par "GetUsageInfo", vous pouvez implémenter la méthode "run". Cette méthode renvoie un `Promise<boolean>` qui peut être résolu lorsque le plugin veut renvoyer le contrôle à Jest. Le "booléen" spécifie si Jest doit relancer les tests après avoir récupéré le contrôle.

- `globalConfig`: Une représentation de la configuration globale actuelle de Jest
- `updateConfigAndRun`: Permet de déclencher un essai pendant que le plugin interactif est en cours d'exécution.

```javascript
class MyWatchPlugin {
  run(globalConfig, updateConfigAndRun) {
    // Faire quelque chose.
  }
}
```

**Note**: Si vous appelez `updateConfigAndRun`, votre méthode `run` ne devrait pas se résoudre à une valeur de vérité, car cela déclencherait une double exécution.

#### Authorized configuration keys

Pour des raisons de stabilité et de sécurité, seule une partie des clés de configuration globale peut être mise à jour avec `updateConfigAndRun`. La liste blanche actuelle est la suivante :

- [`bail`](configuration.html#bail-number--boolean)
- [`changedSince`](cli.html#--changedsince)
- [`collectCoverage`](configuration.html#collectcoverage-boolean)
- [`collectCoverageFrom`](configuration.html#collectcoveragefrom-array)
- [`collectCoverageOnlyFrom`](configuration.html#collectcoverageonlyfrom-array)
- [`coverageDirectory`](configuration.html#coveragedirectory-string)
- [`coverageReporters`](configuration.html#coveragereporters-arraystring)
- [`notify`](configuration.html#notify-boolean)
- [`notifyMode`](configuration.html#notifymode-string)
- [`onlyFailures`](configuration.html#onlyfailures-boolean)
- [`reporters`](configuration.html#reporters-arraymodulename--modulename-options)
- [`testNamePattern`](cli.html#--testnamepatternregex)
- [`testPathPattern`](cli.html#--testpathpatternregex)
- [`updateSnapshot`](cli.html#--updatesnapshot)
- [`verbose`](configuration.html#verbose-boolean)

## Customization

Les plugins peuvent être personnalisés via votre configuration Jest.

```javascript
// jest.config.js
module.exports = {
  // ...
  watchPlugins: [
    [
      'path/to/yourWatchPlugin',
      {
        key: 'k', // <- your custom key
        prompt: 'show a custom prompt',
      },
    ],
  ],
};
```

Noms de configuration recommandés :

- `key`: Modifie la clé du plugin.
- `prompt`: Permet à l'utilisateur de personnaliser le texte dans l'invite du plugin.

Si l'utilisateur a fourni une configuration personnalisée, celle-ci sera passée en argument au constructeur du plugin.

```javascript
class MyWatchPlugin {
  constructor({config}) {}
}
```

## Choisir une bonne clé

Jest permet à des plugins tiers de passer outre certaines de ses touches de fonction intégrées, mais pas toutes. Plus précisément, les touches suivantes sont **non écrasables** :

- `c` (efface les modèles de filtre)
- `i` (mise à jour interactives des instantanés non concordants)
- `q` (quitte)
- `u` (met à jour tous les instantanés non concordants)
- `w` (affiche l'utilisation du mode veille / les actions disponibles)

Les touches suivantes pour les fonctionnalités intégrées **peuvent être écrasées** :

- `p` (test du modèle de nom de fichier)
- `t` (nom du modèle de test)

Toute clé non utilisée par la fonctionnalité intégrée peut être réclamée, comme vous pouvez vous y attendre. Essayez d'éviter d'utiliser des touches qui sont difficiles à obtenir sur divers claviers (par exemple "é", "€"), ou qui ne sont pas visibles par défaut (par exemple, de nombreux claviers Mac n'ont pas d'indices visuels pour les caractères tels que "`|`, `\`, `[`, etc.

### Quand un conflit survient

Si votre plugin tente d'écraser une clé réservée, Jest fera une erreur en affichant un message descriptif, par exemple :

> Watch plugin YourFaultyPlugin a tenté d'enregistrer la clé "q", qui est réservée en interne pour quitter le mode surveillance. Veuillez changer la clé de configuration pour ce plugin.

Il est également interdit aux plugins tiers d'écraser une clé déjà réservée par un autre plugin tiers présent plus tôt dans la liste des plugins configurés (paramètre de tableau `watchPlugins`). Lorsque cela se produit, vous recevez également un message d'erreur qui tente de vous aider à corriger ce problème :

> Watch plugins YourFaultyPlugin et TheirFaultyPlugin ont tous deux tenté d'enregistrer la clé `x`. Veuillez modifier la configuration de la clé pour l'un des plugins en conflit afin d'éviter tout chevauchement.
