## findAll

::: warning Avertissement de déprédation
L'utilisation de findAll pour rechercher des composants est obsolète et sera supprimée. Utilisez plutôt findAllComponents.
:::

Retourne un [`WrapperArray`](../wrapper-array/).

Utilisez n'importe quel [sélecteur](../selectors.md) valide.

- **Arguments:**

  - `{string|Component} selector`

- **Retours:** `{WrapperArray}`

- **Exemple:**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const wrapper = mount(Foo)

const div = wrapper.findAll('div').at(0)
expect(div.is('div')).toBe(true)

const bar = wrapper.findAll(Bar).at(0) // Deprecated usage
expect(bar.is(Bar)).toBe(true)
```
