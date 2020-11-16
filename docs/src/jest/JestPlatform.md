---
id: jest-platform
title: Jest Platform
---

# La platforme Jest

Vous pouvez choisir des caractéristiques spécifiques de Jest et les utiliser comme des ensembles autonomes. Voici une liste des paquets disponibles :

## jest-changed-files

Outil permettant d'identifier les fichiers modifiés dans un dépôt git/hg. Exporte deux fonctions :

- `getChangedFilesForRoots` retourne une promesse qui se résout à un objet avec les fichiers et les repos modifiés.
- `findRepos` renvoie une promesse qui se résout à un ensemble de dépôts contenus dans le chemin spécifié.

### Exemple

```javascript
const {getChangedFilesForRoots} = require('jest-changed-files');

// imprimer l'ensemble des fichiers modifiés depuis le dernier commit dans le repo en cours
getChangedFilesForRoots(['./'], {
  lastCommit: true,
}).then(result => console.log(result.changedFiles));
```

Vous pouvez en savoir plus sur les fichiers "jest-changed-files" dans le [fichier readme] (https://github.com/facebook/jest/blob/master/packages/jest-changed-files/README.md).

## jest-diff

Outil permettant de visualiser les changements de données. Exporte une fonction qui compare deux valeurs de n'importe quel type et renvoie une chaîne "joliment imprimée" illustrant la différence entre les deux arguments.

### Exemple

```javascript
const diff = require('jest-diff').default;

const a = {a: {b: {c: 5}}};
const b = {a: {b: {c: 6}}};

const result = diff(a, b);

// visualisation de la différence
console.log(result);
```

## jest-docblock

Outil permettant d'extraire et d'analyser les commentaires en haut d'un fichier JavaScript. Exporte diverses fonctions pour manipuler les données à l'intérieur du bloc de commentaires.

### Exemple

```javascript
const {parseWithComments} = require('jest-docblock');

const code = `
/**
 * This is a sample
 *
 * @flow
 */

 console.log('Hello World!');
`;

const parsed = parseWithComments(code);

// imprime un objet avec deux attributs : les commentaires et les pragmas.
console.log(parsed);
```

Vous pouvez en savoir plus sur le "jest-docblock" dans le [fichier readme] (https://github.com/facebook/jest/blob/master/packages/jest-docblock/README.md).

## jest-get-type

Module qui identifie le type primitif de toute valeur JavaScript. Exporte une fonction qui renvoie une chaîne de caractères avec le type de la valeur passée en argument.

### Exemple

```javascript
const getType = require('jest-get-type');

const array = [1, 2, 3];
const nullValue = null;
const undefinedValue = undefined;

// prints 'array'
console.log(getType(array));
// prints 'null'
console.log(getType(nullValue));
// prints 'undefined'
console.log(getType(undefinedValue));
```

## jest-validate

Outil de validation des configurations soumises par les utilisateurs. Exporte une fonction qui prend deux arguments : la configuration de l'utilisateur et un objet contenant un exemple de configuration et d'autres options. La valeur de retour est un objet avec deux attributs :

- `hasDeprecationWarnings`un booléen indiquant si la configuration soumise comporte des avertissements de déprédation,
- `isValid`, un booléen indiquant si la configuration est correcte ou non.

### Exemple

```javascript
const {validate} = require('jest-validate');

const configByUser = {
  transform: '<rootDir>/node_modules/my-custom-transform',
};

const result = validate(configByUser, {
  comment: '  Documentation: http://custom-docs.com',
  exampleConfig: {transform: '<rootDir>/node_modules/babel-jest'},
});

console.log(result);
```

Vous pouvez en savoir plus sur `jest-validate` dans le [fichier readme] (https://github.com/facebook/jest/blob/master/packages/jest-validate/README.md).

## jest-worker

Module utilisé pour la parallélisation des tâches. Exporte une classe `JestWorker` qui prend le chemin du module Node.js et vous permet d'appeler les méthodes exportées du module comme si elles étaient des méthodes de classe, en retournant une promesse qui se résout lorsque la méthode spécifiée termine son exécution dans un processus bifurqué.

### Exemple

```javascript
// heavy-task.js

module.exports = {
  myHeavyTask: args => {
    // long running CPU intensive task.
  },
};
```

```javascript
// main.js

async function main() {
  const worker = new Worker(require.resolve('./heavy-task.js'));

  // exécuter 2 tâches en parallèle avec des arguments différents
  const results = await Promise.all([
    worker.myHeavyTask({foo: 'bar'}),
    worker.myHeavyTask({bar: 'foo'}),
  ]);

  console.log(results);
}

main();
```

Vous pouvez en savoir plus sur le `jest-worker` dans le [fichier readme] (https://github.com/facebook/jest/blob/master/packages/jest-worker/README.md).

## pretty-format

Exporte une fonction qui convertit toute valeur JavaScript en une chaîne lisible par l'homme. Prend en charge tous les types de JavaScript intégrés dès le départ et permet l'extension pour des types d'applications spécifiques via des plugins définis par l'utilisateur.

### Exemple

```javascript
const prettyFormat = require('pretty-format');

const val = {object: {}};
val.circularReference = val;
val[Symbol('foo')] = 'foo';
val.map = new Map([['prop', 'value']]);
val.array = [-0, Infinity, NaN];

console.log(prettyFormat(val));
```

Vous pouvez en savoir plus sur le "pretty-format" dans le [fichier readme].(https://github.com/facebook/jest/blob/master/packages/pretty-format/README.md).
