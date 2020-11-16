## isVisible

::: warning Avertissement de déprédation
`isVisible` est déprécié et sera supprimé dans les prochaines versions.

Considérez un jumelage personnalisé tel que ceux fournis dans [jest-dom](https://github.com/testing-library/jest-dom#tobevisible).

En cas d'utilisation avec findComponent, accédez à l'élément DOM avec `findComponent(Comp).element`
:::

Affirmer que `Wrapper` est visible.

Retourne `false` si un vieil élément a le style `display: none` ou `visibility: hidden`.

Ceci peut être utilisé pour affirmer qu'un élément est caché par `v-show`.

- **Retours:** `{boolean}`

- **Exemple:**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
expect(wrapper.isVisible()).toBe(true)
expect(wrapper.find('.is-not-visible').isVisible()).toBe(false)
```
