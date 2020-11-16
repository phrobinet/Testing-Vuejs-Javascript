### contains

::: warning Avertissement de déprédation
L'utilisation de "Contains" est déconseillée et sera supprimée dans les prochaines versions. Utilisez find pour les nœuds DOM (en utilisant la syntaxe querySelector), findComponent pour les composants, ou wrapper.get à la place.
:::

Affirmer que le Wrapper contient un élément ou un composant correspondant [selector](../selectors.md).

- **Arguments:**

  - `{string|Component} selector`

- **Retours:** `{boolean}`

- **Exemple:**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const wrapper = mount(Foo)
expect(wrapper.contains('p')).toBe(true)
expect(wrapper.contains(Bar)).toBe(true)
```

- **Voir aussi :** [selectors](../selectors.md)
