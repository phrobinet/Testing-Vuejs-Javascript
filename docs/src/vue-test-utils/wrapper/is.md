## is

::: warning Avertissement de dépréciation
L'utilisation de `is` pour affirmer que le nœud DOM ou le sélecteur de correspondance `vm` est déprécié et sera supprimé.
Considérez un appariement personnalisé tel que ceux fournis dans [jest-dom](https://github.com/testing-library/jest-dom#custom-matchers).
ou pour l'assertion de type d'élément DOM, utilisez native [`Element.tagName`](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName) à la place.

Pour conserver ces tests, un remplacement valable pour :

- `is('DOM_SELECTOR')` est une affirmation de `wrapper.element.tagName`.
- `is('ATTR_NAME')` est une affirmation véridique d `wrapper.attributes('ATTR_NAME')`.
- `is('CLASS_NAME')` est une affirmation véridique d `wrapper.classes('CLASS_NAME')`.

En cas d'utilisation avec findComponent, accédez à l'élément DOM avec `findComponent(Comp).element`
:::

Assert `Wrapper` DOM node or `vm` matches [selector](../selectors.md).
Affirmer le nœud DOM `Wrapper` ou les correspondances `vm` [selector] (https://vue-test-utils.vuejs.org/api/selectors.html).

- **Arguments:**

  - `{string|Component} selector`

- **Retours:** `{boolean}`

- **Exemple:**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
expect(wrapper.is('div')).toBe(true)
```
