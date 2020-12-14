# Guides

## Pour commencer

<div class="vueschool"><a href="https://vueschool.io/lessons/installing-vue-test-utils?friend=vuejs" target="_blank" rel="sponsored noopener" title="Learn how to get started with Vue Test Utils, Jest, and testing Vue Components with Vue School">Apprenez comment démarrer avec Vue Test Utils, Jest, et tester les composants de Vue</a></div>

### Qu'est-ce que Vue Test Utils ?

Vue Test Utils (VTU) est un ensemble de fonctions unitaires visant à simplifier le test des composants de Vue.js. Il fournit des méthodes **monter** et **interagir** avec les composants Vue de manière isolée.

Voyons un exemple :

```js
// Importation de la méthode `mount()` de Vue Test Utils
import { mount } from '@vue/test-utils'

// Le composant à tester
const MessageComponent = {
  template: '<p>{{ msg }}</p>',
  props: ['msg']
}

test('displays message', () => {
  // mount() renvoie un composant Vue enveloppé avec lequel nous pouvons interagir
  const wrapper = mount(MessageComponent, {
    propsData: {
      msg: 'Hello world'
    }
  })

  // Faire valoir le texte rendu du composant
  expect(wrapper.text()).toContain('Hello world')
})
```
Les composants montés sont renvoyés dans un [Wrapper](../api/wrapper/), qui expose les méthodes d'interrogation et d'interaction avec le composant testé.

### Simuler l'interaction avec l'utilisateur

Imaginons un composant de compteur qui s'incrémente lorsque l'utilisateur clique sur le bouton :

```js
const Counter = {
  template: `
    <div>
      <button @click="count++">Add up</button>
      <p>Total clicks: {{ count }}</p>
    </div>
  `,
  data() {
    return { count: 0 }
  }
}
```
Pour simuler le comportement, nous devons d'abord localiser le bouton avec `wrapper.find()`, qui renvoie un **wrapper pour l'élément de bouton**. Nous pouvons ensuite simuler le clic en appelant `.trigger()` sur le wrapper bouton :

```js
test('increments counter value on click', async () => {
  const wrapper = mount(Counter)
  const button = wrapper.find('button')
  const text = wrapper.find('p')

  expect(text.text()).toContain('Total clicks: 0')

  await button.trigger('click')

  expect(text.text()).toContain('Total clicks: 1')
})
```

Remarquez que le test doit être `async` et qu'il faut attendre le `trigger`. Consultez le guide [Tester le comportement asynchrone](./README.md#testing-asynchronous-behavior) pour comprendre pourquoi cela est nécessaire et d'autres éléments à prendre en compte lors du test de scénarios asynchrones.

### Prochaines étapes

Consultez nos [conseils communs pour les tests](./README.md#knowing-what-to-test).

Vous pouvez également explorer [l'API complète](../api/).

## Les Conseils pratiques

### Savoir ce qu'il faut tester

Pour les composants UI, nous ne recommandons pas de viser une couverture complète par ligne, car cela conduit à trop se concentrer sur les détails de mise en œuvre interne des composants et pourrait entraîner des tests fragiles.

Nous recommandons plutôt de rédiger des tests qui affirment l'interface publique de notre composant et de traiter ses éléments internes comme une boîte noire. Un seul cas de test permettrait d'affirmer qu'une entrée (interaction avec l'utilisateur ou changement de props) fournie au composant se traduit par la sortie attendue (résultat de rendu ou événements personnalisés émis).

Par exemple, imaginez un composant `Counter` qui incrémente un compteur d'affichage de 1 chaque fois qu'un bouton est cliqué. Le test ne devrait pas se soucier de la façon dont le `Counter` incrémente la valeur - il ne s'intéresse qu'à l'entrée et à la sortie.

L'avantage de cette approche est que tant que l'interface publique de votre composant reste la même, vos tests seront réussis, quelle que soit l'évolution de l'implémentation interne du composant dans le temps.

Ce sujet est abordé plus en détail dans une [excellente présentation de Matt O'Connell](https://www.youtube.com/watch?v=OIpfWTThrK8).


### Le montage Shallow

Parfois, le montage d'un composant entier avec toutes ses dépendances peut devenir lent ou lourd. Par exemple, les composants qui contiennent de nombreux composants enfants.

Vue Test Utils vous permet de monter un composant sans rendre ses composants enfants (en les "stubbing") avec la méthode [`shallowMount`](../api/#shallowmount).

```js
import { shallowMount } from '@vue/test-utils'
import Component from '../Component.vue'

const wrapper = shallowMount(Component)
```
Comme pour [mount](../api/#mount), il crée un [Wrapper](../api/wrapper) qui contient le composant Vue monté et rendu, mais avec des composants enfants.

Notez que l'utilisation de `shallowMount` rendra le composant testé différent du composant que vous exécutez dans votre application - certaines de ses parties ne seront pas rendues ! C'est pourquoi ce n'est pas la façon recommandée de tester les composants, sauf si vous rencontrez des problèmes de performance ou si vous avez besoin de simplifier les dispositions de test.

### Les Hooks de cycle de vie

<div class="vueschool" style="margin-top:1em;"><a href="https://vueschool.io/lessons/learn-how-to-test-vuejs-lifecycle-methods?friend=vuejs" target="_blank" rel="sponsored noopener" title="Learn how to use Vue Test Utils to test Vue.js Lifecycle Hooks with Vue School">Apprenez à tester les méthodes et les intervalles du cycle de vie avec Vue School</a></div>

Lorsque vous utilisez les méthodes `mount` ou `shallowMount`, vous pouvez vous attendre à ce que votre composant réponde à tous les événements du cycle de vie. Cependant, il est important de noter que les méthodes `beforeDestroy` et `destroyed` _ne seront pas déclanchées_ à moins que le composant ne soit détruit manuellement en utilisant `Wrapper.destroy()`.

De plus, le composant ne sera pas automatiquement détruit à la fin de chaque spécification, et c'est à l'utilisateur d'arrêter ou de nettoyer manuellement les tâches qui continueront à s'exécuter (`setInterval` ou `setTimeout`, par exemple) avant la fin de chaque spec.

### Écrire des tests asynchrones (nouveau)

Par défaut, les mises à jour des lots de Vue s'effectuent de manière asynchrone (à la prochaine "cloche"). Ceci afin d'éviter les re-rendus DOM inutiles, et les calculs des watchers ([voir les docs](https://vuejs.org/v2/guide/reactivity.html#Async-Update-Queue) pour plus de détails).

Cela signifie que vous **devez** attendre que les mises à jour s'exécutent après avoir modifié une propriété réactive. Vous pouvez le faire en attendant les méthodes de mutations comme le `trigger` :

```js
it('updates text', async () => {
  const wrapper = mount(Component)
  await wrapper.trigger('click')
  expect(wrapper.text()).toContain('updated')
  await wrapper.trigger('click')
  wrapper.text().toContain('some different text')
})

// Ou si vous êtes sans async/await
it('render text', done => {
  const wrapper = mount(TestComponent)
  wrapper.trigger('click').then(() => {
    wrapper.text().toContain('updated')
    wrapper.trigger('click').then(() => {
      wrapper.text().toContain('some different text')
      done()
    })
  })
})
```

Pour en savoir plus, consultez la page [Tester le comportement asynchrone](../guides/README.md#testing-asynchronous-behavior)

### Affirmer les événements émis

Chaque wrapper monté enregistre automatiquement tous les événements émis par l'instance Vue sous-jacente. Vous pouvez récupérer les événements enregistrés en utilisant la méthode `wrapper.emitted()` :

```js
wrapper.vm.$emit('foo')
wrapper.vm.$emit('foo', 123)

/*
`wrapper.emitted()` renvoie l'objet suivant :
{
  foo: [[], [123]]
}
*/
```

Vous pouvez alors faire des affirmations sur la base de ces données :

```js
// affirmer l'émission de l'événement
expect(wrapper.emitted().foo).toBeTruthy()

// affirmer le nombre d'événements
expect(wrapper.emitted().foo.length).toBe(2)

// affirmer le paramètre additionnel
expect(wrapper.emitted().foo[1]).toEqual([123])
```
Vous pouvez également obtenir un tableau des événements dans leur ordre d'émission en appelant [`wrapper.emittedByOrder()`](../api/wrapper/emittedByOrder.md).

### Événement émis d'un composant Enfant

Vous pouvez émettre un événement personnalisé à partir d'un composant enfant en accédant à l'instance.

**Composant en cours de test**

```html
<template>
  <div>
    <child-component @custom="onCustom" />
    <p v-if="emitted">Emitted!</p>
  </div>
</template>

<script>
  import ChildComponent from './ChildComponent'

  export default {
    name: 'ParentComponent',
    components: { ChildComponent },
    data() {
      return {
        emitted: false
      }
    },
    methods: {
      onCustom() {
        this.emitted = true
      }
    }
  }
</script>
```

**Test**

```js
import { mount } from '@vue/test-utils'
import ParentComponent from '@/components/ParentComponent'
import ChildComponent from '@/components/ChildComponent'

describe('ParentComponent', () => {
  it("displays 'Emitted!' when custom event is emitted", () => {
    const wrapper = mount(ParentComponent)
    wrapper.find(ChildComponent).vm.$emit('custom')
    expect(wrapper.html()).toContain('Emitted!')
  })
})
```

### Manipulation de l'état des composants

Vous pouvez directement manipuler l'état du composant en utilisant la méthode `setData` ou `setProps` dans le wrapper :

```js
wrapper.setData({ count: 10 })

wrapper.setProps({ foo: 'bar' })
```

### Simuler les Props

Vous pouvez passer les props au composant en utilisant l'option intégrée `propsData` de Vue :

```js
import { mount } from '@vue/test-utils'

mount(Component, {
  propsData: {
    aProp: 'some value'
  }
})
```

Vous pouvez également mettre à jour les props d'un composant déjà monté avec la méthode `wrapper.setProps({})`.

_Pour une liste complète des options, vueillez consulter la [section des options de montage](../api/options.md) de la documentation.

### Simulation de transition

Bien qu'appeler `await Vue.nextTick()` fonctionne bien pour la plupart des cas d'utilisation, il y a certaines situations où des solutions de contournement supplémentaire sont nécessaires. Ces problèmes seront résolus avant que la bibliothèque `vue-test-utils`ne sorte de la version bêta. Un exemple est celui des composants de test unitaire avec le wrapper `<transition>` fourni par Vue.

```vue
<template>
  <div>
    <transition>
      <p v-if="show">Foo</p>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  }
}
</script>
```
Vous pourriez vouloir écrire un test qui vérifie que Foo est affiché, puis lorsque `show` est réglé sur `false`, Foo n'est plus rendu. Un tel test pourrait être écrit de la manière suivante :

```js
test('should render Foo, then hide it', async () => {
  const wrapper = mount(Foo)
  expect(wrapper.text()).toMatch(/Foo/)

  await wrapper.setData({
    show: false
  })

  expect(wrapper.text()).not.toMatch(/Foo/)
})
```

En pratique, bien que nous appelions et attendions `setData` pour assurer la mise à jour du DOM, ce test échoue. Il s'agit d'un problème permanent lié à la façon dont Vue implémente le composant `<transition>`, que nous aimerions résoudre avant la version 1.0. Pour l'instant, il existe quelques solutions de contournement :

#### Utiliser un helper `transitionStub`

```js
const transitionStub = () => ({
  render: function(h) {
    return this.$options._renderChildren
  }
})

test('should render Foo, then hide it', async () => {
  const wrapper = mount(Foo, {
    stubs: {
      transition: transitionStub()
    }
  })
  expect(wrapper.text()).toMatch(/Foo/)

  await wrapper.setData({
    show: false
  })

  expect(wrapper.text()).not.toMatch(/Foo/)
})
```

Cela remplace le comportement par défaut du composant `<transition>` et rend les enfants dès que la condition booléenne pertinente change, par opposition à l'application de classes CSS, qui est la façon dont le composant `<transition>` de Vue fonctionne.

#### Éviter `setData`

Une autre solution est tout simplement d'éviter d'utiliser `setData` en écrivant deux tests, la configuration requise étant effectuée à l'aide des options `mount` et `shallowMount` :

```js
test('should render Foo', async () => {
  const wrapper = mount(Foo, {
    data() {
      return {
        show: true
      }
    }
  })

  expect(wrapper.text()).toMatch(/Foo/)
})

test('should not render Foo', async () => {
  const wrapper = mount(Foo, {
    data() {
      return {
        show: false
      }
    }
  })

  expect(wrapper.text()).not.toMatch(/Foo/)
})
```

### Appliquer les plugins et les mixins globaux

Certains des composants peuvent reposer sur des fonctionnalités injectées par un plugin ou par un mixin global, par exemple `vuex` et `vue-router`.

Si vous écrivez des tests pour des composants dans une application spécifique, vous pouvez configurer les mêmes plugins et mixins globaux une fois dans l'entrée de vos tests. Mais dans certains cas, par exemple pour tester une suite de composants génériques qui peuvent être partagés entre différentes applications, il est préférable de tester vos composants dans une configuration plus isolée, sans polluer le constructeur global "Vue". Nous pouvons utiliser la méthode [`createLocalVue`](../api/createLocalVue.md) pour y parvenir :

```js
import { createLocalVue, mount } from '@vue/test-utils'

// créer un constructeur de `Vue` étendu
const localVue = createLocalVue()

// installer les plugins comme d'habitude
localVue.use(MyPlugin)

// passer la `localVue` aux options de montage
mount(Component, {
  localVue
})
```

**À noter : certains plugins, comme Vue Router, ajoutent des propriétés en lecture seule au constructeur global de Vue. Cala rend impossible de réinstaller le plugin sur un constructeur `localVue`, ou d'ajouter des mocks pour ces propriétés en lecture seule**

### Mocking Injections

Une autre stratégie pour les props injectés consiste simplement à les simuler. Vous pouvez le faire avec l'option `mocks` :

```js
import { mount } from '@vue/test-utils'

const $route = {
  path: '/',
  hash: '',
  params: { id: '123' },
  query: { q: 'hello' }
}

mount(Component, {
  mocks: {
    // ajouter l'objet `$route` simlué à l'instance Vue
    // avant le montage du composant
    $route
  }
})
```

### Les composants d'écrasement

Vous pouvez remplacer les composants qui sont enregistrés globalement ou localement en utilisant l'option `stubs` :


```js
import { mount } from '@vue/test-utils'

mount(Component, {
  // Résoudra le problème des composants enregistrés au niveau mondial avec
  // le stub vide
  stubs: ['globally-registered-component']
})
```

### Gestion du routage

Étant donné que le routage, par définition, a trait à la structure globale de l'application et implique de multiples composants, il est préférable de le tester par des tests d'intégration ou de bout en bout. Pour les composants individuels qui s'appuient sur les fonctionnalités de `vue-router`, vous pouvez les simuler en utilisant les techniques mentionnées ci-dessus.


### Détecter les styles

Votre test ne peut détecter que les styles en ligne lorsqu'il est exécuté dans `jsdom`.

## Tester les `key`, la souris et les autres événements

<div class="vueschool"><a href="https://vueschool.io/lessons/traversing-the-dom?friend=vuejs" target="_blank" rel="sponsored noopener" title="Learn to traverse and interact with the DOM with a free video lesson from Vue School">Apprenez à traverser et à interagir avec le DOM grâce à une leçon gratuite sur Vue School</a></div>

### Événements déclencheurs

Le `Wrapper` expose une méthode `trigger`. Il peut être utile pour déclencher les événements du DOM.

```js
const wrapper = mount(MyButton)

wrapper.trigger('click')
```
Vous devez savoir que la méthode `find` renvoie également un `Wrapper`. En supposant que `MyComponent` contient un bouton, le code suivant clique sur le bouton.

```js
const wrapper = mount(MyComponent)

wrapper.find('button').trigger('click')
```

### Les Options

La méthode `trigger` prend en option un objet optionnel `options`. Les propriétés dans cet objet `options` sont ajoutés à l'événement.

A noter que la cible ne peut pas être ajoutée dans l'objet `options`.

```js
const wrapper = mount(MyButton)

wrapper.trigger('click', { button: 0 })
```

### Exemple de clic de souris

**Composante à l'essai**

```html
<template>
  <div>
    <button class="yes" @click="callYes">Yes</button>
    <button class="no" @click="callNo">No</button>
  </div>
</template>

<script>
  export default {
    name: 'YesNoComponent',

    props: {
      callMe: {
        type: Function
      }
    },

    methods: {
      callYes() {
        this.callMe('yes')
      },
      callNo() {
        this.callMe('no')
      }
    }
  }
</script>
```

**Test**

```js
import YesNoComponent from '@/components/YesNoComponent'
import { mount } from '@vue/test-utils'
import sinon from 'sinon'

describe('Click event', () => {
  it('Click on yes button calls our method with argument "yes"', () => {
    const spy = sinon.spy()
    const wrapper = mount(YesNoComponent, {
      propsData: {
        callMe: spy
      }
    })
    wrapper.find('button.yes').trigger('click')

    spy.should.have.been.calledWith('yes')
  })
})
```

### Exemple de clavier

**Composante à l'essai**

Ce composant permet d'incrémenter/décrémenter la quantité à l'aide de différentes clés.

```html
<template>
  <input type="text" @keydown.prevent="onKeydown" v-model="quantity" />
</template>

<script>
  const KEY_DOWN = 40
  const KEY_UP = 38
  const ESCAPE = 27

  export default {
    data() {
      return {
        quantity: 0
      }
    },

    methods: {
      increment() {
        this.quantity += 1
      },
      decrement() {
        this.quantity -= 1
      },
      clear() {
        this.quantity = 0
      },
      onKeydown(e) {
        if (e.keyCode === ESCAPE) {
          this.clear()
        }
        if (e.keyCode === KEY_DOWN) {
          this.decrement()
        }
        if (e.keyCode === KEY_UP) {
          this.increment()
        }
        if (e.key === 'a') {
          this.quantity = 13
        }
      }
    },

    watch: {
      quantity: function(newValue) {
        this.$emit('input', newValue)
      }
    }
  }
</script>
```

**Test**

```js
import QuantityComponent from '@/components/QuantityComponent'
import { mount } from '@vue/test-utils'

describe('Key event tests', () => {
  it('Quantity is zero by default', () => {
    const wrapper = mount(QuantityComponent)
    expect(wrapper.vm.quantity).toBe(0)
  })

  it('Up arrow key increments quantity by 1', () => {
    const wrapper = mount(QuantityComponent)
    wrapper.trigger('keydown.up')
    expect(wrapper.vm.quantity).toBe(1)
  })

  it('Down arrow key decrements quantity by 1', () => {
    const wrapper = mount(QuantityComponent)
    wrapper.vm.quantity = 5
    wrapper.trigger('keydown.down')
    expect(wrapper.vm.quantity).toBe(4)
  })

  it('Escape sets quantity to 0', () => {
    const wrapper = mount(QuantityComponent)
    wrapper.vm.quantity = 5
    wrapper.trigger('keydown.esc')
    expect(wrapper.vm.quantity).toBe(0)
  })

  it('Magic character "a" sets quantity to 13', () => {
    const wrapper = mount(QuantityComponent)
    wrapper.trigger('keydown', {
      key: 'a'
    })
    expect(wrapper.vm.quantity).toBe(13)
  })
})
```

**Limitations**

Un nom de clé après le point `keydown.up` est traduit par un `keyCode`. Ceci est pris en charge pour les noms suivants :

| key name  | key code |
| --------- | -------- |
| enter     | 13       |
| esc       | 27       |
| tab       | 9        |
| space     | 32       |
| delete    | 46       |
| backspace | 8        |
| insert    | 45       |
| up        | 38       |
| down      | 40       |
| left      | 37       |
| right     | 39       |
| end       | 35       |
| home      | 36       |
| pageup    | 33       |
| pagedown  | 34       |

## Tester le comportement asynchrone

Il existe deux types de comportement asynchrone que vous rencontrerez dans vos tests :

1. Mises à jour appliquées par Vue
2. Comportement asynchrone en dehors de Vue

### Mises à jour appliquées par Vue

Visualiser les lots en attente de mises à jour du DOM et les appliquer de manière asynchrone pour éviter les rendus inutiles causés par de multiples mutations de données.


_Vous pouvez en savoir plus sur les mises à jour asynchrones dans la [Vue docs](https://vuejs.org/v2/guide/reactivity.html#Async-Update-Queue)_

En pratique, cela signifie qu'après la mutation d'une propriété réactive, pour affirmer que le changement a été apporté, votre test doit attendre pendant que Vue effectue les mises à jour.
Un autre moyen est d'utiliser `await Vue.nextTick()`, mais un moyen plus facile et plus propre est de simplement `await`(attendre) la méthode avec laquelle vous avez muté l'état, comme `trigger`

```js
// à l'intérieur de la suite de test, ajouter ce cas test
it('button click should increment the count text', async () => {
  expect(wrapper.text()).toContain('0')
  const button = wrapper.find('button')
  await button.trigger('click')
  expect(wrapper.text()).toContain('1')
})
```

Attendre le déclenchement ci-dessus, c'est la même chose que faire :

```js
it('button click should increment the count text', async () => {
  expect(wrapper.text()).toContain('0')
  const button = wrapper.find('button')
  button.trigger('click')
  await Vue.nextTick()
  expect(wrapper.text()).toContain('1')
})
```

Les méthodes qui peuvent être attendues sont :

- [setData](../api/wrapper/README.md#setdata)
- [setValue](../api/wrapper/README.md#setvalue)
- [setChecked](../api/wrapper/README.md#setchecked)
- [setSelected](../api/wrapper/README.md#setselected)
- [setProps](../api/wrapper/README.md#setprops)
- [trigger](../api/wrapper/README.md#trigger)

### Le comportement asynchrone en dehors de Vue

L'un des comportements asynchrones les plus courants en dehors de Vue est l'appel d'API dans les actions Vuex. Les exemples suivants montrent comment tester une méthode qui effectue un appel d'API. Cet exemple utilise jest pour exécuter le test et pour simuler la bibliothèque HTTP `axios`. Vous trouverez plus d'informations sur les simulations manuelles de jest [ici](https://jestjs.io/docs/en/manual-mocks.html#content).


L'implémentation de la simulations d'`axios` ressemble à ceci :
```js
export default {
  get: () => Promise.resolve({ data: 'value' })
}
```

Le composant ci-dessus effectue un appel API lorsqu'un bouton est cliqué, puis attribue la réponse à `value`.
```html
<template>
  <button @click="fetchResults">{{ value }}</button>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        value: null
      }
    },

    methods: {
      async fetchResults() {
        const response = await axios.get('mock/service')
        this.value = response.data
      }
    }
  }
</script>
```

Un test peut être rédigé de cette manière :

```js
import { shallowMount } from '@vue/test-utils'
import Foo from './Foo'
jest.mock('axios', () => ({
  get: Promise.resolve('value')
}))

it('fetches async when a button is clicked', () => {
  const wrapper = shallowMount(Foo)
  wrapper.find('button').trigger('click')
  expect(wrapper.text()).toBe('value')
})
```

Ce test échoue actuellement parce que l'affirmation est appelée avant que la promesse dans `fetchResults` ne soit résolue. La plupart des bibliothèques de tests unitaires fournissent un rappel pour faire savoir au lanceur quand le test est terminé. Jest et Mocha utilisent tous deux `done`. Nous pouvons utiliser `done` en combinaison avec `$nextTick` ou `setTimeout` pour s'assurer que toutes les promesses sont réglées avant que l'assertion ne soit faite.


```js
it('fetches async when a button is clicked', done => {
  const wrapper = shallowMount(Foo)
  wrapper.find('button').trigger('click')
  wrapper.vm.$nextTick(() => {
    expect(wrapper.text()).toBe('value')
    done()
  })
})
```

La raison pour laquelle `setTimeout` permet au test de passer est que la file d'attente des micro-tâches, où les rappels de promesses sont traités, s'exécute avant la file d'attente des tâches, où les rappels `setTimeout` sont traités. Cela signifie qu'au moment où le rappel `setTimeout` s'exécute, tous les rappels de promesses dans la file d'attente des micro-tâches auront été exécutés. Par contre, `$nextTick` programme une microtâche, mais comme la file d'attente des microtâches est traitée dans l'ordre d'arrivée, cela garantit également que le rappel de promesse a été exécuté au moment où l'assertion est faite. Voir [ici](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/) pour une explication plus détaillée.

Une autre solution consiste à utiliser une fonction `async` et un paquet comme [flush-promises](https://www.npmjs.com/package/flush-promises). La fonction `flush-promises` permet de vider tous les gestionnaires de promesses en attente de résolution. Vous pouvez `await` l'appel de `flushPromises` pour vider les promesses en attente et améliorer la lisibilité de votre test

Le test actualisé ressemble à ceci :

```js
import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Foo from './Foo'
jest.mock('axios')

it('fetches async when a button is clicked', async () => {
  const wrapper = shallowMount(Foo)
  wrapper.find('button').trigger('click')
  await flushPromises()
  expect(wrapper.text()).toBe('value')
})
```

Cette même technique peut être appliquée aux actions de Vuex, qui retournent une promesse par défaut.

#### Pourquoi ne pas se contenter de `await button.trigger()` ?

Comme expliqué ci-dessus, il y a une différence entre le temps nécessaire à Vue pour mettre à jour ses composants,
et le temps qu'il faut pour qu'une promesse, comme celle d'`axios` soit tenue.

Une bonne règle à suivre est de toujours `await` les mutations comme `trigger` ou `setProps`.
Si votre code repose sur quelque chose d'asynchrone, comme appeler `axios`, ajoutez également une attente à l'appel `flushPromises`.

## Utilisation avec TypeScript

> Un exemple de projet pour cette installation est disponible sur [GitHub](https://github.com/vuejs/vue-test-utils-typescript-example).

TypeScript est un sur-ensemble populaire de JavaScript qui ajoute des types et des classes en plus des JS ordinaires. Vue Test Utils inclut les types dans le paquet distribué, donc il fonctionne bien avec TypeScript.

Dans ce guide, nous expliquerons comment configurer un dispositif de test pour un projet TypeScript en utilisant Jest et Vue Test Utils à partir d'une configuration de base de Vue CLI TypeScript.

### Ajout de TypeScript

Vous devez d'abord créer un projet. SI vous n'avez pas installé Vue CLI, installez-le globalement :

```shell
$ npm install -g @vue/cli
```

Et créer un projet avec :

```shell
$ vue create hello-world
```

Dans l’invite du CLI, choisissez de `Manually select features`, sélectionnez TypeScript et appuyez sur la touche enter. Cela créera un projet avec TypeScript déjà configuré.

::: tip NOTE
Si vous souhaitez obtenir un guide plus détaillé sur la configuration de Vue avec TypyScript, consultez le [guide de démarrage de Vue avec TypeScript](https://github.com/Microsoft/TypeScript-Vue-Starter).
:::

L'étape suivante consiste d'ajouter Jest au projet.

### Mise en place de Jest

Jest est un outil de test développer par Facebook, visant à fournir une solution de test unitaire sur batterie. Vous pouvez en savoir plus sur Jest en consultant sa [documentation officielle](https://jestjs.io/).

Installez Jest et Vue Test Utils :

```bash
$ npm install --save-dev jest @vue/test-utils
```

Définissez ensuite un script `test:unit` dans le fichier `package.json`.

```json
// package.json
{
  // ..
  "scripts": {
    // ..
    "test:unit": "jest"
  }
  // ..
}
```

### Traitement des composants monofichiers dans Jest

Pour apprend à Jest comment traiter les fichiers `*.vue`, nous devons installer et configurer le préprocesseur `vue-jest` :

```bash
npm install --save-dev vue-jest
```

Ensuite, créez un bloc `jest` dans `package.json` :

```json
{
  // ...
  "jest": {
    "moduleFileExtensions": [
      "js",
      "ts",
      "json",
      // dites à Jest de gérer les fichiers `*.vue`
      "vue"
    ],
    "transform": {
      // traiter les fichiers `*.vue` avec `vue-jest`
      ".*\\.(vue)$": "vue-jest"
    },
    "testURL": "http://localhost/"
  }
}
```

### Configuration de TypeScript pour Jest


Afin d'utiliser les fichiers TypeScript dans les tests, nous devons configurer Jest pour qu'il compile le TypeScript. Pour cela, nous devons installer `ts-jest` :

```bash
$ npm install --save-dev ts-jest
```
Ensuite, nous devons dire à Jest de traiter les fichiers de test TypeScript avec `ts-jest` en ajoutant une entrée sous `jest.transform` dans `package.json` :

```json
{
  // ...
  "jest": {
    // ...
    "transform": {
      // ...
      // traiter les fichiers `*.ts` avec `ts-jest`
      "^.+\\.tsx?$": "ts-jest"
    }
    // ...
  }
}
```

### Placement des dossiers de test

Par défaut, Jest récupère récursivement tous les fichiers qui ont une extension `.spec.js`ou `.test.js` dans l'ensemble du projet.

Pour exécuter des fichiers de test avec une extension `.ts`, nous devons modifier le `testRegex` dans la section de configuration du fichier `package.json`.

Ajoutez ce qui suit dans le champ `jest` du fichier `package.json` :

```json
{
  // ...
  "jest": {
    // ...
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$"
  }
}
```
Jest recommande de créer un répertoire `__tests__` juste à côté du code testé, mais n'hésitez pas à structurer vos tests comme bon vous semble. Attention, Jest crée un répertoire `__snapshots__` à côté des fichiers de test qui effectuent les tests de snapshot.

### Faire un test unitaire

Maintenant que le projet est mis en place, il est temps d'écrire un test unitaire.

Créez un fichier `src/components/__tests__/HelloWorld.spec.ts`, et ajoutez le code suivant :

```js
// src/components/__tests__/HelloWorld.spec.ts
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld.vue', () => {
  test('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
```
C'est tout ce qui faut faire pour que TypeScript et Vue Test Utils travaillent ensemble !

### Les Ressources

- [Exemple de projet pour cette configuration](https://github.com/vuejs/vue-test-utils-typescript-example)
- [Jest](https://jestjs.io/)

## Utilisation de Vue Router

### Installation de Vue Router dans les tests

Vous ne devez jamais installer Vue Router sur le constructeur de base de Vue lors de tests. L'installation de Vue Router ajoute `$route` et `$router` comme propriétés en lecture seule sur le prototype Vue.

Pour éviter cela, on peut créer un "localVue", et installer Vue Router dessus.

```js
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

shallowMount(Component, {
  localVue,
  router
})
```

> **Note:** L'installation de Vue Router sur une `localVue` ajoute également `$route` et `$router` comme propriétés en lecture seule à une `localVue`. Cela signifie que vous ne pouvez pas utiliser l'option `mocks` pour écraser `$route` et `$router` lors du montage d'un composant utilisant une `localVue` avec Vue Router installé.

### Tester les composants qui utilisent `router-link` ou `router-view`

Lorsque vous installez Vue Router, les composants `router-link` et `router-view` sont enregistrés. Cela signifie que nous pouvons les utiliser n'importe où dans notre application sans avoir besoin de les importer.

Lorsque nous effectuons des tests, nous devons mettre ces composants de Vue Router à la disposition du composant que nous montons. Il existe deux méthodes pour ce faire.

### Utiliser les stubs

```js
import { shallowMount } from '@vue/test-utils'

shallowMount(Component, {
  stubs: ['router-link', 'router-view']
})
```

### Installer Vue Router avec localVue

```js
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)

shallowMount(Component, {
  localVue
})
```

### Simuler `$route` et `$router`

Parfois, vous voulez tester qu'un composant fait quelque chose avec les paramètres des objets `$route` et `$routeur`. Pour ce faire, vous pouvez passer des simulations personnalisées à l'instance Vue.

```js
import { shallowMount } from '@vue/test-utils'

const $route = {
  path: '/some/path'
}

const wrapper = shallowMount(Component, {
  mocks: {
    $route
  }
})

wrapper.vm.$route.path // /some/path
```

### Les gotchas commun

L'installation de Vue Router ajoute `$route` et `$router` comme propriétés en lecture seule sur le prototype de Vue.

Cela signifie que tous les futurs tests qui tenteront de simuler `$route` et `$router` echoueront

Pour éviter cela, n'installez jamais Vue Router globalement lorsque vous effectuez des tests; utilisez un `localVue` comme détaillé ci-dessus.

# Utilisation avec Vuex

Dans ce guide, nous verrons comme tester Vuex dans les composants avec Vue Test Utils, et comment aborder le test d'un sore de Vuex.

<div class="vueschool"><a href="https://vueschool.io/lessons/how-to-test-vuejs-component-with-vuex-store?friend=vuejs" target="_blank" rel="sponsored noopener" title="Learn how to test that a Vuex Store is injected into a component with a free video lesson on Vue School">Apprenez comment tester qu'un store de Vuex est injecté dans un composant avec Vue School</a></div>

## Tester Vuex dans les composants

### Simulation des Actions

Regardons un peu de code.

C'est le composant que nous voulons tester. Il appelle les actions de Vuex.

```html
<template>
  <div class="text-align-center">
    <input type="text" @input="actionInputIfTrue" />
    <button @click="actionClick()">Click</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    methods: {
      ...mapActions(['actionClick']),
      actionInputIfTrue: function actionInputIfTrue(event) {
        const inputValue = event.target.value
        if (inputValue === 'input') {
          this.$store.dispatch('actionInput', { inputValue })
        }
      }
    }
  }
</script>
```

Pour les besoins de ce test, nous ne soucions pas de l’effet des actions, ni de l’aspect du store. Nous devons juste savoir que ces actions sont lancées au moment opportun et qu’elles sont lancées avec la valeur attendue.

Pour tester cela, nous devons faire passer un store fictif à Vue lorsque nous montons notre composant avec `shallowMount`.

Au lieu de passer le store au constructeur de base de Vue, nous pouvons le passer à - [localVue](../api/options.md#localvue). Un localVue est un constructeur de Vue étendu que nous pouvons modifier sans affecter le constructeur de Vue global.

Voyons à quoi cela ressemble :

```js
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Actions from '../../../src/components/Actions'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Actions.vue', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      actionClick: jest.fn(),
      actionInput: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })

  it('dispatches "actionInput" when input event value is "input"', () => {
    const wrapper = shallowMount(Actions, { store, localVue })
    const input = wrapper.find('input')
    input.element.value = 'input'
    input.trigger('input')
    expect(actions.actionInput).toHaveBeenCalled()
  })

  it('does not dispatch "actionInput" when event value is not "input"', () => {
    const wrapper = shallowMount(Actions, { store, localVue })
    const input = wrapper.find('input')
    input.element.value = 'not input'
    input.trigger('input')
    expect(actions.actionInput).not.toHaveBeenCalled()
  })

  it('calls store action "actionClick" when button is clicked', () => {
    const wrapper = shallowMount(Actions, { store, localVue })
    wrapper.find('button').trigger('click')
    expect(actions.actionClick).toHaveBeenCalled()
  })
})
```

Que se passe-t-il ici ? Tout d'abord, nous disons à Vue d'utiliser Vuex avec la méthode `localVue.use`. C'est juste un emballage autour de `Vue.use`.

Nous faisons ensuite un magasin fictif en appelant `new Vuex.Store` avec nos valeurs fictives. Nous lui transmettons seulement les actions, puisque c'est tout ce qui nous intéresse.

Les actions sont des [fonctions fictives de jest] (https://jestjs.io/docs/en/mock-functions.html). Ces fonctions fantaisie nous donnent des méthodes pour affirmer si les actions ont été appelées ou non.

Nous pouvons alors affirmer dans nos tests que le talon d'action a été appelé au moment prévu.

La façon dont nous définissons le magasin peut vous sembler un peu étrange.

Nous utilisons `beforeEach` pour nous assurer que nous avons un magasin propre avant chaque test. Le `beforeEach` est un crochet de moka qui est appelé avant chaque test. Dans notre test, nous réaffectons la valeur des variables du magasin. Si nous ne faisions pas cela, les fonctions fictives devraient être automatiquement réinitialisées. Cela nous permet également de changer l'état dans nos tests, sans que cela n'affecte les tests ultérieurs.

La chose la plus importante à noter dans ce test est que **nous créons un magasin Vuex fictif et le passons ensuite à Vue Test Utils**.

Super, donc maintenant nous pouvons simuler des actions, regardons les getters simulés.

### Simuler les Getters

```html
<template>
  <div>
    <p v-if="inputValue">{{inputValue}}</p>
    <p v-if="clicks">{{clicks}}</p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: mapGetters(['clicks', 'inputValue'])
  }
</script>
```

C'est un élément assez simple. Il rend le résultat des `clicks` et `inputValue`. Encore une fois, nous ne nous soucions pas vraiment de ce que ces getters renvoient, mais simplement du fait que leur résultat est rendu correctement.

Voyons le test :

```js
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Getters from '../../../src/components/Getters'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Getters.vue', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      clicks: () => 2,
      inputValue: () => 'input'
    }

    store = new Vuex.Store({
      getters
    })
  })

  it('Renders "store.getters.inputValue" in first p tag', () => {
    const wrapper = shallowMount(Getters, { store, localVue })
    const p = wrapper.find('p')
    expect(p.text()).toBe(getters.inputValue())
  })

  it('Renders "store.getters.clicks" in second p tag', () => {
    const wrapper = shallowMount(Getters, { store, localVue })
    const p = wrapper.findAll('p').at(1)
    expect(p.text()).toBe(getters.clicks().toString())
  })
})
```
Ce test est similaire à notre test d'actions. Nous créons un magasin fictif avant chaque test, nous le passons en option lorsque nous appelons `shallowMount`, et nous affirmons que la valeur retournée par nos getters fictifs est rendue.

C'est très bien, mais que faire si nous voulons vérifier que nos getters renvoient la partie correcte de notre état ?

### Simuler avec des modules

Les [Modules](https://vuex.vuejs.org/guide/modules.html) sont utiles pour séparer notre magasin en morceaux gérables. Ils exportent également des getters. Nous pouvons les utiliser dans nos tests.

Examinons notre composant :


```html
<template>
  <div>
    <button @click="moduleActionClick()">Click</button>
    <p>{{moduleClicks}}</p>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    methods: {
      ...mapActions(['moduleActionClick'])
    },

    computed: mapGetters(['moduleClicks'])
  }
</script>
```

Le simple composant qui comprend une action et un getter.

Et le test :

```js
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import MyComponent from '../../../src/components/MyComponent'
import myModule from '../../../src/store/myModule'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('MyComponent.vue', () => {
  let actions
  let state
  let store

  beforeEach(() => {
    state = {
      clicks: 2
    }

    actions = {
      moduleActionClick: jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        myModule: {
          state,
          actions,
          getters: myModule.getters
        }
      }
    })
  })

  it('calls store action "moduleActionClick" when button is clicked', () => {
    const wrapper = shallowMount(MyComponent, { store, localVue })
    const button = wrapper.find('button')
    button.trigger('click')
    expect(actions.moduleActionClick).toHaveBeenCalled()
  })

  it('renders "state.clicks" in first p tag', () => {
    const wrapper = shallowMount(MyComponent, { store, localVue })
    const p = wrapper.find('p')
    expect(p.text()).toBe(state.clicks.toString())
  })
})
```

### Tester un store de Vuex

Il existe deux approches pour tester un store de Vuex. La première approche consiste à tester séparément les getters, les mutations, et les actions. La seconde est de créer un store et à le tester par rapport à celui-ci. Nous allons examiner les deux approches.

Pour voir comment tester le store de Vuex, nous allons créer simplement un `counter` dans le store. Le store aura une mutation `increment` et un getter `evenOrOdd`.

```js
// mutations.js
export default {
  increment(state) {
    state.count++
  }
}
```

```js
// getters.js
export default {
  evenOrOdd: state => (state.count % 2 === 0 ? 'even' : 'odd')
}
```

### Tester séparément les getters, les mutations et les actions

Les getters, les mutations et les actions sont tous des fonctions JavaScript, donc nous pouvons les tester sans utiliser Vue Test Utils et Vuex.

L'avantage de tester les getters, les mutations et les actions séparément est que tests unitaires sont détaillés. Lorsqu'ils échouent, vous savez exactement ce qui ne va pas avec votre code. L'inconvénient est que vous devez avoir des fonctions Vuex fictives, comme `commit` et `dispatch`. Cela peut conduire à une situation où vos tests unitaires réussissent, mais que votre code de production échoue car vos simulations sont incorrectes.

Nous allons créer deux fichiers de test, `mutations.spec.js` et `getters.spec.js`:

Tout d'abord, testons les mutations `increment`

```js
// mutations.spec.js

import mutations from './mutations'

test('"increment" increments "state.count" by 1', () => {
  const state = {
    count: 0
  }
  mutations.increment(state)
  expect(state.count).toBe(1)
})
```

Maintenant testons le getter `evenOrOdd`. Nous pouvons le tester en créant un `state` fictif, en appelant le getter avec le `state` et en vérifiant qu'il renvoie la valeur correcte.

```js
// getters.spec.js

import getters from './getters'

test('"evenOrOdd" returns even if "state.count" is even', () => {
  const state = {
    count: 2
  }
  expect(getters.evenOrOdd(state)).toBe('even')
})

test('"evenOrOdd" returns odd if "state.count" is odd', () => {
  const state = {
    count: 1
  }
  expect(getters.evenOrOdd(state)).toBe('odd')
})
```

### Tester le store en activité

Une autre approche pour tester le store de Vuex consiste à créer un store en cours d'exécution en utilisant la configuration du store.

L'avantage de créer une instance de magasin en cours d'exécution est que nous n'avons pas à simuler des fonctions de Vuex.

L'inconvénient est que lorsqu'un test échoue, il peut être difficile de trouver où se situe le problème.

Écrivons un test. Lorsque nous créons un store, nous utiliserons `localVue` pour éviter de polluer le constructeur de base de Vue. Le test crée un store en utilisant l'export `store-config.js` :

```js
// store-config.js

import mutations from './mutations'
import getters from './getters'

export default {
  state: {
    count: 0
  },
  mutations,
  getters
}
```

```js
// store-config.spec.js

import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import storeConfig from './store-config'
import { cloneDeep } from 'lodash'

test('increments "count" value when "increment" is committed', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store(cloneDeep(storeConfig))
  expect(store.state.count).toBe(0)
  store.commit('increment')
  expect(store.state.count).toBe(1)
})

test('updates "evenOrOdd" getter when "increment" is committed', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store(cloneDeep(storeConfig))
  expect(store.getters.evenOrOdd).toBe('even')
  store.commit('increment')
  expect(store.getters.evenOrOdd).toBe('odd')
})
```

Notez que nous utilisons `cloneDeep` pour cloner la configuration du store avant de créer un store avec lui. C'est parce que Vuex fait muter l'option d'options utilisé pour créer le store. Pour s'assurer que nous avons un store propre dans chaque test nous devons cloner l'objet `storeConfig`.

Cependant, `cloneDeep` n'est pas assez "profond" pour clone également des modules dans le store. Si notre `storeConfig` inclut des modules, nous devez passer par un objet à `new Vuex.Store()`, comme cela :

```js
import myModule from './myModule'
// ...
const store = new Vuex.Store({ modules: { myModule: cloneDeep(myModule) } })
```

### Les Ressources

- [Exemple de projet pour tester les composants](https://github.com/eddyerburgh/vue-test-utils-vuex-example)
- [Exemple de projet pour tester le store](https://github.com/eddyerburgh/testing-vuex-store-example)
- [`localVue`](../api/options.md#localvue)
- [`createLocalVue`](../api/createLocalVue.md)

## Bibliothèques utiles pour les tests

Vue Test Utils fournit des méthodes pour tester les composants de Vue. Les membres de la communauté ont également écrit quelques bibliothèques supplémentaires qui soit étendent les `vue-test-utils` avec des méthodes supplémentaires utiles, soit fournissent des outils pour tester d'autres choses trouvées dans les applications Vue.

### Bibliothèque de test de Vue

[Vue Testing Library](https://github.com/testing-library/vue-testing-library) est un ensemble d'outils visant à tester les composants sans se fier aux détails de la mise en œuvre. Conçu dans un souci d'accessibilité, son approche permet également de remanier facilement les composants.


It is built on top of Vue Test Utils.
Il est construit à partir de Vue Test Utils.

### `vuex-mock-store`

[`vuex-mock-store`](https://github.com/posva/vuex-mock-store) fournit un magasin fictif simple et direct pour simplifier le test des composants consommant un magasin Vuex.

### `jest-matcher-vue-test-utils`

[`jest-matcher-vue-test-utils`](https://github.com/hmsk/jest-matcher-vue-test-utils) ajoute des matchers supplémentaires pour le testeur Jest dans le but de rendre les assertions plus expressives.

### `jest-mock-axios`

[`jest-mock-axios`](https://github.com/knee-cola/jest-mock-axios) vous permet de simuler facilement `axios`, un client HTTP commun, dans vos tests. Il fonctionne d'emblée avec Jest, et l'auteur fournit des conseils sur le support d'autres lanceurs de test dans la documentation.
