## createLocalVue()

- **Retours:**

  - `{Component}`

- **Usage:**

`createLocalVue` renvoie une classe Vue pour que vous puissiez ajouter des composants, des mixins et installer des plugins dans polluer la classe Vue globale.

Utilisez-la avec `options.localVue`:

```js
import { createLocalVue, shallowMount } from '@vue/test-utils'
import MyPlugin from 'my-plugin'
import Foo from './Foo.vue'

const localVue = createLocalVue()
localVue.use(MyPlugin)
const wrapper = shallowMount(Foo, {
  localVue,
  mocks: { foo: true }
})
expect(wrapper.vm.foo).toBe(true)

const freshWrapper = shallowMount(Foo)
expect(freshWrapper.vm.foo).toBe(false)
```

- **Voir aussi:** [Common Tips](../guides/common-tips.md#applying-global-plugins-and-mixins)
