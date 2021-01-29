## isVueInstance

::: warning Avertissement de dépréciation
`isVueInstance` est dépréciée et sera supprimée dans les prochaines versions.

Les tests reposant sur l'affirmation `isVueInstance` n'ont que peu ou pas de valeur. Nous suggérons de les remplacer par des affirmations ciblées.

Pour conserver ces tests, un remplacement valable de `isVueInstance()` est une affirmation véridique de `wrapper.find(...).vm`.

L'affirmation Wrapper est l'instance de Vue.
:::


- **Retours:** `{boolean}`

- **Exemple:**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
expect(wrapper.isVueInstance()).toBe(true)
```
