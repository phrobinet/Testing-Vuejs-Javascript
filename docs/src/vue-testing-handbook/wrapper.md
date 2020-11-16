
# Wrapper


Vue Test Utils est une API basée sur un wrapper.

Un `Wrapper` est un objet qui contient un composant ou un vnode monté et des méthodes pour tester le composant ou le vnode.

[En savoir plus sur l'objet Wrapper dans une leçon vidéo GRATUITE de l'école Vue](https://vueschool.io/lessons/the-wrapper-object?friend=vuejs "En savoir plus sur l'objet Wrapper dans une leçon vidéo GRATUITE de l'école Vue")

## Properties

### `vm`

Composante (en lecture seule) : Il s'agit de l'instance Vue. Vous pouvez accéder à toutes les [méthodes et propriétés de l'instance d'un vm](https://vuejs.org/v2/api/#Instance-Properties) avec wrapper.vm.  Ceci n'existe que pour le wrapper du composant Vue ou le wrapper du composant Vue liant les HTMLElement .

###  `element`
HTMLElement (lecture seule) : le nœud DOM racine de l'enveloppe

###  `options`

#### `options.attachedToDocument`

`Boolean` (read-only): `true` if component is [attached to document](https://vue-test-utils.vuejs.org/api/options.html) when rendered.
Booléen (lecture seule) : vrai si le composant est [joint au document](https://vue-test-utils.vuejs.org/api/options.html) lors de son rendu.

### `selector`

Sélecteur : le sélecteur qui a été utilisé par [`find()`](https://vue-test-utils.vuejs.org/api/wrapper/find.html) ou [`findAll()`](https://vue-test-utils.vuejs.org/api/wrapper/findAll.html) pour créer cette enveloppe

## Methods

## attributes

Renvoie l'objet attribut de nœud DOM "Wrapper". Si la "clé" est fournie, la valeur de la "clé" sera renvoyée.

-   **Arguments:**

    -   `{string} key` **facultatif**
-   **Retours:** `{[attribute: string]: any} | string`

-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
expect(wrapper.attributes().id).toBe('foo')
expect(wrapper.attributes('id')).toBe('foo')

```

## classes
Retourne les classes de nœuds DOM "Wrapper".

Retourne un tableau de noms de classes ou un booléen si un nom de classe est fourni.

- **Arguments:**

    -   `{string} className` **facultatif**
-   **Retours:** `Array<{string}> | boolean`

-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
expect(wrapper.classes()).toContain('bar')
expect(wrapper.classes('bar')).toBe(true)

```

## contains

::: danger
*L'utilisation de "Contains" est déconseillée et sera supprimée dans les prochaines versions. Utilisez [`find`](https://vue-test-utils.vuejs.org/api/wrapper/find.html) pour les nœuds DOM (en utilisant la syntaxe `querySelector`), [`findComponent`](https://vue-test-utils.vuejs.org/api/wrapper/findComponent.html) pour les composants, ou [`wrapper.get`](https://vue-test-utils.vuejs.org/api/wrapper/get.html) à la place.*
:::
Assert `Wrapper` contains an element or component matching [selector](https://vue-test-utils.vuejs.org/api/selectors.html).
Affirmer que l'`Wrapper` contient un élément ou un composant correspondant [sélecteur](https://vue-test-utils.vuejs.org/api/selectors.html).

-   **Arguments:**

    -   `{string|Component} selector`
-   **Retours:** `{boolean}`

-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const wrapper = mount(Foo)
expect(wrapper.contains('p')).toBe(true)
expect(wrapper.contains(Bar)).toBe(true)

```

-   **Voir aussi:** [sélectionneurs](https://vue-test-utils.vuejs.org/api/selectors.html)

## destroy

Détruit une instance du composant Vue.

-   **Exemple:**

```
import { mount } from '@vue/test-utils'
import sinon from 'sinon'

const spy = sinon.stub()
mount({
  render: null,
  destroyed() {
    spy()
  }
}).destroy()
expect(spy.calledOnce).toBe(true)

```

si l'option `attachTo`ou `AttachToDocument` a provoqué le montage du composant sur le document, les éléments du DOM du composant seront également supprimés du document.

Pour les composants fonctionnels, `destroy` ne supprime du document que les éléments DOM rendus.
## emitted

Renvoie un objet contenant des événements personnalisés émis par le `Wrapper` `vm`.

-   **Retours:** `{ [name: string]: Array<Array<any>> }`

-   **Exemple:**


```
import { mount } from '@vue/test-utils'

test('emit demo', async () => {
  const wrapper = mount(Component)

  wrapper.vm.$emit('foo')
  wrapper.vm.$emit('foo', 123)

  await wrapper.vm.$nextTick() // Wait until $emits have been handled

  /*
  wrapper.emitted() returns the following object:
  {
    foo: [[], [123]]
  }
  */

  // Affirmation de l'élément émis
  expect(wrapper.emitted().foo).toBeTruthy()

  // Affirmation du nombre d'élément
  expect(wrapper.emitted().foo.length).toBe(2)

  // Affirmation du paramètre additionnel
  expect(wrapper.emitted().foo[1]).toEqual([123])
})

```

Vous pouvez également écrire ce qui précède comme suit :

```
// Affirmation de l'élément émis
expect(wrapper.emitted('foo')).toBeTruthy()

// Affirmation du nombre d'élément
expect(wrapper.emitted('foo').length).toBe(2)

// Affirmation du paramètre additionnel
expect(wrapper.emitted('foo')[1]).toEqual([123])

```

La méthode `.emitted()` renvoie le même objet chaque fois qu'il est appelé, et non un nouveau, et donc l'objet se met à jour lorsque de nouveaux événements sont déclenchés :

```
const emitted = wrapper.emitted()

expect(emitted.foo.length).toBe(1)

// faire quelque chose pour que le "wrapper" émette l'événement "foo"

expect(emitted.foo.length).toBe(2)

```

## emittedByOrder

::: danger
*Le terme `emittedByOrder` est obsolète et sera supprimé dans les prochaines versions. Utilisez plutôt `wrapper.emitted`.*
:::

Retourne un tableau contenant des événements personnalisés émis par le `Wrapper` `vm`.

-   **Retours:** `Array<{ name: string, args: Array<any> }>`

-   **Exemple:**


```
import { mount } from '@vue/test-utils'

const wrapper = mount(Component)

wrapper.vm.$emit('foo')
wrapper.vm.$emit('bar', 123)

/*
wrapper.emittedByOrder() renvoie le tableau suivant :
[
  { name: 'foo', args: [] },
  { name: 'bar', args: [123] }
]
*/

// faire valoir l'ordre d'émission d'événement
expect(wrapper.emittedByOrder().map(e => e.name)).toEqual(['foo', 'bar'])

```

## exists
Affirmation de l'existence de `wrapper` ou `wrapper-array`.

Renvoie faux si on l'appelle sur un `Wrapper` ou `WrapperArray` vide.

-   **Retours:** `{boolean}`

-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
expect(wrapper.exists()).toBe(true)
expect(wrapper.find('does-not-exist').exists()).toBe(false)
expect(wrapper.findAll('div').exists()).toBe(true)
expect(wrapper.findAll('does-not-exist').exists()).toBe(false)

```

## find

::: danger
*L'utilisation de "find" pour rechercher un composant est déconseillée et sera supprimée. Utilisez plutôt [`findComponent`](https://vue-test-utils.vuejs.org/api/wrapper/findComponent.html).*
:::

Retourne le "wrapper" du premier nœud DOM ou le sélecteur de composants Vue correspondant.

Utilisez n'importe quel sélecteur DOM valide (utilise la syntaxe `querySelector`).

-   **Arguments:**

    -   `{string} selector`
-   **Retours:** `{Wrapper}`

-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const wrapper = mount(Foo)

const div = wrapper.find('div')
expect(div.exists()).toBe(true)

const byId = wrapper.find('#bar')
expect(byId.element.id).toBe('bar')

```

-   **Note:**

    -   Vous pouvez enchaîner les appels `find` ensemble :

```
const button = wrapper.find({ ref: 'testButton' })
expect(button.find('.icon').exists()).toBe(true)

```

Voir aussi : [get](https://vue-test-utils.vuejs.org/api/wrapper/get.html).

## findAll

::: danger
*L'utilisation de `findAll` pour rechercher des composants est obsolète et sera supprimée. Utilisez plutôt `findAllComponents`.*
:::

Retourne un [`WrapperArray`](https://vue-test-utils.vuejs.org/api/wrapper-array/).

Utilisez n'importe quel [sélecteur](https://vue-test-utils.vuejs.org/api/selectors.html) valide.

-   **Arguments:**

    -   `{string|Component} selector`
-   **Retours:** `{WrapperArray}`

-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const wrapper = mount(Foo)

const div = wrapper.findAll('div').at(0)
expect(div.is('div')).toBe(true)

const bar = wrapper.findAll(Bar).at(0) // Deprecated usage
expect(bar.is(Bar)).toBe(true)

```

## findComponent

Retourne le `wrapper` du premier composant Vue correspondant.

-   **Arguments:**

    -   `{Component|ref|name} selector`
-   **Retours:** `{Wrapper}`

-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const wrapper = mount(Foo)

const bar = wrapper.findComponent(Bar) // => finds Bar by component instance
expect(bar.exists()).toBe(true)
const barByName = wrapper.findComponent({ name: 'bar' }) // => finds Bar by `name`
expect(barByName.exists()).toBe(true)
const barRef = wrapper.findComponent({ ref: 'bar' }) // => finds Bar by `ref`
expect(barRef.exists()).toBe(true)

```

## findAllComponents

Retourne un [`WrapperArray`](https://vue-test-utils.vuejs.org/api/wrapper-array/) de tous les composants Vue correspondants.

-   **Arguments:**

    -   `{Component|ref|name} selector`
-   **Retours:** `{WrapperArray}`

-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const wrapper = mount(Foo)
const bar = wrapper.findAllComponents(Bar).at(0)
expect(bar.exists()).toBeTruthy()
const bars = wrapper.findAllComponents(Bar)
expect(bar).toHaveLength(1)

```

## html

Renvoie le HTML du nœud DOM `Wrapper` sous forme de chaîne.

-   **Retours:** `{string}`

-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
expect(wrapper.html()).toBe('<div><p>Foo</p></div>')

```

## get

Fonctionne exactement comme [find](https://vue-test-utils.vuejs.org/api/wrapper/find.html), mais lance une erreur si aucun élément correspondant au sélecteur donné n'est trouvé. Vous devez utiliser `find` lorsque vous recherchez un élément qui peut ne pas exister. Vous devez utiliser cette méthode lorsque vous obtenez un élément qui devrait exister et elle fournira un beau message d'erreur si ce n'est pas le cas.

Traduit avec www.DeepL.com/Translator (version gratuite)

```
import { mount } from '@vue/test-utils'

const wrapper = mount(Foo)

// Similaire à `wrapper.find`.
// `get` lancera une erreur si un élément n'est pas trouvé. `find` ne fera rien.
expect(wrapper.get('.does-exist'))

expect(() => wrapper.get('.does-not-exist'))
  .to.throw()
  .with.property(
    'message',
    'Unable to find .does-not-exist within: <div>the actual DOM here...</div>'
  )

```

## is

::: danger
*L'utilisation de `is` pour affirmer que le nœud DOM ou le sélecteur de correspondance `vm` est déprécié et sera supprimé. Considérez un appariement personnalisé tel que ceux fournis dans [jest-dom](https://github.com/testing-library/jest-dom#custom-matchers)ou pour l'assertion de type d'élément DOM, utilisez native [`Element.tagName`](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName)[](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName)*
:::

A la place.

Pour conserver ces tests, un remplacement valable pour :

-   `is('DOM_SELECTOR')` est une affirmation de `wrapper.element.tagName`.
-   `is('ATTR_NAME')` est une affirmation véridique de `wrapper.attributes('ATTR_NAME')`.
-   `is('CLASS_NAME')`  est une affirmation véridique de `wrapper.classes('CLASS_NAME')`.

En cas d'utilisation avec findComponent, accédez à l'élément DOM avec `findComponent(Comp).element`
Affirmer le nœud DOM `Wrapper` ou les correspondances `vm` [selector] (https://vue-test-utils.vuejs.org/api/selectors.html).

-   **Arguments:**

    -   `{string|Component} selector`
-   **Retours:** `{boolean}`

-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
expect(wrapper.is('div')).toBe(true)

```

## isEmpty

::: danger
*`isEmpty` est déprécié et sera supprimé dans les prochaines versions. Considérez un appariement personnalisé tel que ceux fournis dans [jest-dom] (https://github.com/testing-library/jest-dom#tobeempty)*
:::



En cas d'utilisation avec findComponent, accédez à l'élément DOM avec `findComponent(Comp).element`.

Affirmer que `Wrapper` ne contient pas de noeud enfant.

-   **Retours:** `{boolean}`

-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
expect(wrapper.isEmpty()).toBe(true)

```

## isVisible


::: danger
*isVisible` est déprécié et sera supprimé dans les prochaines  versions.    Considérez un jumelage personnalisé tel que ceux fournis dans [jest-dom](https://github.com/testing-library/jest-dom#tobevisible)*
:::


En cas d'utilisation avec findComponent, accédez à l'élément DOM avec `findComponent(Comp).element`.

Affirmer que `wrapper` est visible.

Retourne `false` si un vieil élément a le style `display : none` ou `visibility : hidden`.

Ceci peut être utilisé pour affirmer qu'un élément est caché par `v-show`.

-   **Retours:** `{boolean}`

-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
expect(wrapper.isVisible()).toBe(true)
expect(wrapper.find('.is-not-visible').isVisible()).toBe(false)

```

## isVueInstance

::: danger
*`isVueInstance` est dépréciée et sera supprimée dans les prochaines versions. Les tests reposant sur l'affirmation `isVueInstance` n'ont que peu ou pas de valeur. Nous suggérons de les remplacer par des assertions ciblées.*
:::

Pour conserver ces tests, un remplacement valable de `isVueInstance()` est une assertion véridique de `wrapper.find(...).vm`.

L'assertion `Wrapper` est l'instance de Vue.

-   **Retours:** `{boolean}`

-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
expect(wrapper.isVueInstance()).toBe(true)

```

## name

::: danger
*`name` est dépréciée et sera supprimée dans les prochaines versions.*
:::

Retourne le nom du composant si `Wrapper` contient une instance de Vue, ou le nom du tag du noeud DOM `Wrapper` si `Wrapper` ne contient pas d'instance de Vue.

-   **Retours:** `{string}`

-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
expect(wrapper.name()).toBe('Foo')
const p = wrapper.find('p')
expect(p.name()).toBe('p')

```

## props

Retourne l'objet props `Wrapper` `vm`.  Si `key` est fourni, la valeur pour "key" sera retournée.

**Note : le Wrapper doit contenir une instance de Vue.**

-   **Arguments:**

    -   `{string} key` **facultatif**
-   **Retours:** `{[prop: string]: any} | any`

-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo, {
  propsData: {
    bar: 'baz'
  }
})
expect(wrapper.props().bar).toBe('baz')
expect(wrapper.props('bar')).toBe('baz')

```

## setChecked

Définit la valeur cochée pour l'élément d'entrée de type case à cocher ou radio et met à jour les données liées au `modèle V`.

-   **Arguments:**

    -   `{Boolean} checked (default: true)`
-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
const radioInput = wrapper.find('input[type="radio"]')
radioInput.setChecked()

```

-   **Note:**

Lorsque vous essayez de mettre la valeur à state via `v-model` par `radioInput.element.checked = true ; radioInput.trigger('input')`, `v-model` n'est pas déclenché. Le `v-model` est déclenché par l'événement `change`.

`checkboxInput.setChecked(checked)` est un alias du code suivant.

```
checkboxInput.element.checked = checked
checkboxInput.trigger('click')
checkboxInput.trigger('change')

```

## setData
Définit les données "Wrapper" "vm".

setData fonctionne en appelant récursivement Vue.set.

**Note the Wrapper must contain a Vue instance.**

-   **Arguments:**

    -   `{Object} data`
-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
wrapper.setData({ foo: 'bar' })
expect(wrapper.vm.foo).toBe('bar')

```

## setMethods

::: danger
*`setMethods` est dépréciée et sera supprimée dans les prochaines versions.*
:::
Il n'y a pas de voie claire pour remplacer les "setMethods", car cela dépend vraiment de votre utilisation précédente. Cela conduit facilement à des tests bancals qui s'appuient sur des détails d'implémentation, ce qui [est déconseillé](https://github.com/vuejs/rfcs/blob/668866fa71d70322f6a7689e88554ab27d349f9c/active-rfcs/0000-vtu-api.md#setmethods)




Nous suggérons de repenser ces tests.

Pour mettre au point une méthode complexe, il faut l'extraire du composant et le tester de manière isolée. Pour affirmer qu'une méthode est appelée, utilisez votre testeur pour l'espionner.

Définit les méthodes `Wrapper` `vm` et met à jour les forces.

**Note : le Wrapper doit contenir une instance de Vue.**

-   **Arguments:**

    -   `{Object} methods`
-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import sinon from 'sinon'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
const clickMethodStub = sinon.stub()

wrapper.setMethods({ clickMethod: clickMethodStub })
wrapper.find('button').trigger('click')
expect(clickMethodStub.called).toBe(true)

```

## setProps

-   **Arguments:**

    -   `{Object} props`
-   **Usage:**


Définir les props de `Wrapper` `vm` et forcer à mettre à jour

**Note : le Wrapper doit contenir une instance de Vue.**

```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
wrapper.setProps({ foo: 'bar' })
expect(wrapper.vm.foo).toBe('bar')

```

Vous pouvez également passer un objet `propsData`, qui initialisera l'instance de Vue avec les valeurs passées.

```
// Foo.vue
export default {
  props: {
    foo: {
      type: String,
      required: true
    }
  }
}

```

```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo, {
  propsData: {
    foo: 'bar'
  }
})

expect(wrapper.vm.foo).toBe('bar')

```

## setSelected

Sélectionne un élément d'option et met à jour les données liées au `v-model`.

-   **Exemple:**

```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
const options = wrapper.find('select').findAll('option')

options.at(1).setSelected()

```

-   **Note:**

Lorsque vous essayez de mettre la valeur à state via `v-model` par `option.element.selected = true ; parentSelect.trigger('input')`, `v-model` n'est pas déclenché. Le `v-model` est déclenché par l'événement `change`.

`option.setSelected()` est un alias du code suivant.

```
option.element.selected = true
parentSelect.trigger('change')

```

## setValue

Définit la valeur d'une entrée de contrôle de texte ou d'un élément de sélection et met à jour les données liées au`v-model`.

-   **Arguments:**

    -   `{any} value`
-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)

const textInput = wrapper.find('input[type="text"]')
textInput.setValue('some value')

const select = wrapper.find('select')
select.setValue('option value')

// nécessite <select multiple>
const multiselect = wrapper.find('select')
multiselect.setValue(['value1', 'value3'])

```

-   **Note:**

    -   `textInput.setValue(value)` est un alias du code suivant.

    ```
    textInput.element.value = value
    textInput.trigger('input')

    ```

    -   `select.setValue(value)` est un alias du code suivant.

    ```
    select.element.value = value
    select.trigger('change')

    ```


## text


Renvoie le contenu textuel de`Wrapper`.

-   **Retours:** `{string}`

-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
expect(wrapper.text()).toBe('bar')

```

## trigger

Déclenche un événement de manière asynchrone sur le nœud DOM de l'`Wrapper`.


Le `trigger` prend un objet `options` optionnel. Les propriétés de l'objet `options` sont ajoutées à l'événement. `trigger` renvoie une Promesse, qui une fois résolue, garantit la mise à jour du composant. `trigger` ne fonctionne qu'avec les événements DOM natifs. Pour émettre un événement personnalisé, utilisez `wrapper.vm.$emit('myCustomEvent')`.

-   **Arguments:**

    -   `{string} eventType` **required**
    -   `{Object} options` **optional**
-   **Exemple:**


```
import { mount } from '@vue/test-utils'
import sinon from 'sinon'
import Foo from './Foo'

test('trigger demo', async () => {
  const clickHandler = sinon.stub()
  const wrapper = mount(Foo, {
    propsData: { clickHandler }
  })

  await wrapper.trigger('click')

  await wrapper.trigger('click', {
    button: 0
  })

  await wrapper.trigger('click', {
    ctrlKey: true // For testing @click.ctrl handlers
  })

  expect(clickHandler.called).toBe(true)
})

```


- **Définir l'objectif de l'événement:**

Sous le capot, `trigger` crée un objet `Event` et propage l'événement sur l'élément Wrapper.


Il n'est pas possible de modifier la valeur `target` d'un objet `Event`, donc vous ne pouvez pas définir `target` dans l'objet options.

Pour ajouter un attribut à la "cible", vous devez définir la valeur de l'élément Wrapper avant d'appeler le `trigger` Vous pouvez le faire avec la propriété `element`.

```
const input = wrapper.find('input')
input.element.value = 100
input.trigger('click')

```
