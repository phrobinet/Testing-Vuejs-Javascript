---
id: manual-mocks
title: Manual Mocks
---
# Simulation manuelle

Des simulations manuelles sont utilisées pour masquer les fonctionnalités à l'aide de données fictives. Par exemple, au lieu d'accéder à une ressource distante comme un site web ou une base de données, vous pouvez créer une simulation manuelle qui vous permet d'utiliser de fausses données. Cela garantit que vos tests seront rapides et ne seront pas faussés.

## Modules utilisateurs fictifs

Les simulations manuelles sont définies par l'écriture d'un module dans un sous-répertoire `__mocks__/` immédiatement adjacent au module. Par exemple, pour simuler un module appelé `user` dans le répertoire `models`, créez un fichier appelé `user.js` et placez-le dans le répertoire `models/__mocks`. Notez que le répertoire `__mocks__` est sensible à la casse, donc le fait de nommer le répertoire `__MOCKS__` va casser sur certains systèmes.

> Lorsque nous avons besoin de ce module dans nos tests, il faut explicitement appeler `jest.mock('./moduleName')`.

## Modules de nœuds fictifs

Si le module que vous simulez est un module Node (par exemple : `lodash`), le mock doit être placé dans le répertoire `__mocks__` adjacent à `node_modules` (sauf si vous avez configuré [`roots`](Configuration.md#roots-arraystring) pour pointer vers un dossier autre que la racine du projet) et sera **automatiquement** mocké. Il n'est pas nécessaire d'appeler explicitement `jest.mock('nom_du_module')`.

Les modules scopés peuvent être simulés en créant un fichier dans une structure de répertoire qui correspond au nom du module simulé. Par exemple, pour simuler un module appelé `@scope/project-name`, créez un fichier à `__mocks__/@scope/project-name.js`, en créant le répertoire `@scope/` en conséquence.

> Attention : Si nous voulons simuler les modules de base du Node (par exemple : `fs` ou `path`), alors l'appel explicite de `jest.mock('path')` est **requis**, parce que les modules de base du Node ne sont pas simulés par défaut.

## Exemples

```bash
.
├── config
├── __mocks__
│   └── fs.js
├── models
│   ├── __mocks__
│   │   └── user.js
│   └── user.js
├── node_modules
└── views
```

Lorsqu'une simulation manuelle existe pour un module donné, le système de modules de Jest utilisera ce module en appelant explicitement `jest.mock('moduleName')`. Cependant, lorsque `automock` est défini sur `true`, l'implémentation manuelle de la fantaisie sera utilisée au lieu de la fantaisie créée automatiquement, même si `jest.mock('nomdumodules')` n'est pas appelé. Pour éviter ce comportement, vous devrez appeler explicitement `jest.unmock('nomdumodèle')` dans les tests qui doivent utiliser l'implémentation réelle du module.

> Note : Afin de se moquer correctement, Jest a besoin que `jest.mock('moduleName')` soit dans la même portée que l'instruction `require/import`.

Voici un exemple d'implémentation où nous avons un module qui fournit un résumé de tous les fichiers d'un répertoire donné. Dans ce cas, nous utilisons le module de base (intégré) `fs`.

```javascript
// FileSummarizer.js
'use strict';

const fs = require('fs');

function summarizeFilesInDirectorySync(directory) {
  return fs.readdirSync(directory).map(fileName => ({
    directory,
    fileName,
  }));
}

exports.summarizeFilesInDirectorySync = summarizeFilesInDirectorySync;
```

Comme nous voulons que nos tests évitent de toucher le disques (qui est assez lent et fragile), nous créons une simulation manuelle pour le module `fs` en étendant une maquette automatique. Notre modèle manuel implémentera des versions personnalisées des API `fs` sur lesquelles nous pourrons nous appuyer pour nos tests :

```javascript
// __mocks__/fs.js
'use strict';

const path = require('path');

const fs = jest.createMockFromModule('fs');

// Il s'agit d'une fonction personnalisée que nos tests peuvent utiliser lors de la configuration pour spécifier
// à quoi doivent ressembler les fichiers du système de fichiers `mock` lorsque l'uns des API `fs` est utilisée.
// `fs` APIs are used.
let mockFiles = Object.create(null);
function __setMockFiles(newMockFiles) {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  }
}

// Une version personnalisée de `readdirSync` qui lit à partir de la simulation spéciale
// liste de fichiers établie via __setMockFiles
function readdirSync(directoryPath) {
  return mockFiles[directoryPath] || [];
}

fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;

module.exports = fs;
```

Maintenant, que nous écrivons notre test. Notez que nous devons dire explicitement que nous voulons simuler le module `fs` parce que c'est un module de base de Node :

```javascript
// __tests__/FileSummarizer-test.js
'use strict';

jest.mock('fs');

describe('listFilesInDirectorySync', () => {
  const MOCK_FILE_INFO = {
    '/path/to/file1.js': 'console.log("file1 contents");',
    '/path/to/file2.txt': 'file2 contents',
  };

  beforeEach(() => {
    // Mettre en place des informations fictives sur les fichiers avant chaque test
    require('fs').__setMockFiles(MOCK_FILE_INFO);
  });

  test('includes all files in the directory in the summary', () => {
    const FileSummarizer = require('../FileSummarizer');
    const fileSummary = FileSummarizer.summarizeFilesInDirectorySync(
      '/path/to',
    );

    expect(fileSummary.length).toBe(2);
  });
});
```

L'exemple présenté ici utilise [`jest.createMockFromModule`](JestObjectAPI.md#jestcreatemockfrommodulemodulename) pour générer un modèle automatique, et remplace son comportement par défaut. C'est l'approche recommandée, mais elle est totalement optionnelle. Si vous ne souhaitez pas du tout utiliser la simulation automatique, vous pouvez exporter vos propres fonctions à partir du fichier de simulation. L'inconvénient des simulations entièrement manuelles est qu'elles sont manuelles, ce qui signifie que vous devez les mettre à jour manuellement chaque fois que le module dont elles sont issues change. C'est pourquoi il est préférable d'utiliser ou d'étendre la maquette automatique lorsqu'elle répond à vos besoins.

Pour s'assurer qu'une simulation manuelle et son implémentation réelle restent synchronisées, il peut être utile d'exiger le module réel en utilisant [`jest.requireActual(moduleName)`](JestObjectAPI.md#jestrequireactualmodulename) dans votre simulation manuelle et de la modifier avec les fonctions de la simulation avant de l'exporter.

Le code pour cet exemple est disponible sur le site [examples/manual-mocks](https://github.com/facebook/jest/tree/master/examples/manual-mocks).

## Utilisation avec les importations de modules ES

Si vous utilisez [ES module imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import), vous serez normalement enclin à placer vos déclarations d'importation en haut du fichier test. Mais souvent, vous devez demander à Jest d'utiliser une simulation avant que les modules ne l'utilisent. Pour cette raison, Jest hissera automatiquement les appels `jest.mock` en haut du module (avant toute importation). Pour en savoir plus sur ce système et le voir en action, consultez [ce repo](https://github.com/kentcdodds/how-jest-mocking-works).

## Les méthodes de simulations qui ne sont pas mises en œuvre dans JSDOM

Si certains codes utilisent une méthode que le JSDOM (l'implémentation DOM utilisée par Jest) n'a pas encore mise en œuvre, il n'est pas facile de la tester. C'est par exemple le cas avec `window.matchMedia()`. Jest retourne `TypeError : window.matchMedia n'est pas une fonction` et n'exécute pas correctement le test.

Dans ce cas, la simulation de `matchMedia` dans le fichier de test devrait résoudre le problème :

```js
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // déprécié
    removeListener: jest.fn(), // déprécié
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

Cela fonctionne si `window.matchMedia()` est utilisé dans une fonction (ou méthode) qui est invoquée dans le test. Si `window.matchMedia()` est exécuté directement dans le fichier testé, Jest signale la même erreur. Dans ce cas, la solution est de déplacer la simulation manuelle dans un fichier séparé et d'inclure celui-ci dans le test **before** le fichier testé :

```js
import './matchMedia.mock'; // Doit être importé avant le fichier testé
import {myMethod} from './file-to-test';

describe('myMethod()', () => {
  // Testez la méthode ici...
});
```
