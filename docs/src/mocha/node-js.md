# NODE.JS NATIVE ESM SUPPORT

>Nouveau dans v7.1.0

Mocha vous permet de passer vos tests sous forme de modules ES, et pas seulement en utilisant CommonJS. Par exemple :
``` js
// test.mjs
import {add} from './add.mjs';
import assert from 'assert';

it('should add to numbers from an es module', () => {
  assert.equal(add(3, 5), 8);
});
```
Pour cela, vous n'avez pas besoin de faire quoi que ce soit de spécial. Rédigez votre dossier de test en tant que module ES. Dans Node.js, cela signifie soit terminer le fichier avec une extension `.mjs`, soit, si vous voulez utiliser l'extension `.js` normale, en ajoutant `"type" : "module"` à votre `package.json`. Vous trouverez plus d'informations dans la documentation de Node.js.

>Mocha supporte les modules ES uniquement à partir de Node.js v12.11.0 et plus. Pour l'activer dans les versions inférieures à 13.2.0, vous devez ajouter des `--experimental-modules` lors de l'exécution de Mocha. À partir de la version 13.2.0 de Node.js, vous pouvez utiliser les modules ES sans aucun drapeau. (Mocha chargera ESM même dans Node v10, mais ce n'est pas officiellement pris en charge. A utiliser à vos propres risques).

## LIMITATIONS ACTUELLES

Le support ESM natif de Node.JS a toujours un statut :  **Stability: 1 - Experimental**

[Watch mode](https://mochajs.org/#-watch-w) ne prend pas en charge les fichiers de test du module ES
[Custom reporters](https://mochajs.org/#third-party-reporters) et [custom interfaces](https://mochajs.org/#interfaces) ne peuvent être que des fichiers CommonJS
[Configuration file](https://mochajs.org/#configuring-mocha-nodejs) ne peut être qu'un fichier CommonJS (`.mocharc.js` ou .`mocharc.cjs`)
Lorsque vous utilisez des modules fantaisie via des librairies comme `proxyquire`, `rewiremock` ou `rewire`, n'utilisez pas les modules ES pour vos fichiers de test
Le support ESM natif de Node.JS ne fonctionne pas avec le module esm

