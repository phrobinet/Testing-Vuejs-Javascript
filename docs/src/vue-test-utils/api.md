# API

## mount()

- **Arguments:**

  - `{Component} component`
  - `{Object} options`

- **Retours:** `{Wrapper}`

- **Options:**

Voir [options](options.md)

- **Usage:**

Crée un [`Wrapper`](wrapper/) qui contient le composant Vue monté et rendu.

**Sans les options:**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', () => {
    const wrapper = mount(Foo)
    expect(wrapper.contains('div')).toBe(true)
  })
})
```

**Avec les options Vue:**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', () => {
    const wrapper = mount(Foo, {
      propsData: {
        color: 'red'
      }
    })
    expect(wrapper.props().color).toBe('red')
  })
})
```

**Attacher au DOM:**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const wrapper = mount(Foo, {
      attachTo: div
    })
    expect(wrapper.contains('div')).toBe(true)
    wrapper.destroy()
  })
})
```

**Les slots par défauts et nommés :**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'
import Bar from './Bar.vue'
import FooBar from './FooBar.vue'

describe('Foo', () => {
  it('renders a div', () => {
    const wrapper = mount(Foo, {
      slots: {
        default: [Bar, FooBar],
        fooBar: FooBar, // Will match `<slot name="FooBar" />`.
        foo: '<div />'
      }
    })
    expect(wrapper.contains('div')).toBe(true)
  })
})
```

**Les propriétés globales des Stubbing :**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', () => {
    const $route = { path: 'http://www.example-path.com' }
    const wrapper = mount(Foo, {
      mocks: {
        $route
      }
    })
    expect(wrapper.vm.$route.path).toBe($route.path)
  })
})
```

**Les composants Stubbing**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'
import Bar from './Bar.vue'
import Faz from './Faz.vue'

describe('Foo', () => {
  it('renders a div', () => {
    const wrapper = mount(Foo, {
      stubs: {
        BarFoo: true,
        FooBar: Faz,
        Bar: { template: '<div class="stubbed" />' }
      }
    })
    expect(wrapper.contains('.stubbed')).toBe(true)
    expect(wrapper.contains(Bar)).toBe(true)
  })
})
```

**Avis de déprédation :**

Lors du stubbing de composants, la fourniture d'une chaîne de caractères (`ComponentToStub : '<div class="stubbed" />`) n'est plus supportée.

- **Voir aussi :** [Wrapper](wrapper/)

## shallowMount()

- **Arguments:**

  - `{Component} component`
  - `{Object} options`
    - `{HTMLElement|string} string`
    - `{boolean} attachToDocument`
    - `{Object} context`
      - `{Array<Component|Object>|Component} children`
    - `{Object} slots`
      - `{Array<Component|Object>|Component|String} default`
      - `{Array<Component|Object>|Component|String} named`
    - `{Object} mocks`
    - `{Object|Array<string>} stubs`
    - `{Vue} localVue`

- **Retours:** `{Wrapper}`

- **Options:**

Voir les [options](./options.md)

- **Usage:**

Comme [`mount`](mount.md), il crée un [`Wrapper`](wrapper/) qui contient le composant Vue monté et rendu, mais avec des composants enfants écrasés.

**Sans les options :**

```js
import { shallowMount } from '@vue/test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', () => {
    const wrapper = shallowMount(Foo)
    expect(wrapper.contains('div')).toBe(true)
  })
})
```

**Avec les options de Vue :**

```js
import { shallowMount } from '@vue/test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', () => {
    const wrapper = shallowMount(Foo, {
      propsData: {
        color: 'red'
      }
    })
    expect(wrapper.props().color).toBe('red')
  })
})
```

**Rattacher au DOM :**

```js
import { shallowMount } from '@vue/test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const wrapper = shallowMount(Foo, {
      attachTo: div
    })
    expect(wrapper.contains('div')).toBe(true)
    wrapper.destroy()
  })
})
```

**Slots par défaut et nommés :**

```js
import { shallowMount } from '@vue/test-utils'
import Foo from './Foo.vue'
import Bar from './Bar.vue'
import FooBar from './FooBar.vue'

describe('Foo', () => {
  it('renders a div', () => {
    const wrapper = shallowMount(Foo, {
      slots: {
        default: [Bar, FooBar],
        fooBar: FooBar, // Will match <slot name="FooBar" />,
        foo: '<div />'
      }
    })
    expect(wrapper.contains('div')).toBe(true)
  })
})
```

**Les propriétés globales des Stubbing :**

```js
import { shallowMount } from '@vue/test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', () => {
    const $route = { path: 'http://www.example-path.com' }
    const wrapper = shallowMount(Foo, {
      mocks: {
        $route
      }
    })
    expect(wrapper.vm.$route.path).toBe($route.path)
  })
})
```

## render()

- **Arguments:**

  - `{Component} component`
  - `{Object} options`
    - `{Object} context`
      - `{Array<Component|Object>|Component} children`
    - `{Object} slots`
      - `{Array<Component|Object>|Component|String} default`
      - `{Array<Component|Object>|Component|String} named`
    - `{Object} mocks`
    - `{Object|Array<string>} stubs`
    - `{Vue} localVue`

- **Retours:** `{Promise<CheerioWrapper>}`

- **Options:**

Voir les [options](./options.md)

- **Usage:**

Rend un objet en chaîne de caractères et retourne un [cheerio wrapper](https://github.com/cheeriojs/cheerio).

Cheerio est une bibliothèque de type jQuery pour parcourir le DOM dans Node.js. Elle possède une API similaire à celles de [`Wrapper`](wrapper/) Vue Test Utils .

`render` utilise [`vue-server-renderer`](https://ssr.vuejs.org/en/basic.html) sous le capot, pour rendre un composant en HTML statique.

`render` est inclus dans le paquet `@vue/server-test-utils`.

**Sans les options :**

```js
import { render } from '@vue/server-test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', async () => {
    const wrapper = await render(Foo)
    expect(wrapper.text()).toContain('<div></div>')
  })
})
```

**Avec les options de Vue :**

```js
import { render } from '@vue/server-test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', async () => {
    const wrapper = await render(Foo, {
      propsData: {
        color: 'red'
      }
    })
    expect(wrapper.text()).toContain('red')
  })
})
```

**Les slots par défaut et nommés :**

```js
import { render } from '@vue/server-test-utils'
import Foo from './Foo.vue'
import Bar from './Bar.vue'
import FooBar from './FooBar.vue'

describe('Foo', () => {
  it('renders a div', async () => {
    const wrapper = await render(Foo, {
      slots: {
        default: [Bar, FooBar],
        fooBar: FooBar, // Will match <slot name="FooBar" />,
        foo: '<div />'
      }
    })
    expect(wrapper.text()).toContain('<div></div>')
  })
})
```

**Les propriétés globales des Stubbing :**

```js
import { render } from '@vue/server-test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', async () => {
    const $route = { path: 'http://www.example-path.com' }
    const wrapper = await render(Foo, {
      mocks: {
        $route
      }
    })
    expect(wrapper.text()).toContain($route.path)
  })
})
```

## renderToString()

- **Arguments:**

  - `{Component} component`
  - `{Object} options`
    - `{Object} context`
      - `{Array<Component|Object>|Component} children`
    - `{Object} slots`
      - `{Array<Component|Object>|Component|String} default`
      - `{Array<Component|Object>|Component|String} named`
    - `{Object} mocks`
    - `{Object|Array<string>} stubs`
    - `{Vue} localVue`

- **Retours:** `{Promise<string>}`

- **Options:**

See [options](./options.md)

- **Usage:**

Rends un composant en HTML.

`renderToString` utilise [`vue-server-renderer`](https://ssr.vuejs.org/en/basic.html) sous le capot, pour rendre un composant en HTML statique.

`renderToString` est inclus dans le paquet `@vue/server-test-utils`.

**Sans les options :**

```js
import { renderToString } from '@vue/server-test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', async () => {
    const str = await renderToString(Foo)
    expect(str).toContain('<div></div>')
  })
})
```

**Avec les options de Vue :**

```js
import { renderToString } from '@vue/server-test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', async () => {
    const str = await renderToString(Foo, {
      propsData: {
        color: 'red'
      }
    })
    expect(str).toContain('red')
  })
})
```

**Les slots par défaut et nommés :**

```js
import { renderToString } from '@vue/server-test-utils'
import Foo from './Foo.vue'
import Bar from './Bar.vue'
import FooBar from './FooBar.vue'

describe('Foo', () => {
  it('renders a div', async () => {
    const str = await renderToString(Foo, {
      slots: {
        default: [Bar, FooBar],
        fooBar: FooBar, // Will match <slot name="FooBar" />,
        foo: '<div />'
      }
    })
    expect(str).toContain('<div></div>')
  })
})
```

**Les propriétés globales des Stubbing :**

```js
import { renderToString } from '@vue/server-test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', async () => {
    const $route = { path: 'http://www.example-path.com' }
    const str = await renderToString(Foo, {
      mocks: {
        $route
      }
    })
    expect(str).toContain($route.path)
  })
})
```

## Les Sélecteurs

Beaucoup de méthodes prennent un sélecteur comme argument. Un sélecteur peut être soit un sélecteur CSS, un composant Vue ou un objet d'option de recherche.

### Les sélecteurs CSS

Mount gère tous les sélecteurs CSS valide :

- sélecteur de balise (`div`, `foo`, `bar`)
- sélecteur de classe(`.foo`, `.bar`)
- sélecteur d'attribut(`[foo]`, `[foo="bar"]`)
- sélecteur d'ID (`#foo`, `#bar`)
- sélecteur de pseudo-classe (`div:first-of-type`)

Vous pouvez également utiliser des combinateurs:

- combinateurs de descendance direct (`div > #bar > .foo`)
- combinateurs de descendance général (`div #bar .foo`)
- sélecteur de frére adjacent (`div + .foo`)
- sélecteur de frère général (`div ~ .foo`)

### Les composants Vue

Les composants de Vue sont également des sélecteurs valables.

```js
// Foo.vue

export default {
  name: 'FooComponent'
}
```

```js
import { shallowMount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = shallowMount(Foo)
expect(wrapper.is(Foo)).toBe(true)
```

### L'option objet `find`

#### Name

En utilisant un objet d'option de recherche, Vue Test Utils permet de sélectionner des éléments par un `name` de composant sur les composants wrapper.


```js
const buttonWrapper = wrapper.find({ name: 'my-button' })
buttonWrapper.trigger('click')
```

#### Ref

En utilisant un objet d'option de recherche, Vue Test Utils permet de sélectionner des éléments par  `$ref` sur les composants wrapper

```js
const buttonWrapper = wrapper.find({ ref: 'myButton' })
buttonWrapper.trigger('click')
```

## createLocalVue()

- **Retours :**

  - `{Component}`

- **Usage :**

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

- **Voir aussi :** [Common Tips](../guides/common-tips.md#applying-global-plugins-and-mixins)

## createWrapper(node [, options])

- **Arguments :**

  - `{vm|HTMLElement} node`
  - `{Object} options`
    - `{Boolean} attachedToDocument`

- **Retours :**

  - `{Wrapper}`

- **Usage :**

`createWrapper` crée un `Wrapper` pour une instance Vue montée, ou un élément HTML.

```js
import { createWrapper } from '@vue/test-utils'
import Foo from './Foo.vue'

const Constructor = Vue.extend(Foo)
const vm = new Constructor().$mount()
const wrapper = createWrapper(vm)
expect(wrapper.vm.foo).toBe(true)
```

## Config

Vue Test Utils comprend un objet de configuration des options définies utilisées par Vue Test Utils.

### Vue Test Utils Config Options

### `showDeprecationWarnings`

- type: `Boolean`
- default: `true`

Contrôler s'il faut ou non afficher des avertissements de dépréciation . Lorsqu'il est sur `true`, tous les avertissements de déprédation sont visibles dans la console.

Exemple:

```js
import { config } from '@vue/test-utils'

config.showDeprecationWarnings = false
```

### `stubs`

- type: `{ [name: string]: Component | boolean | string }`
- default: `{}`

Le stub stocké dans `config.stubs` est utilisé par défaut.
Les stubs sont à utiliser dans les composants. Ils sont écrasés par les `stubs` passés dans les options de montage.

Lorsque l'on passe des `stubs` sous forme de tableau dans les options de montage, les `config.stubs` sont convertis en un tableau, et vont stuber les composants avec un composant de base qui retourne `<${component name}-stub>`.

Exemple:

```js
import { config } from '@vue/test-utils'

config.stubs['my-component'] = '<div />'
```

### `mocks`

- type: `Object`
- default: `{}`

Comme pour les `stubs`, les valeurs passées à `config.mocks` sont utilisées par défaut. Toute valeur passées à l'objet d'options de montage `mocks` aura la priorité sur celles déclarées dans `config.mocks`.

Exemple:

```js
import { config } from '@vue/test-utils'

config.mocks['$store'] = {
  state: {
    id: 1
  }
}
```

### `methods`

- type: `{ [name: string]: Function }`
- default: `{}`


Vous pouvez configurer les méthodes par défaut en utilisant l'objet `config`. Cela peut être utile pour les plugins qui injectent des méthodes aux composants, comme [VeeValidate](https://logaretm.github.io/vee-validate/). Vous pouvez surcharger les méthodes définies dans `config` en passant des `méthodes` dans les options de montage.

Exemple:

```js
import { config } from '@vue/test-utils'

config.methods['getData'] = () => {}
```

### `provide`

- type: `Object`
- default: `{}`

Like `stubs` or `mocks`, the values passed to `config.provide` are used by default. Any values passed to the mounting options `provide` object will take priority over the ones declared in `config.provide`. **Please take note that it is not supported to pass a function as `config.provide`.**
Comme les `stubs` ou `mocks`, les valeurs passées à "config.provide" sont utilisées par défaut. Toutes les valeurs passées à l'objet d'options de montage `provide` auront la priorité sur celles déclarées dans `config.provide`. **Veuillez noter qu'il n'est pas possible de passer une fonction comme `config.provide`.**

Exemple:

```js
import { config } from '@vue/test-utils'

config.provide['$logger'] = {
  log: (...args) => {
    console.log(...args)
  }
}
```

### `silent`

- type: `Boolean`
- default: `true`

Il supprime les avertissements déclenchés par Vue tout en mettant en veille les éléments observables (par exemple les props). Lorsqu'il est réglé sur `false`, tous les avertissements sont visibles dans la console. C'est une méthode configurable qui repose sur le paramètre `Vue.config.silent`.

Exemple:

```js
import { config } from '@vue/test-utils'

config.silent = false
```

## enableAutoDestroy(hook)

- **Arguments :**

  - `{Function} hook`

- **Usage:**

`enableAutoDestroy` détruira toutes les instances de `Wrapper` en utilisant la fonction de hook passée (par exemple [`afterEach`](https://jestjs.io/docs/en/api#aftereachfn-timeout)). Après avoir appelé la méthode, vous pouvez revenir au comportement par défaut en appelant la méthode `resetAutoDestroyState`.

```js
import { enableAutoDestroy, mount } from '@vue/test-utils'
import Foo from './Foo.vue'

// appelle wrapper.destroy() après chaque test
enableAutoDestroy(afterEach)

describe('Foo', () => {
  it('renders a div', () => {
    const wrapper = mount(Foo)
    expect(wrapper.contains('div')).toBe(true)
    // pas besoin d'appeler wrapper.destroy() ici
  })
})
```
