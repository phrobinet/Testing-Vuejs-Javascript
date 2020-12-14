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

> **Notez:** Si vous utilisez Babel 7 ou supérieur, vous devez ajouter [babel-bridge](https://github.com/babel/babel-bridge) à vos devDependencies (`$ npm install --save-dev babel-core@^7.0.0-bridge.0`).

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

Jest peut être utilisé pour générer des rapports de couverture dans plusieurs formats. Voici un exemple simple pour commencer :

Développez votre configuration de `jest` avec l'option [`collectCoverage`](https://jestjs.io/docs/en/configuration#collectcoverage-boolean), puis ajoutez le tableau [`collectCoverageFrom`](https://jestjs.io/docs/en/configuration#collectcoveragefrom-array) pour définir les fichiers pour lesquels les informations de couverture doivent être collectées.

```json
{
  "jest": {
    "collectCoverage": true,
    "collectCoverageFrom": ["**/*.{js,vue}", "!**/node_modules/**"]
  }
}
```
Cela permettra d'établir des rapports de couverture avec les [déclarants de couverture par défaut](https://jestjs.io/docs/en/configuration#coveragereporters-array-string). Vous trouverez une documentation supplémentaire dans la [documentation de configuration de Jest](https://jestjs.io/docs/en/configuration#collectcoverage-boolean), où vous trouverez des options pour les seuils de couverture, les répertoires de sortie ciles, etc.
