(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{455:function(s,t,e){"use strict";e.r(t);var a=e(42),n=Object(a.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h2",{attrs:{id:"config"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#config"}},[s._v("#")]),s._v(" Config")]),s._v(" "),e("p",[s._v("Vue Test Utils comprend un objet de configuration des options définies utilisées par Vue Test Utils.")]),s._v(" "),e("h3",{attrs:{id:"vue-test-utils-config-options"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue-test-utils-config-options"}},[s._v("#")]),s._v(" Vue Test Utils Config Options")]),s._v(" "),e("h3",{attrs:{id:"showdeprecationwarnings"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#showdeprecationwarnings"}},[s._v("#")]),s._v(" "),e("code",[s._v("showDeprecationWarnings")])]),s._v(" "),e("ul",[e("li",[s._v("type: "),e("code",[s._v("Boolean")])]),s._v(" "),e("li",[s._v("default: "),e("code",[s._v("true")])])]),s._v(" "),e("p",[s._v("Contrôler s'il faut ou non afficher des avertissements de dépréciation . Lorsqu'il est sur "),e("code",[s._v("true")]),s._v(", tous les avertissements de déprédation sont visibles dans la console.")]),s._v(" "),e("p",[s._v("Exemple:")]),s._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" config "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@vue/test-utils'")]),s._v("\n\nconfig"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("showDeprecationWarnings "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),s._v("\n")])])]),e("h3",{attrs:{id:"stubs"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#stubs"}},[s._v("#")]),s._v(" "),e("code",[s._v("stubs")])]),s._v(" "),e("ul",[e("li",[s._v("type: "),e("code",[s._v("{ [name: string]: Component | boolean | string }")])]),s._v(" "),e("li",[s._v("default: "),e("code",[s._v("{}")])])]),s._v(" "),e("p",[s._v("Le stub stocké dans "),e("code",[s._v("config.stubs")]),s._v(" est utilisé par défaut.\nLes stubs sont à utiliser dans les composants. Ils sont écrasés par les "),e("code",[s._v("stubs")]),s._v(" passés dans les options de montage.")]),s._v(" "),e("p",[s._v("Lorsque l'on passe des "),e("code",[s._v("stubs")]),s._v(" sous forme de tableau dans les options de montage, les "),e("code",[s._v("config.stubs")]),s._v(" sont convertis en un tableau, et vont stuber les composants avec un composant de base qui retourne "),e("code",[s._v("<${component name}-stub>")]),s._v(".")]),s._v(" "),e("p",[s._v("Exemple:")]),s._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" config "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@vue/test-utils'")]),s._v("\n\nconfig"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("stubs"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'my-component'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'<div />'")]),s._v("\n")])])]),e("h3",{attrs:{id:"mocks"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mocks"}},[s._v("#")]),s._v(" "),e("code",[s._v("mocks")])]),s._v(" "),e("ul",[e("li",[s._v("type: "),e("code",[s._v("Object")])]),s._v(" "),e("li",[s._v("default: "),e("code",[s._v("{}")])])]),s._v(" "),e("p",[s._v("Comme pour les "),e("code",[s._v("stubs")]),s._v(", les valeurs passées à "),e("code",[s._v("config.mocks")]),s._v(" sont utilisées par défaut. Toute valeur passées à l'objet d'options de montage "),e("code",[s._v("mocks")]),s._v(" aura la priorité sur celles déclarées dans "),e("code",[s._v("config.mocks")]),s._v(".")]),s._v(" "),e("p",[s._v("Exemple:")]),s._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" config "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@vue/test-utils'")]),s._v("\n\nconfig"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("mocks"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'$store'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  state"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    id"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),e("h3",{attrs:{id:"methods"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#methods"}},[s._v("#")]),s._v(" "),e("code",[s._v("methods")])]),s._v(" "),e("ul",[e("li",[s._v("type: "),e("code",[s._v("{ [name: string]: Function }")])]),s._v(" "),e("li",[s._v("default: "),e("code",[s._v("{}")])])]),s._v(" "),e("p",[s._v("Vous pouvez configurer les méthodes par défaut en utilisant l'objet "),e("code",[s._v("config")]),s._v(". Cela peut être utile pour les plugins qui injectent des méthodes aux composants, comme "),e("a",{attrs:{href:"https://logaretm.github.io/vee-validate/",target:"_blank",rel:"noopener noreferrer"}},[s._v("VeeValidate"),e("OutboundLink")],1),s._v(". Vous pouvez surcharger les méthodes définies dans "),e("code",[s._v("config")]),s._v(" en passant des "),e("code",[s._v("méthodes")]),s._v(" dans les options de montage.")]),s._v(" "),e("p",[s._v("Exemple:")]),s._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" config "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@vue/test-utils'")]),s._v("\n\nconfig"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("methods"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'getData'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),e("h3",{attrs:{id:"provide"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#provide"}},[s._v("#")]),s._v(" "),e("code",[s._v("provide")])]),s._v(" "),e("ul",[e("li",[s._v("type: "),e("code",[s._v("Object")])]),s._v(" "),e("li",[s._v("default: "),e("code",[s._v("{}")])])]),s._v(" "),e("p",[s._v("Like "),e("code",[s._v("stubs")]),s._v(" or "),e("code",[s._v("mocks")]),s._v(", the values passed to "),e("code",[s._v("config.provide")]),s._v(" are used by default. Any values passed to the mounting options "),e("code",[s._v("provide")]),s._v(" object will take priority over the ones declared in "),e("code",[s._v("config.provide")]),s._v(". "),e("strong",[s._v("Please take note that it is not supported to pass a function as "),e("code",[s._v("config.provide")]),s._v(".")]),s._v("\nComme les "),e("code",[s._v("stubs")]),s._v(" ou "),e("code",[s._v("mocks")]),s._v(", les valeurs passées à \"config.provide\" sont utilisées par défaut. Toutes les valeurs passées à l'objet d'options de montage "),e("code",[s._v("provide")]),s._v(" auront la priorité sur celles déclarées dans "),e("code",[s._v("config.provide")]),s._v(". "),e("strong",[s._v("Veuillez noter qu'il n'est pas possible de passer une fonction comme "),e("code",[s._v("config.provide")]),s._v(".")])]),s._v(" "),e("p",[s._v("Exemple:")]),s._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" config "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@vue/test-utils'")]),s._v("\n\nconfig"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("provide"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'$logger'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token function-variable function"}},[s._v("log")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("args")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    console"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("args"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),e("h3",{attrs:{id:"silent"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#silent"}},[s._v("#")]),s._v(" "),e("code",[s._v("silent")])]),s._v(" "),e("ul",[e("li",[s._v("type: "),e("code",[s._v("Boolean")])]),s._v(" "),e("li",[s._v("default: "),e("code",[s._v("true")])])]),s._v(" "),e("p",[s._v("Il supprime les avertissements déclenchés par Vue tout en mettant en veille les éléments observables (par exemple les props). Lorsqu'il est réglé sur "),e("code",[s._v("false")]),s._v(", tous les avertissements sont visibles dans la console. C'est une méthode configurable qui repose sur le paramètre "),e("code",[s._v("Vue.config.silent")]),s._v(".")]),s._v(" "),e("p",[s._v("Exemple:")]),s._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" config "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@vue/test-utils'")]),s._v("\n\nconfig"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("silent "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),s._v("\n")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);