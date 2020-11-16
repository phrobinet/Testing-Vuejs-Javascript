## isVisible

Affirme que chaque `Wrapper` de `WrapperArray` est visible.

Retourne `false` si au moins un élément parent a le style `display: non` ou `visibility hidden`.

Ceci peut être utilisé pour affirmer qu'un élément est caché par `v-show`.

- **Retours:** `{boolean}`

- **Exemple:**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
expect(wrapper.isVisible()).toBe(true)
expect(wrapper.findAll('.is-not-visible').isVisible()).toBe(false)
expect(wrapper.findAll('.is-visible').isVisible()).toBe(true)
```
