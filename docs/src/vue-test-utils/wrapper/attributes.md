## attributes

Renvoie l'objet attribut de nœud DOM "Wrapper". Si la "clé" est fournie, la valeur de la "clé" sera renvoyée.

- **Arguments:**

  - `{string} key` **facultatif**

- **Retours:** `{[attribute: string]: any} | string`

- **Example:**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
expect(wrapper.attributes().id).toBe('foo')
expect(wrapper.attributes('id')).toBe('foo')
```
