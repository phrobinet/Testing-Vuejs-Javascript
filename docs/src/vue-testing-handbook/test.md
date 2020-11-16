## Les Mutations et les Actions

Le guide précédant traitait du test des composants qui utilisent `$store.state` et `$store.gettres`, qui fournissent tous deux l'état actuel du composant. Lorsque l'affirmation d'un composant commet une mutation ou
The previous guide discussed testing components that use `$store.state` and `$store.getters`, which both provide the current state to the component. When asserting a component correctly commits a mutation or dispatches an action, what we really want to do is assert `$store.commit` and `$store.dispatch` is called with the correct handler (the mutation or action to call) and payload.

There are two ways to go about this. One is to use a real Vuex store with `createLocalVue`, and another is to use a mock store. Both these techniques are demonstrated [here](https://lmiller1990.github.io/vue-testing-handbook/vuex-in-components.html). Let's see them again, in the context of mutations and actions.

The source code for the test described on this page can be found [here](https://github.com/lmiller1990/vue-testing-handbook/tree/master/demo-app/tests/unit/ComponentWithButtons.spec.js).

## Creating the Component

For these examples, we will test a `<ComponentWithButtons>` component:

```vue
<template>
  <div>
    <button
      class="commit"
      @click="handleCommit">
      Commit
    </button>

    <button
      class="dispatch"
      @click="handleDispatch">
      Dispatch
    </button>

    <button
      class="namespaced-dispatch"
      @click="handleNamespacedDispatch">
      Namespaced Dispatch
    </button>
  </div>
</template>

<script>
export default {
  name: "ComponentWithButtons",

  methods: {
    handleCommit() {
      this.$store.commit("testMutation", { msg: "Test Commit" })
    },

    handleDispatch() {
      this.$store.dispatch("testAction", { msg: "Test Dispatch" })
    },

    handleNamespacedDispatch() {
      this.$store.dispatch("namespaced/very/deeply/testAction", { msg: "Test Namespaced Dispatch" })
    }
  }
}
</script>
```
