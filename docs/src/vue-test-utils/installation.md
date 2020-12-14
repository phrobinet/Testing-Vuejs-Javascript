# Installation

## Version sémantique

Vue Test Utils suit [Semantic Versioning](https://semver.org/) dans tous ses projets officiels pour les fonctionnalités et le comportement documentés. Pour les comportements non documentés ou les internes exposés, les changements sont décrits dans les [notes de version](https://github.com/vuejs/vue-test-utils/releases).

## Utilisation des outils de Vue Test Utils avec Jest (recommandé)

Jest est un outil de test développé par Facebook, visant à fournir une solution de test unitaire sur batterie. Vous pouvez en savoir plus sur Jest en consultant sa [documentation officielle](https://jestjs.io/).
Jest is a test runner developed by Facebook, aiming to deliver a battery-included unit testing solution. You can learn more about Jest on its [official documentation](https://jestjs.io/).

<div class="vueschool"><a href="https://vueschool.io/courses/learn-how-to-test-vuejs-components?friend=vuejs" target="_blank" rel="sponsored noopener" title="Learn how to use Jest and Vue Test Utils to test Single File Components with Vue School">Apprenez comment utiliser Jest pour tester les composants à fichier unique avec Vue School</a></div>

Si vous utilisez le CLI de Vue pour construire votre projet, vous pouvez utiliser le plugin [cli-plugin-unit-jest](https://cli.vuejs.org/core-plugins/unit-jest.html) pour effectuer des tests Jest.

Après avoir configuré Jest, la première chose à faire est d'installer Vue Test Utils et [`vue-jest`](https://github.com/vuejs/vue-jest) pour traiter les mono-fichiers.

```bash
$ npm install --save-dev @vue/test-utils vue-jest
```

Ensuite, vous devez dire à Jest de transformer les fichiers `.vue` en utilisant `.vu-jest`. Vous pouvez le faire en ajoutant la configuration suivante dans le `package.json` ou dans un [fichier de configuration de Jest](https://jestjs.io/docs/en/configuration) :

```json
{
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      // dire à Jest de gérer les fichiers `*.vue`
      "vue"
    ],
    "transform": {
      // traiter les fichiers `*.vue` avec `vue-jest`
      ".*\\.(vue)$": "vue-jest"
    }
  }
}
```

> **Notez:** Si vous utilisez Babel 7 ou suppérieur, vous devez ajouter [babel-bridge](https://github.com/babel/babel-bridge) à vos devDependencies (`$ npm install --save-dev babel-core@^7.0.0-bridge.0`).

### Gestion des alias de webpack

Si vous utilisez un alias de résolution dans la configuration du webpack, par exemple l'alias `@` vers `/src`, vous devez ajouter une configuration correspondante pour Jest également, en utilisant l'option `moduleNameMapper` :

```json
{
  "jest": {
    // suportent le même@ -> cartographie des alias src dans le code source
    "moduleNameMapper": {
      "^@/(.*)$": "<rootDir>/src/$1"
    }
  }
}
```

### Couverture du code

Jest peut être utilisé pour générer des rapports de couverture dans plusieursformats. Voici un exemple simple pour commencer :

Développez votre configuration de `jest` avec l'option [`collectCoverage`](https://jestjs.io/docs/en/configuration#collectcoverage-boolean), puis ajoutez le tableau [`collectCoverageFrom`](https://jestjs.io/docs/en/configuration#collectcoveragefrom-array) pour définir les fichiers pour lesquels les informations de couverture doivent être collectées.

```json
{
  "jest": {
    "collectCoverage": true,
    "collectCoverageFrom": ["**/*.{js,vue}", "!**/node_modules/**"]
  }
}
```
Cela permettra d'établir des rapports de couverture avec les [declarants de couverture par défaut](https://jestjs.io/docs/en/configuration#coveragereporters-array-string). Vous trouverez une documentation supplémentaire dans la [documentation de configuration de Jest](https://jestjs.io/docs/en/configuration#collectcoverage-boolean), où vous trouverez des options pour les seuils de couverture, les répertoires de sortie ciles, etc.

## Utilisation d'autres testeurs

### Fonctionnement de Vue Test Utils avec Karma

[Karma](http://karma-runner.github.io/) est un programme de test qui lance des navigateurs, effectue des tests et nous les rapporte.

En plus de Karma, vous pouvez utiliser le cadre [Mocha](https://mochajs.org/) pour écrire les tests, et la bibliothèque [Chai](http://chaijs.com/) pour les assertions des tests. Vous pouvez également consulter [Sinon](http://sinonjs.org/) pour créer des spies et des stubs

Vous trouverez ci-dessous une configuration de base de Karma pour Vue Test Utils :

```js
// karma.conf.js
var webpackConfig = require('./webpack.config.js')

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: ['test/**/*.spec.js'],
    webpack: webpackConfig,
    reporters: ['spec'],
    browsers: ['Chrome'],
    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    }
  })
}
```

### Fonctionnement de Vue Test Utils avec mocha-webpack

Une autre stratégie pour tests les SFC consiste à compiler tous nos tests via la webpack et à les exécuter ensuite dans un testeur. L'avantage de cette approche est qu'elle nous donne un support complet pour toutes les fonctionnalités du webpack et du `vue-loader`, donc nous n'avons pas à faire de compromis dans notre code source.

Nous avons trouvé [`mochapack`](https://github.com/sysgears/mochapack) qui nous offre une expérience très simplifiée pour cette tâche particulière.

La première chose à faire est d'installer des dépendances de test :

```bash
npm install --save-dev @vue/test-utils mocha mochapack
```

Après avoir installé Vue Test Utils et `mochapack`, vous devez définir un script de test dans votre `package.json` :

```json
// package.json
{
  "scripts": {
    "test": "mochapack --webpack-config webpack.config.js --require test/setup.js test/**/*.spec.js"
  }
}
```

### Fonctionnement de Vue Test Utils sans étape de construction

Alors qu'il est courant de construire des applications Vue en utilisant des outils tels que [webpack](https://webpack.js.org/) pour regrouper l'application, `vue-loader` pour exploiter les composants de fichiers uniques, il est possible d'd'utiliser  beaucoup moins les Vue Test Utils. Les exigences minimales pour les Vue Test Utils, en dehors de la bibliothèque elle-même, sont les suivantes :
- Vue
- [vue-template-compiler](https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler#readme)
- a DOM (be it [jsdom](https://github.com/jsdom/jsdom) in a Node environment, or the DOM in a real browser)

Notez que `jsdom`(ou toute autre implémentation de DOM) doit être requis avant les Vue Test Utils, car il s'attend à ce qu'un DOM (vrai DOM, ou JSDOM) existe.
Notice that `jsdom`(or any other DOM implementation) must be required before Vue Test Utils, because it expects a DOM (real DOM, or JSDOM) to exist.
