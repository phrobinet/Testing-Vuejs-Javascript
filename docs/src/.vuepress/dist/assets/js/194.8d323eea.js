(window.webpackJsonp=window.webpackJsonp||[]).push([[194],{545:function(t,s,n){"use strict";n.r(s);var a=n(42),e=Object(a.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h2",{attrs:{id:"test-des-evenements-emis"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#test-des-evenements-emis"}},[t._v("#")]),t._v(" Test des événements émis")]),t._v(" "),n("p",[t._v("Le nombre de composants augmente au fur et à mesure que les applications se développent. Lorsque ces composants ont besoin de partager des données, les composants enfants peuvent "),n("a",{attrs:{href:"https://vuejs.org/v2/api/#vm-emit",target:"_blank",rel:"noopener noreferrer"}},[t._v("émettre"),n("OutboundLink")],1),t._v(" un événement, et le composant parent répond.")]),t._v(" "),n("p",[n("code",[t._v("vue-test-utils")]),t._v(" fournit une API "),n("code",[t._v("emitted")]),t._v(" qui nous permet de faire des affirmations sur les événements émis. La documentation relative à "),n("code",[t._v("emitted")]),t._v(" se trouve "),n("RouterLink",{attrs:{to:"/vue-test-utils/wrapper/emitted.html"}},[t._v("ici")]),t._v(".\nLe code source du test décrit sur cette page peut être trouvé "),n("a",{attrs:{href:"https://github.com/lmiller1990/vue-testing-handbook/tree/master/demo-app/tests/unit/Emitter.spec.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("ici"),n("OutboundLink")],1),t._v(".")],1),t._v(" "),n("h2",{attrs:{id:"ecrire-un-composant-et-un-test"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ecrire-un-composant-et-un-test"}},[t._v("#")]),t._v(" Écrire un composant et un test")]),t._v(" "),n("p",[t._v("Construisons un composant simple. Créez un composant "),n("code",[t._v("<Emitter>")]),t._v(" et ajouter le code suivant.")]),t._v(" "),n("div",{staticClass:"language-html extra-class"},[n("pre",{pre:!0,attrs:{class:"language-html"}},[n("code",[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),n("span",{pre:!0,attrs:{class:"token script"}},[n("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    name"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Emitter"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\n    methods"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("emitEvent")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("$emit")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"myEvent"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"name"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"password"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("style")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("scoped")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),n("span",{pre:!0,attrs:{class:"token style"}},[n("span",{pre:!0,attrs:{class:"token language-css"}},[t._v("\n")])]),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("style")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),n("p",[t._v("Ajoutez un test appelé "),n("code",[t._v("emitEvent")]),t._v(" :")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Emitter "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@/components/Emitter.vue"')]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" mount "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@vue/test-utils"')]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("describe")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Emitter"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("it")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"emits an event with two arguments"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" wrapper "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("mount")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Emitter"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n    wrapper"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("vm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("emitEvent")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n    console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("wrapper"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("emitted")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),n("p",[t._v("En utilisant l'"),n("a",{attrs:{href:"https://vue-test-utils.vuejs.org/ja/api/wrapper/emitted.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("emitted API"),n("OutboundLink")],1),t._v(" fournie par "),n("code",[t._v("vue-test-utils")]),t._v(", nous pouvons facilement voir les événements émis.")]),t._v(" "),n("p",[t._v("Lancez le test avec "),n("code",[t._v("yarn test:unit")]),t._v(".")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("PASS  tests/unit/Emitter.spec.js\n● Console\n\n  console.log tests/unit/Emitter.spec.js:10\n    { myEvent: [ [ 'name', 'password' ] ] }\n")])])]),n("h2",{attrs:{id:"la-syntaxe-emise"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#la-syntaxe-emise"}},[t._v("#")]),t._v(" La syntaxe émise")]),t._v(" "),n("p",[n("code",[t._v("emitted")]),t._v(" retourne un objet. Les évènements émis sont sauvés comme propriété de l'objet. Vous pouvez inspecter les évènements en utilisant "),n("code",[t._v("emitted().[event]")]),t._v(":")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("emitted")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("myEvent "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//=>  [ [ 'name', 'password' ] ]")]),t._v("\n")])])]),n("p",[t._v("Essayons d'appeler "),n("code",[t._v("emitEvent")]),t._v(" deux fois.")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("it")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"emits an event with two arguments"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" wrapper "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("mount")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Emitter"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  wrapper"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("vm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("emitEvent")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  wrapper"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("vm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("emitEvent")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("wrapper"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("emitted")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("myEvent"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),n("p",[t._v("Lancez le test avec "),n("code",[t._v("yarn test:unit")]),t._v(".")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("console.log tests/unit/Emitter.spec.js:11\n  [ [ 'name', 'password' ], [ 'name', 'password' ] ]\n")])])]),n("p",[n("code",[t._v("emitted().emitEvent")]),t._v(" renvoie un tableau. La première instance de "),n("code",[t._v("emitEvent")]),t._v(" est accessible en utilisant "),n("code",[t._v("emitted().emitEvent[0]")]),t._v(". Les arguments sont accessibles en utilisant une syntaxe similaire, "),n("code",[t._v("emitted().emitEvent[0][0]")]),t._v(" et ainsi de suite.")]),t._v(" "),n("p",[t._v("Faisons une affirmation réelle contre l'événement émis.")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("it")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"emits an event with two arguments"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" wrapper "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("mount")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Emitter"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  wrapper"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("vm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("emitEvent")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("expect")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("wrapper"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("emitted")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("myEvent"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("toEqual")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"name"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"password"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),n("p",[t._v("Le test passe.")]),t._v(" "),n("h2",{attrs:{id:"tester-les-evenements-sans-monter-le-composant"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#tester-les-evenements-sans-monter-le-composant"}},[t._v("#")]),t._v(" Tester les événements sans monter le composant")]),t._v(" "),n("p",[t._v("Parfois, vous pouvez vouloir tester les événements émis sans avoir à monter le composant. Vous pouvez le faire en utilisant "),n("code",[t._v("call")]),t._v(". Ecrivons un autre test.")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("it")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"emits an event without mounting the component"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" events "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("$emit")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("event"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("args")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" events"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("event"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("args"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  Emitter"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("methods"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("emitEvent")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" $emit "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("expect")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("events"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("myEvent"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("toEqual")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"name"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"password"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),n("p",[t._v("Puisque "),n("code",[t._v("$emit")]),t._v(" est juste un objet JavaScript, vous pouvez simuler un "),n("code",[t._v("$emit")]),t._v(" et en utilisant "),n("code",[t._v("call")]),t._v(" pour l'arracher au contexte de "),n("code",[t._v("this")]),t._v(" de "),n("code",[t._v("$emitEvent")]),t._v(". En utilisant "),n("code",[t._v("call")]),t._v(", vous pouvez appeler une méthode sans monter le composant.")]),t._v(" "),n("p",[t._v("L'utilisation de "),n("code",[t._v("call")]),t._v(" peut être utile dans les situations où vous avez des traitements lourds dans les méthodes de cycle de vie comme "),n("code",[t._v("created")]),t._v(" et "),n("code",[t._v("mounted")]),t._v(" que vous ne voulez pas exécuter. Comme vous ne montez pas le composant, les méthodes de cycle de vie ne sont jamais appelées. Cela peut également être utile lorsque vous voulez manipuler le contexte "),n("code",[t._v("this")]),t._v(" d'une manière spécifique.")]),t._v(" "),n("h2",{attrs:{id:"conclusion"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#conclusion"}},[t._v("#")]),t._v(" Conclusion")]),t._v(" "),n("ul",[n("li",[t._v("L'API "),n("code",[t._v("emitted")]),t._v(" de "),n("code",[t._v("vue-test-utils")]),t._v(" est utilisée pour faire des affirmations sur les événements émis")]),t._v(" "),n("li",[n("code",[t._v("emitted")]),t._v(" est une méthode. Elle renvoie un objet avec des propriétés correspondant aux événements émis")]),t._v(" "),n("li",[t._v("Chaque propriété de "),n("code",[t._v("emitted")]),t._v(" est un tableau. Vous pouvez accéder à chaque instance d'un événement émis en utilisant la syntaxe de tableau "),n("code",[t._v("[0]")]),t._v(", "),n("code",[t._v("[1]")]),t._v(" et")]),t._v(" "),n("li",[t._v("Les arguments des événements émis sont également enregistrés sous forme de tableaux, et peuvent être consultés en utilisant la syntaxe de tableau "),n("code",[t._v("[0]")]),t._v(", "),n("code",[t._v("[1]")]),t._v(".")]),t._v(" "),n("li",[n("code",[t._v("$emit")]),t._v(" can be mocked using "),n("code",[t._v("call")]),t._v(", assertions can be made without rendering the component")]),t._v(" "),n("li",[t._v("On peut simuler des "),n("code",[t._v("$emit")]),t._v(" en utilisant "),n("code",[t._v("call")]),t._v(", on peut faire des affirmations sans rendre le composant")])]),t._v(" "),n("p",[t._v("Le code source du test décrit sur cette page peut être trouvé "),n("a",{attrs:{href:"https://github.com/lmiller1990/vue-testing-handbook/tree/master/demo-app/tests/unit/Emitter.spec.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("ici"),n("OutboundLink")],1),t._v(".")])])}),[],!1,null,null,null);s.default=e.exports}}]);