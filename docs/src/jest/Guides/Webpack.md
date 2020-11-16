---
id: webpack
title: Using with webpack
---

Jest peut être utilisé dans des projets qui utilisent [webpack](https://webpack.js.org/) pour gérer les actifs, les styles et la compilation. webpack _does_ offre des défis uniques par rapport aux autres outils car il s'intègre directement à votre application pour permettre la gestion des feuilles de style, des actifs comme les images et les polices, ainsi que le vaste écosystème de langages et d'outils de compilation vers JavaScript.

## Un exemple de webpack

Commençons par une sorte de fichier de configuration webpack commun et traduisons le en une configuration Jest.

```js
// webpack.config.js
module.exports = {
  module: {
    loaders: [
      {exclude: ['node_modules'], loader: 'babel', test: /\.jsx?$/},
      {loader: 'style-loader!css-loader', test: /\.css$/},
      {loader: 'url-loader', test: /\.gif$/},
      {loader: 'file-loader', test: /\.(ttf|eot|svg)$/},
    ],
  },
  resolve: {
    alias: {
      config$: './configs/app-config.js',
      react: './vendor/react-master',
    },
    extensions: ['', 'js', 'jsx'],
    modules: [
      'node_modules',
      'bower_components',
      'shared',
      '/shared/vendor/modules',
    ],
  },
};
```

Si vous avez des fichiers JavaScript qui sont transformés par Babel, vous pouvez [activer le support pour Babel] (GettingStarted.md#using-babel) en installant le plugin `babel-jest`. Les transformations JavaScript non-Babel peuvent être traitées avec l'option de configuration de Jest [`transform`](Configuration.md#transform-objectstring-pathtotransformer--pathtotransformer-object).

### Gestion des actifs statiques

Ensuite, configurons Jest pour qu'il gère avec élégance les fichiers d'actifs tels que les feuilles de style et les images. Habituellement, ces fichiers ne sont pas particulièrement utiles dans les tests, donc nous pouvons les simuler en toute sécurité. Cependant, si vous utilisez des modules CSS, il est préférable de simuler un proxy pour vos recherches de noms de classe.

```json
// package.json
{
  "jest": {
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    }
  }
}
```

Et les fichiers fictifs eux-mêmes :

```js
// __mocks__/styleMock.js

module.exports = {};
```

```js
// __mocks__/fileMock.js

module.exports = 'test-file-stub';
```

### Modules CSS fictifs

Vous pouvez utiliser un [ES6 Proxy](https://github.com/keyanzhang/identity-obj-proxy) pour simuler les [modules CSS](https://github.com/css-modules/css-modules) :

```bash
yarn add --dev identity-obj-proxy
```

Ensuite, toutes vos recherches className sur l'objet styles seront renvoyées telles quelles (par exemple, `styles.foobar === 'foobar'). C'est très pratique pour le test "React [Snapshot Testing]" (SnapshotTesting.md).

```json
// package.json (for CSS Modules)
{
  "jest": {
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less)$": "identity-obj-proxy"
    }
  }
}
```

> Remarquez que le proxy est activé par défaut dans le nœud 6. Si vous n'êtes pas encore sur le Node 6, assurez-vous que vous invoquez Jest en utilisant `node --harmony_proxies node_modules/.bin/jest`.

Si `moduleNameMapper` ne peut pas répondre à vos besoins, vous pouvez utiliser l'option de configuration de Jest [`transform`](Configuration.md#transform-objectstring-pathtotransformer--pathtotransformer-object) pour spécifier comment les actifs sont transformés. Par exemple, un transformateur qui renvoie le nom de base d'un fichier (tel que `require('logo.jpg');` renvoie `'logo'`) peut être écrit comme :

```js
// fileTransformer.js
const path = require('path');

module.exports = {
  process(src, filename, config, options) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  },
};
```

```json
// package.json (for custom transformers and CSS Modules)
{
  "jest": {
    "moduleNameMapper": {
      "\\.(css|less)$": "identity-obj-proxy"
    },
    "transform": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileTransformer.js"
    }
  }
}
```

Nous avons dit à Jest d'ignorer les fichiers correspondant à une feuille de style ou à une extension d'image, et d'exiger à la place nos fichiers fantaisie. Vous pouvez ajuster l'expression régulière pour qu'elle corresponde aux types de fichiers gérés par la configuration de votre webpack.

Note : si vous utilisez babel-jest avec des préprocesseurs de code supplémentaires, vous devez définir explicitement babel-jest comme un transformateur pour votre code JavaScript afin de faire correspondre les fichiers `.js` au module babel-jest._

```json
"transform": {
  "^.+\\.js$": "babel-jest",
  "^.+\\.css$": "custom-transformer",
  ...
}
```

### Configurer Jest pour trouver nos fichiers

Maintenant que Jest sait comment traiter nos dossiers, nous devons lui dire comment les _trouver_. Pour les options `modulesDirectories` et `extensions` de webpack, il existe des analogues directs dans les options `moduleDirectories` et `moduleFileExtensions` de Jest.

```json
// package.json
{
  "jest": {
    "moduleFileExtensions": ["js", "jsx"],
    "moduleDirectories": ["node_modules", "bower_components", "shared"],

    "moduleNameMapper": {
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
      "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
    }
  }
}
```

> Note : `<rootDir>` est un token spécial qui est remplacé par Jest avec la racine de votre projet. La plupart du temps, ce sera le dossier où se trouve votre `package.json` à moins que vous ne spécifiiez une option `rootDir` personnalisée dans votre configuration.

De même, l'option `resolve.root` de webpack fonctionne comme la variable `NODE_PATH` env, que vous pouvez définir, ou utiliser l'option `modulePaths`.

```json
// package.json
{
  "jest": {
    "modulePaths": ["/shared/vendor/modules"],
    "moduleFileExtensions": ["js", "jsx"],
    "moduleDirectories": ["node_modules", "bower_components", "shared"],
    "moduleNameMapper": {
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
      "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
    }
  }
}
```

Et enfin, nous devons gérer le webpack "alias". Pour cela, nous pouvons à nouveau utiliser l'option "moduleNameMapper".

```json
// package.json
{
  "jest": {
    "modulePaths": ["/shared/vendor/modules"],
    "moduleFileExtensions": ["js", "jsx"],
    "moduleDirectories": ["node_modules", "bower_components", "shared"],

    "moduleNameMapper": {
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
      "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",

      "^react(.*)$": "<rootDir>/vendor/react-master$1",
      "^config$": "<rootDir>/configs/app-config.js"
    }
  }
}
```

C'est tout ! Le webpack est un outil complexe et flexible, vous devrez donc peut-être procéder à quelques ajustements pour répondre aux besoins spécifiques de votre demande. Heureusement, pour la plupart des projets, Jest devrait être plus que suffisamment flexible pour gérer la configuration de votre webpack.

> Note : Pour des configurations de webpack plus complexes, vous pouvez également envisager des projets tels que [babel-plugin-webpack-loaders](https://github.com/istarkov/babel-plugin-webpack-loaders).

## Utilisation avec le webpack 2

webpack 2 offre un support natif pour les modules ES. Cependant, Jest fonctionne en Node, et nécessite donc la transposition des modules ES vers les modules CommonJS. Par conséquent, si vous utilisez le webpack 2, vous voudrez probablement configurer Babel pour transposer les modules ES en modules CommonJS uniquement dans l'environnement "test".

```json
// .babelrc
{
  "presets": [["env", {"modules": false}]],

  "env": {
    "test": {
      "plugins": ["transform-es2015-modules-commonjs"]
    }
  }
}
```

> Note : Jest met en cache des fichiers pour accélérer l'exécution des tests. Si vous avez mis à jour le fichier .babelrc et que Jest ne fonctionne toujours pas, essayez d'exécuter Jest avec `--no-cache`.

Si vous utilisez les importations dynamiques (`import('some-file.js').then(module => ...)`), vous devez activer le plugin `dynamic-import-node`.

```json
// .babelrc
{
  "presets": [["env", {"modules": false}]],

  "plugins": ["syntax-dynamic-import"],

  "env": {
    "test": {
      "plugins": ["dynamic-import-node"]
    }
  }
}
```

Pour un exemple d'utilisation de Jest avec Webpack avec React, Redux, et Node, vous pouvez en voir un [ici](https://github.com/jenniferabowd/jest_react_redux_node_webpack_complex_example).
