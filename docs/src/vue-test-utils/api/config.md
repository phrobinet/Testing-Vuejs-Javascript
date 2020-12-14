## Config

Vue Test Utils comprend un objet de configuration des options définies utilisées par Vue Test Utils.

### Vue Test Utils Config Options

### `showDeprecationWarnings`

- type: `Boolean`
- default: `true`

Contrôler s'il faut ou non afficher des avertissements de dépréciation. Lorsqu'il est sur `true`, tous les avertissements de déprédation sont visibles dans la console.

Exemple:

```js
import { config } from '@vue/test-utils'

config.showDeprecationWarnings = false
```

### `stubs`

- type: `{ [name: string]: Component | boolean | string }`
- default: `{}`

Le stub stocké dans `config.stubs` est utilisé par défaut.
Les stubs sont à utiliser dans les composants. Ils sont écrasés par les `stubs` passés dans les options de montage.

Lorsque l'on passe des `stubs` sous forme de tableau dans les options de montage, les `config.stubs` sont convertis en un tableau, et vont stuber les composants avec un composant de base qui retourne `<${component name}-stub>`.

Exemple:

```js
import { config } from '@vue/test-utils'

config.stubs['my-component'] = '<div />'
```

### `mocks`

- type: `Object`
- default: `{}`

Comme pour les `stubs`, les valeurs passées à `config.mocks` sont utilisées par défaut. Toute valeur passées à l'objet d'options de montage `mocks` aura la priorité sur celles déclarées dans `config.mocks`.

Exemple:

```js
import { config } from '@vue/test-utils'

config.mocks['$store'] = {
  state: {
    id: 1
  }
}
```

### `methods`

- type: `{ [name: string]: Function }`
- default: `{}`


Vous pouvez configurer les méthodes par défaut en utilisant l'objet `config`. Cela peut être utile pour les plugins qui injectent des méthodes aux composants, comme [VeeValidate](https://logaretm.github.io/vee-validate/). Vous pouvez surcharger les méthodes définies dans `config` en passant des `méthodes` dans les options de montage.

Exemple:

```js
import { config } from '@vue/test-utils'

config.methods['getData'] = () => {}
```

### `provide`

- type: `Object`
- default: `{}`

Like `stubs` or `mocks`, the values passed to `config.provide` are used by default. Any values passed to the mounting options `provide` object will take priority over the ones declared in `config.provide`. **Please take note that it is not supported to pass a function as `config.provide`.**
Comme les `stubs` ou `mocks`, les valeurs passées à "config.provide" sont utilisées par défaut. Toutes les valeurs passées à l'objet d'options de montage `provide` auront la priorité sur celles déclarées dans `config.provide`. **Veuillez noter qu'il n'est pas possible de passer une fonction comme `config.provide`.**

Exemple:

```js
import { config } from '@vue/test-utils'

config.provide['$logger'] = {
  log: (...args) => {
    console.log(...args)
  }
}
```

### `silent`

- type: `Boolean`
- default: `true`

Il supprime les avertissements déclenchés par Vue tout en mettant en veille les éléments observables (par exemple les props). Lorsqu'il est réglé sur `false`, tous les avertissements sont visibles dans la console. C'est une méthode configurable qui repose sur le paramètre `Vue.config.silent`.

Exemple:

```js
import { config } from '@vue/test-utils'

config.silent = false
```
