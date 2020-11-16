## get


Fonctionne exactement comme [find](./find.md), mais lance une erreur si aucun élément correspondant
au sélecteur donné n'est trouvé. Vous devez utiliser find lorsque vous recherchez
un élément qui peut ne pas exister. Vous devez utiliser cette méthode lorsque vous obtenez un élément
qui devrait exister et elle fournira un beau message d'erreur si ce n'est pas le cas.

```js
import { mount } from '@vue/test-utils'

const wrapper = mount(Foo)

// Similaire à `wrapper.find`.
// `get` will throw an error if an element is not found. `find` will do nothing.
expect(wrapper.get('.does-exist'))

expect(() => wrapper.get('.does-not-exist'))
  .to.throw()
  .with.property(
    'message',
    'Unable to find .does-not-exist within: <div>the actual DOM here...</div>'
  )
```