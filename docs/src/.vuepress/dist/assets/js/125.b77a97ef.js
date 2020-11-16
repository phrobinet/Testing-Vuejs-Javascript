(window.webpackJsonp=window.webpackJsonp||[]).push([[125],{478:function(t,s,e){"use strict";e.r(s);var a=e(42),n=Object(a.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h2",{attrs:{id:"utilisation-de-vue-router"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#utilisation-de-vue-router"}},[t._v("#")]),t._v(" Utilisation de Vue Router")]),t._v(" "),e("h3",{attrs:{id:"installation-de-vue-router-dans-les-tests"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#installation-de-vue-router-dans-les-tests"}},[t._v("#")]),t._v(" Installation de Vue Router dans les tests")]),t._v(" "),e("p",[t._v("Vous ne devez jamais installer Vue Router sur le constructeur de base de Vue lors de tests. L'installation de Vue Router ajoute "),e("code",[t._v("$route")]),t._v(" et "),e("code",[t._v("$router")]),t._v(" comme propriétés en lecture seule sur le prototype Vue.")]),t._v(" "),e("p",[t._v('Pour éviter cela, on peut créer un "localVue", et installer Vue Router dessus.')]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" shallowMount"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" createLocalVue "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@vue/test-utils'")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" VueRouter "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'vue-router'")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" localVue "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("createLocalVue")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nlocalVue"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("VueRouter"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" router "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("VueRouter")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("shallowMount")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Component"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  localVue"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  router\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("blockquote",[e("p",[e("strong",[t._v("Note:")]),t._v(" L'installation de Vue Router sur une "),e("code",[t._v("localVue")]),t._v(" ajoute également "),e("code",[t._v("$route")]),t._v(" et "),e("code",[t._v("$router")]),t._v(" comme propriétés en lecture seule à une "),e("code",[t._v("localVue")]),t._v(". Cela signifie que vous ne pouvez pas utiliser l'option "),e("code",[t._v("mocks")]),t._v(" pour écraser "),e("code",[t._v("$route")]),t._v(" et "),e("code",[t._v("$router")]),t._v(" lors du montage d'un composant utilisant une "),e("code",[t._v("localVue")]),t._v(" avec Vue Router installé.")])]),t._v(" "),e("h3",{attrs:{id:"tester-les-composants-qui-utilisent-router-link-ou-router-view"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#tester-les-composants-qui-utilisent-router-link-ou-router-view"}},[t._v("#")]),t._v(" Tester les composants qui utilisent "),e("code",[t._v("router-link")]),t._v(" ou "),e("code",[t._v("router-view")])]),t._v(" "),e("p",[t._v("Lorsque vous installez Vue Router, les composants "),e("code",[t._v("router-link")]),t._v(" et "),e("code",[t._v("router-view")]),t._v(" sont enregistrés. Cela signifie que nous pouvons les utiliser n'importe où dans notre application sans avoir besoin de les importer.")]),t._v(" "),e("p",[t._v("Lorsque nous effectuons des tests, nous devons mettre ces composants de Vue Router à la disposition du composant que nous montons. Il existe deux méthodes pour ce faire.")]),t._v(" "),e("h3",{attrs:{id:"utiliser-les-stubs"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#utiliser-les-stubs"}},[t._v("#")]),t._v(" Utiliser les stubs")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" shallowMount "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@vue/test-utils'")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("shallowMount")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Component"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  stubs"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'router-link'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'router-view'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("h3",{attrs:{id:"installer-vue-router-avec-localvue"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#installer-vue-router-avec-localvue"}},[t._v("#")]),t._v(" Installer Vue Router avec localVue")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" shallowMount"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" createLocalVue "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@vue/test-utils'")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" VueRouter "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'vue-router'")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" localVue "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("createLocalVue")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nlocalVue"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("VueRouter"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("shallowMount")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Component"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  localVue\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("h3",{attrs:{id:"simuler-route-et-router"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#simuler-route-et-router"}},[t._v("#")]),t._v(" Simuler "),e("code",[t._v("$route")]),t._v(" et "),e("code",[t._v("$router")])]),t._v(" "),e("p",[t._v("Parfois, vous voulez tester qu'un composant fait quelque chose avec les paramètres des objets "),e("code",[t._v("$route")]),t._v(" et "),e("code",[t._v("$routeur")]),t._v(". Pour ce faire, vous pouvez passer des simulations personnalisées à l'instance Vue.")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" shallowMount "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@vue/test-utils'")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" $route "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  path"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/some/path'")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" wrapper "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("shallowMount")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Component"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  mocks"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    $route\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nwrapper"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("vm"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$route"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("path "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// /some/path")]),t._v("\n")])])]),e("h3",{attrs:{id:"les-gotchas-commun"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#les-gotchas-commun"}},[t._v("#")]),t._v(" Les gotchas commun")]),t._v(" "),e("p",[t._v("L'installation de Vue Router ajoute "),e("code",[t._v("$route")]),t._v(" et "),e("code",[t._v("$router")]),t._v(" comme propriétés en lecture seule sur le prototype de Vue.")]),t._v(" "),e("p",[t._v("Cela signifie que tous les futurs tests qui tenteront de simuler "),e("code",[t._v("$route")]),t._v(" et "),e("code",[t._v("$router")]),t._v(" echoueront")]),t._v(" "),e("p",[t._v("Pour éviter cela, n'installez jamais Vue Router globalement lorsque vous effectuez des tests; utilisez un "),e("code",[t._v("localVue")]),t._v(" comme détaillé ci-dessus.")])])}),[],!1,null,null,null);s.default=n.exports}}]);