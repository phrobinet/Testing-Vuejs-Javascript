---
id: puppeteer
title: L'utilisation de Pupeteer
---

# L'utilisation de Pupeteer

Avec les API [Global Setup/Teardown](Configuration.md#globalsetup-string) et [Async Test Environment](Configuration.md#testenvironment-string), Jest peut fonctionner sans problème avec [MongoDB](https://www.mongodb.com/).

> La génération de la couverture de code pour les fichiers de test utilisant Puppeteer n'est actuellement pas possible si votre test utilise `page.$eval`, `page.$$eval` ou `page.evaluate` car la fonction passée est exécutée en dehors du champ d'application de Jest. Consultez le [numéro 7962](https://github.com/facebook/jest/issues/7962#issuecomment-495272339) sur GitHub pour une solution de contournement.

## utiliser le préréglage de jest-puppeteer

[Jest Puppeteer](https://github.com/smooth-code/jest-puppeteer) fournit toute la configuration requise pour effectuer vos tests en utilisant Puppeteer.

1.  Tout d'abord, installer `jest-puppeteer`

```
yarn add --dev jest-puppeteer
```

2.  Précisez le préréglage dans votre configuration Jest :

```json
{
  "preset": "jest-puppeteer"
}
```

3.  Ecrire le test

```js
describe('Google', () => {
  beforeAll(async () => {
    await page.goto('https://google.com');
  });

  it('should be titled "Google"', async () => {
    await expect(page.title()).resolves.toMatch('Google');
  });
});
```

Il n'est pas nécessaire de charger des dépendances. Les classes "page" et "navigateur" de Puppeteer seront automatiquement exposées

Voir la [documentation](https://github.com/smooth-code/jest-puppeteer).

## Exemple personnalisé sans préréglage de jest-puppeteer

You can also hook up puppeteer from scratch. The basic idea is to:

1.  launch & file the websocket endpoint of puppeteer with Global Setup
2.  connect to puppeteer from each Test Environment
3.  close puppeteer with Global Teardown

Here's an example of the GlobalSetup script

Vous pouvez également vous procurer un puppeteer en partant de zéro. L'idée de base est de :

1. lancer et classer l'extrémité du websocket de puppeteer avec Global Setup
2. se connecter à puppeteer de chaque environnement de test
3. Le puppeteer de proximité avec Global Teardown

Voici un exemple de script de GlobalSetup

```js
// setup.js
const puppeteer = require('puppeteer');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const os = require('os');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function () {
  const browser = await puppeteer.launch();
  // stocker l'instance du navigateur pour pouvoir la démonter plus tard
  // ce global n'est disponible que dans le démontage mais pas dans TestEnvironments
  global.__BROWSER_GLOBAL__ = browser;

  // utiliser le système de fichiers pour exposer le wsEndpoint pour les TestEnvironments
  mkdirp.sync(DIR);
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};
```

Nous avons ensuite besoin d'un environnement de test personnalisé pour les marionnettistes

```js
// puppeteer_environment.js
const NodeEnvironment = require('jest-environment-node');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const os = require('os');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    // obtenir le wsEndpoint
    const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8');
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }

    // se connecter à puppeteer
    this.global.__BROWSER__ = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    });
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = PuppeteerEnvironment;
```

Enfin, nous pouvons fermer l'instance puppeteer et nettoyer le dossier

```js
// teardown.js
const os = require('os');
const rimraf = require('rimraf');
const path = require('path');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
module.exports = async function () {
  // fermer l'insstance du navigateur
  await global.__BROWSER_GLOBAL__.close();

  // nettoyer le fichier wsEndpoint
  rimraf.sync(DIR);
};
```

Avec tout ce qui a été mis en place, nous pouvons maintenant passer nos tests de cette manière :

```js
// test.js
const timeout = 5000;

describe(
  '/ (Home Page)',
  () => {
    let page;
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto('https://google.com');
    }, timeout);

    it('should load without error', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain('google');
    });
  },
  timeout,
);
```

Enfin, configurez `jest.config.js` pour lire ces fichiers. (Le preset `jest-puppeteer` fait quelque chose comme ça sous le capot).

```js
module.exports = {
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testEnvironment: './puppeteer_environment.js',
};
```

Voici le code de [exemple de travail complet] (https://github.com/xfumihiro/jest-puppeteer-example).
