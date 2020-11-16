(window.webpackJsonp=window.webpackJsonp||[]).push([[88],{440:function(e,s,t){"use strict";t.r(s);var a=t(42),n=Object(a.a)({},(function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"node-js-native-esm-support"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#node-js-native-esm-support"}},[e._v("#")]),e._v(" NODE.JS NATIVE ESM SUPPORT")]),e._v(" "),t("blockquote",[t("p",[e._v("Nouveau dans v7.1.0")])]),e._v(" "),t("p",[e._v("Mocha vous permet de passer vos tests sous forme de modules ES, et pas seulement en utilisant CommonJS. Par exemple :")]),e._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// test.mjs")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("import")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("add"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("from")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v("'./add.mjs'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("import")]),e._v(" assert "),t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("from")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v("'assert'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("it")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[e._v("'should add to numbers from an es module'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=>")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  assert"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("equal")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("add")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[e._v("3")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[e._v("5")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[e._v("8")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n")])])]),t("p",[e._v("Pour cela, vous n'avez pas besoin de faire quoi que ce soit de spécial. Rédigez votre dossier de test en tant que module ES. Dans Node.js, cela signifie soit terminer le fichier avec une extension "),t("code",[e._v(".mjs")]),e._v(", soit, si vous voulez utiliser l'extension "),t("code",[e._v(".js")]),e._v(" normale, en ajoutant "),t("code",[e._v('"type" : "module"')]),e._v(" à votre "),t("code",[e._v("package.json")]),e._v(". Vous trouverez plus d'informations dans la documentation de Node.js.")]),e._v(" "),t("blockquote",[t("p",[e._v("Mocha supporte les modules ES uniquement à partir de Node.js v12.11.0 et plus. Pour l'activer dans les versions inférieures à 13.2.0, vous devez ajouter des "),t("code",[e._v("--experimental-modules")]),e._v(" lors de l'exécution de Mocha. À partir de la version 13.2.0 de Node.js, vous pouvez utiliser les modules ES sans aucun drapeau. (Mocha chargera ESM même dans Node v10, mais ce n'est pas officiellement pris en charge. A utiliser à vos propres risques).")])]),e._v(" "),t("h2",{attrs:{id:"limitations-actuelles"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#limitations-actuelles"}},[e._v("#")]),e._v(" LIMITATIONS ACTUELLES")]),e._v(" "),t("p",[e._v("Le support ESM natif de Node.JS a toujours un statut :  "),t("strong",[e._v("Stability: 1 - Experimental")])]),e._v(" "),t("p",[t("a",{attrs:{href:"https://mochajs.org/#-watch-w",target:"_blank",rel:"noopener noreferrer"}},[e._v("Watch mode"),t("OutboundLink")],1),e._v(" ne prend pas en charge les fichiers de test du module ES\n"),t("a",{attrs:{href:"https://mochajs.org/#third-party-reporters",target:"_blank",rel:"noopener noreferrer"}},[e._v("Custom reporters"),t("OutboundLink")],1),e._v(" et "),t("a",{attrs:{href:"https://mochajs.org/#interfaces",target:"_blank",rel:"noopener noreferrer"}},[e._v("custom interfaces"),t("OutboundLink")],1),e._v(" ne peuvent être que des fichiers CommonJS\n"),t("a",{attrs:{href:"https://mochajs.org/#configuring-mocha-nodejs",target:"_blank",rel:"noopener noreferrer"}},[e._v("Configuration file"),t("OutboundLink")],1),e._v(" ne peut être qu'un fichier CommonJS ("),t("code",[e._v(".mocharc.js")]),e._v(" ou ."),t("code",[e._v("mocharc.cjs")]),e._v(")\nLorsque vous utilisez des modules fantaisie via des librairies comme "),t("code",[e._v("proxyquire")]),e._v(", "),t("code",[e._v("rewiremock")]),e._v(" ou "),t("code",[e._v("rewire")]),e._v(", n'utilisez pas les modules ES pour vos fichiers de test\nLe support ESM natif de Node.JS ne fonctionne pas avec le module esm")])])}),[],!1,null,null,null);s.default=n.exports}}]);