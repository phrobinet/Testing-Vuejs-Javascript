---
id: getting-started
title: Getting Started
---

# Pour commencer

Installez Jest en utilisant[`yarn`](https://yarnpkg.com/en/package/jest):

```bash
yarn add --dev jest
```

Ou [`npm`](https://www.npmjs.com/):

```bash
npm install --save-dev jest
```

Note : La documentation de Jest utilise les commandes `yarn`, mais `npm` fonctionne également. Vous pouvez comparer les commandes `yarn` et `npm` dans la [docs yarn, ici] (https://yarnpkg.com/en/docs/migrating-from-npm#toc-cli-commands-comparison).

Commençons par écrire un test pour une fonction hypothétique qui additionne deux nombres. Tout d'abord, créez un fichier `sum.js` :

```javascript
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

Ensuite, créez un fichier nommé "sum.test.js". Celui-ci contiendra notre test réel :

```javascript
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Ajoutez la section suivante à votre `package.json` :

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Enfin, lancez `yarn test` ou `npm run test` et Jest imprimera ce message :

```bash
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
```

**Vous venez de réussir votre premier test avec Jest!**

Ce test utilisait `expect` et `to Be` pour vérifier que deux valeurs étaient exactement identiques. Pour en savoir plus sur les autres choses que Jest peut tester, voir [Using Matchers](UsingMatchers.md).

## En ligne de commande

Vous pouvez exécuter Jest directement depuis le CLI (s'il est disponible globalement dans votre `PATH`, par exemple par `yarn global add jest` ou `npm install jest --global`) avec une variété d'options utiles.

Voici comment exécuter Jest sur des fichiers correspondant à `my-test`, en utilisant `config.json` comme fichier de configuration et en affichant une notification native du système d'exploitation après l'exécution :

```bash
jest my-test --notify --config=config.json
```

Si vous souhaitez en savoir plus sur l'exécution de `jest` en ligne de commande, consultez la page [Jest CLI Options](CLI.md).

## Configuration supplémentaire

### Générer un fichier de configuration de base

En fonction de votre projet, Jest vous posera quelques questions et créera un fichier de configuration de base avec une brève description de chaque option :

```bash
jest --init
```

### Utiliser Babel

Pour utiliser [Babel](http://babeljs.io/), installez les dépendances requises via `yarn` :

```bash
yarn add --dev babel-jest @babel/core @babel/preset-env
```

Configurez Babel pour cibler votre version actuelle de Node en créant un fichier `babel.config.js` à la racine de votre projet :

```javascript
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```

**La configuration idéale pour Babel dépendra de votre projet ** Voir [Babel's docs] (https://babeljs.io/docs/en/) pour plus de détails.

<details><summary markdown="span"><strong>Making your Babel config jest-aware</strong></summary>

Jest va mettre `process.env.NODE_ENV` à `'test'` si ce n'est pas mis à un autre niveau. Vous pouvez utiliser cela dans votre configuration pour ne mettre en place que la compilation nécessaire à Jest, par exemple :

```javascript
// babel.config.js
module.exports = api => {
  const isTest = api.env('test');
  // Vous pouvez utiliser isTest pour déterminer les préréglages et les plugins à utiliser.

  return {
    // ...
  };
};
```

> Note : `babel-jest` est automatiquement installé lors de l'installation de Jest et transformera automatiquement les fichiers si une configuration babel existe dans votre projet. Pour éviter ce comportement, vous pouvez explicitement réinitialiser l'option de configuration `transform` :

```javascript
// jest.config.js
module.exports = {
  transform: {},
};
```

</details>

<details><summary markdown="span"><strong>Babel 6 support</strong></summary>

Jest 24 a abandonné son soutien à Babel 6. Nous vous recommandons vivement de passer à Babel 7, qui est activement maintenu. Toutefois, si vous ne pouvez pas passer à Babel 7, continuez à utiliser Jest 23 ou passez à Jest 24 avec "babel-jest" verrouillé à la version 23, comme dans l'exemple ci-dessous :

```
"dependencies": {
  "babel-core": "^6.26.3",
  "babel-jest": "^23.6.0",
  "babel-preset-env": "^1.7.0",
  "jest": "^24.0.0"
}
```

Bien que nous recommandions généralement d'utiliser la même version de chaque paquet Jest, ce contournement vous permettra de continuer à utiliser la dernière version de Jest avec Babel 6 pour l'instant.

</details>

### Utilisation de webpack

Jest peut être utilisé dans des projets qui utilisent [webpack](https://webpack.js.org/) pour gérer les ressources, les styles et la compilation. webpack offre des défis uniques par rapport à d'autres outils. Consultez le [guide webpack] (Webpack.md) pour commencer.

### Utilisation d'un colis

Jest peut être utilisé dans des projets qui utilisent [parcel-bundler] (https://parceljs.org/) pour gérer les actifs, les styles et la compilation, comme pour le webpack. Le paquet ne nécessite aucune configuration. Consultez le site officiel [docs](https://parceljs.org/getting_started.html) pour commencer.

### Utilisation de TypeScript

Jest supporte le TypeScript, via Babel. Tout d'abord, assurez-vous que vous avez suivi les instructions ci-dessus sur [using Babel](#using-babel). Ensuite, installez le `@babel/preset-typescript` via `yarn` :

```bash
yarn add --dev @babel/preset-typescript
```

Ajoutez ensuite `@babel/preset-typescript` à la liste des presets dans votre `babel.config.js`.

```diff
// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
+    '@babel/preset-typescript',
  ],
};
```

Cependant, il existe quelques [avertissements] (https://babeljs.io/docs/en/next/babel-plugin-transform-typescript.html#caveats) concernant l'utilisation de TypeScript avec Babel. Comme la prise en charge de TypeScript dans Babel est une transposition, Jest ne vérifiera pas la typographie de vos tests au fur et à mesure qu'ils sont effectués. Si vous le souhaitez, vous pouvez utiliser [ts-jest](https://github.com/kulshekhar/ts-jest).
