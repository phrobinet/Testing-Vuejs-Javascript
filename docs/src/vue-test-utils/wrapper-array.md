# WrapperArray

Un `WrapperArray` est un objet qui contient un tableau de [`Wrappers`](../wrapper/), et des méthodes pour tester les `Wrappers`.

## Propriétés

### `wrappers`

`array` (lecture seulement): les `Wrappers` contenus dans le `WrapperArray`

### `length`

`number` (lecture seulement): le nombre de `Wrappers`constenus dans le `WrapperArry`

## Methods

### at

Retourne `Wrapper` à `index` passé. Utilise une numérotation basée sur les zéros (c'est-à-dire que le premier élément est à l'index 0).
Si `index` est négatif, l'indexation commence à partir du dernier élément (c'est-à-dire que le premier élément est à l'index -1).

- **Arguments:**

  - `{number} index`

- **Retours:** `{Wrapper}`

- **Exemple:**

```js
import { shallowMount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = shallowMount(Foo)
const divArray = wrapper.findAll('div')

const secondDiv = divArray.at(1)
expect(secondDiv.is('div')).toBe(true)

const lastDiv = divArray.at(-1)
expect(lastDiv.is('div')).toBe(true)
```

### contains

Affirmer que chaque emballage dans `WrapperArray` contient un sélecteur.

Utilisez tout [selector](../selectors.md) valide.

- **Arguments:**

  - `{string|Component} selector`

- **Retours:** `{boolean}`

- **Exemple:**

```js
import { shallowMount } from '@vue/test-utils'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const wrapper = shallowMount(Foo)
const divArray = wrapper.findAll('div')
expect(divArray.contains('p')).toBe(true)
expect(divArray.contains(Bar)).toBe(true)
```

### destroy

Détruit chaque Vue `Wrapper` dans `WrapperArray`.

- **Exemple:**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
const divArray = wrapper.findAll('div')
expect(divArray.contains('p')).toBe(true)
divArray.destroy()
expect(divArray.contains('p')).toBe(false)
```

### filter

Filtrez `WrapperArray` avec une fonction de prédicat sur les objets `Wrapper`.

Le comportement de cette méthode est similaire à celui de  [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

- **Arguments:**

  - `{function} predicate`

- **Retours:** `{WrapperArray}`

Une nouvelle instance `WrapperArray` contenant des instances de `Wrapper` qui retourne vrai pour la fonction prédicat.

- **Exemple:**

```js
import { shallowMount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = shallowMount(Foo)
const filteredDivArray = wrapper
  .findAll('div')
  .filter(w => !w.classes('filtered'))
```

### is

Affirmer que chaque `Wrapper` dans le noeud DOM `WrapperArray` ou `vm` correspond à [selector](../selectors.md).

- **Arguments:**

  - `{string|Component} selector`

- **Retours:** `{boolean}`

- **Exemple:**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
const divArray = wrapper.findAll('div')
expect(divArray.is('div')).toBe(true)
```

### isEmpty

::: Avertissement de déprédation
`isEmpty` est dépréciée et sera supprimée dans les prochaines versions.

Pensez à un appariement personnalisé comme ceux fournis dans  [jest-dom](https://github.com/testing-library/jest-dom#tobeempty).

En cas d'utilisation avec findComponent, accédez à l'élément DOM avec findComponent(Comp).element
:::

Affirmer que chaque `Wrapper` dans `WrapperArray` ne contient pas de nœud enfant.

- **Retours:** `{boolean}`

- **Exemple:**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
const divArray = wrapper.findAll('div')
expect(divArray.isEmpty()).toBe(true)
```

### isVisible

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

### isVueInstance

::: warning Avertissement de déprédation
`isVueInstance` est dépréciée et sera supprimée dans les prochaines versions.

Les tests reposant sur l'affirmation "isVueInstance" n'ont que peu ou pas de valeur. Nous suggérons de les remplacer par des assertions intentionnelles.

Pour conserver ces tests, un remplacement valable de `isVueInstance()` est une assertion véridique de `wrapper.find(...).vm`.
:::

Affirmer que chaque `Wrapper` dans `WrapperArray` est une instance de Vue.

- **Retours:** `{boolean}`

- **Exemple:**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const wrapper = mount(Foo)
const barArray = wrapper.findAll(Bar)
expect(barArray.isVueInstance()).toBe(true)
```

### setChecked

Cette méthode est un alias du code suivant

```js
wrapperArray.wrappers.forEach(wrapper => wrapper.setChecked(checked))
```

- **Arguments:**

  - `{Boolean} checked (default: true)`

- **Exemple:**

```js
import { mount } from '@vue/test-utils'

const wrapper = mount({
  data() {
    return {
      t1: false,
      t2: ''
    }
  },
  template: `
    <div>
      <input type="checkbox" name="t1" class="foo" v-model="t1" />
      <input type="radio" name="t2" class="foo" value="foo" v-model="t2"/>
      <input type="radio" name="t2" class="bar" value="bar" v-model="t2"/>
    </div>`
})

const wrapperArray = wrapper.findAll('.foo')
expect(wrapper.vm.t1).toEqual(false)
expect(wrapper.vm.t2).toEqual('')
wrapperArray.setChecked()
expect(wrapper.vm.t1).toEqual(true)
expect(wrapper.vm.t2).toEqual('foo')
```

### setData

Défini les données `Wrapper` `vm` sur chaque `Wrapper` dans `WrapperArray`.

**Note chaque `Wrapper` doit contenir une instance de Vue.**

- **Arguments:**

  - `{Object} data`

- **Exemple:**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const wrapper = mount(Foo)
const barArray = wrapper.findAll(Bar)
barArray.setData({ foo: 'bar' })
expect(barArray.at(0).vm.foo).toBe('bar')
```

### setMethods

::: warning Avertissement de déprédation
`setMethods` est dépréciée et sera supprimée dans les prochaines versions.

Il n'y a pas de voie claire pour remplacer les "setMethods", car cela dépend vraiment de votre utilisation précédente. Cela conduit facilement à des tests bancals qui s'appuient sur des détails de mise en œuvre, ce qui [est déconseillé](https://github.com/vuejs/rfcs/blob/668866fa71d70322f6a7689e88554ab27d349f9c/active-rfcs/0000-vtu-api.md#setmethods).

Nous suggérons de repenser ces tests.

Pour mettre au point une méthode complexe, il faut l'extraire du composant et le tester de manière isolée. Pour affirmer qu'une méthode est appelée, utilisez votre testeur pour l'espionner.
:::

Défini les `Wrapper` `vm` et force la mise à jour de chaque `Wrapper` dans `WrapperArray`.

**Note chaque `Wrapper` doit contenir une instance de Vue.**

- **Arguments:**

  - `{Object} methods`

- **Exemple:**

```js
import { mount } from '@vue/test-utils'
import sinon from 'sinon'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const wrapper = mount(Foo)
const barArray = wrapper.findAll(Bar)
const clickMethodStub = sinon.stub()

barArray.setMethods({ clickMethod: clickMethodStub })
barArray.at(0).trigger('click')
expect(clickMethodStub.called).toBe(true)
```

### setProps

Défini les props de `Wrapper` `vm` et force la mise à jour de chaque `Wrapper` dans `WrapperArray`.

**Note chaque `Wrapper` doit contenir une instance de Vue.**

- **Arguments:**

  - `{Object} props`

- **Exemple:**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const wrapper = mount(Foo)
const barArray = wrapper.findAll(Bar)
barArray.setProps({ foo: 'bar' })
expect(barArray.at(0).vm.foo).toBe('bar')
```

### setValue

Cette méthode est un alias du code qui suivant.

```js
wrapperArray.wrappers.forEach(wrapper => wrapper.setValue(value))
```

- **Arguments:**

  - `{any} value`

- **Exemple:**

```js
import { mount } from '@vue/test-utils'

const wrapper = mount({
  data() {
    return {
      t1: '',
      t2: ''
    }
  },
  template: `
    <div>
      <input type="text" name="t1" class="foo" v-model="t1" />
      <input type="text" name="t2" class="foo" v-model="t2"/>
    </div>`
})

const wrapperArray = wrapper.findAll('.foo')
expect(wrapper.vm.t1).toEqual('')
expect(wrapper.vm.t2).toEqual('')
wrapperArray.setValue('foo')
expect(wrapper.vm.t1).toEqual('foo')
expect(wrapper.vm.t2).toEqual('foo')
```

### trigger

Déclenche un [event](../../guides/dom-events.md#trigger-events) sur chaque `Wrapper` dans le nœud DOM `WrapperArray`.

**Note chaque `Wrapper` doit contenir une instance de Vue.**

- **Arguments:**

  - `{string} eventType` **required**
  - `{Object} options` **optional**

- **Exemple:**

```js
import { mount } from '@vue/test-utils'
import sinon from 'sinon'
import Foo from './Foo.vue'

const clickHandler = sinon.stub()
const wrapper = mount(Foo, {
  propsData: { clickHandler }
})

const divArray = wrapper.findAll('div')
divArray.trigger('click')
expect(clickHandler.called).toBe(true)
```
