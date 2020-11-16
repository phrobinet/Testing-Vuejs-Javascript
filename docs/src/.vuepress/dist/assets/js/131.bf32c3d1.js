(window.webpackJsonp=window.webpackJsonp||[]).push([[131],{484:function(e,t,s){"use strict";s.r(t);var r=s(42),a=Object(r.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h2",{attrs:{id:"utilisation-des-outils-de-vue-test-utils-avec-jest-recommande"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#utilisation-des-outils-de-vue-test-utils-avec-jest-recommande"}},[e._v("#")]),e._v(" Utilisation des outils de Vue Test Utils avec Jest (recommandé)")]),e._v(" "),s("p",[e._v("Jest est un outils de test développé par Facebook, visant à fournir une solution de test unitaire sur batterie. Vous pouvez en savoir plus sur Jest en consultant sa "),s("a",{attrs:{href:"https://jestjs.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("documentation officielle"),s("OutboundLink")],1),e._v(".\nJest is a test runner developed by Facebook, aiming to deliver a battery-included unit testing solution. You can learn more about Jest on its "),s("a",{attrs:{href:"https://jestjs.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("official documentation"),s("OutboundLink")],1),e._v(".")]),e._v(" "),s("div",{staticClass:"vueschool"},[s("a",{attrs:{href:"https://vueschool.io/courses/learn-how-to-test-vuejs-components?friend=vuejs",target:"_blank",rel:"sponsored noopener",title:"Learn how to use Jest and Vue Test Utils to test Single File Components with Vue School"}},[e._v("Apprenez comment utiliser Jest pour tester les composants à fichier unique avec Vue School")])]),e._v(" "),s("p",[e._v("Si vous utilisez le CLI de Vue pour construire votre projet, vous pouvez utiliser le plugin "),s("a",{attrs:{href:"https://cli.vuejs.org/core-plugins/unit-jest.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("cli-plugin-unit-jest"),s("OutboundLink")],1),e._v(" pour effectuer des tests Jest.")]),e._v(" "),s("p",[e._v("Après avoir configuré Jest, la première chose à faire est d'installer Vue Test Utils et "),s("a",{attrs:{href:"https://github.com/vuejs/vue-jest",target:"_blank",rel:"noopener noreferrer"}},[s("code",[e._v("vue-jest")]),s("OutboundLink")],1),e._v(" pour traiter les mono-fichiers.")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" --save-dev @vue/test-utils vue-jest\n")])])]),s("p",[e._v("Ensuite, vous devez dire à Jest de transformer les fichiers "),s("code",[e._v(".vue")]),e._v(" en utilisant "),s("code",[e._v(".vu-jest")]),e._v(". Vous pouvez le faire en ajoutant la configuration suivante dans le "),s("code",[e._v("package.json")]),e._v(" ou dans un "),s("a",{attrs:{href:"https://jestjs.io/docs/en/configuration",target:"_blank",rel:"noopener noreferrer"}},[e._v("fichier de configuration de Jest"),s("OutboundLink")],1),e._v(" :")]),e._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"jest"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"moduleFileExtensions"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"js"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"json"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// dire à Jest de gérer les fichiers `*.vue`")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"vue"')]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"transform"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// traiter les fichiers `*.vue` avec `vue-jest`")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('".*\\\\.(vue)$"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"vue-jest"')]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),s("blockquote",[s("p",[s("strong",[e._v("Notez:")]),e._v(" Si vous utilisez Babel 7 ou suppérieur, vous devez ajouter "),s("a",{attrs:{href:"https://github.com/babel/babel-bridge",target:"_blank",rel:"noopener noreferrer"}},[e._v("babel-bridge"),s("OutboundLink")],1),e._v(" à vos devDependencies ("),s("code",[e._v("$ npm install --save-dev babel-core@^7.0.0-bridge.0")]),e._v(").")])]),e._v(" "),s("h3",{attrs:{id:"gestion-des-alias-de-webpack"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#gestion-des-alias-de-webpack"}},[e._v("#")]),e._v(" Gestion des alias de webpack")]),e._v(" "),s("p",[e._v("Si vous utilisez un alias de résolution dans la configuration du webpack, par exemple l'alias "),s("code",[e._v("@")]),e._v(" vers "),s("code",[e._v("/src")]),e._v(", vous devez ajouter une configuration correspondante pour Jest également, en utilisant l'option "),s("code",[e._v("moduleNameMapper")]),e._v(" :")]),e._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"jest"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// suportent le même@ -> cartographie des alias src dans le code source")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"moduleNameMapper"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"^@/(.*)$"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"<rootDir>/src/$1"')]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),s("h3",{attrs:{id:"couverture-du-code"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#couverture-du-code"}},[e._v("#")]),e._v(" Couverture du code")]),e._v(" "),s("p",[e._v("Jest peut être utilisé pour générer des rapports de couverture dans plusieur formats. Voici un exemple simple pour commencer :")]),e._v(" "),s("p",[e._v("Développez votre configuration de "),s("code",[e._v("jest")]),e._v(" avec l'option "),s("a",{attrs:{href:"https://jestjs.io/docs/en/configuration#collectcoverage-boolean",target:"_blank",rel:"noopener noreferrer"}},[s("code",[e._v("collectCoverage")]),s("OutboundLink")],1),e._v(", puis ajoutez le tableau "),s("a",{attrs:{href:"https://jestjs.io/docs/en/configuration#collectcoveragefrom-array",target:"_blank",rel:"noopener noreferrer"}},[s("code",[e._v("collectCoverageFrom")]),s("OutboundLink")],1),e._v(" pour définir les fichiers pour lesquels les informations de couverture doivent être collectées.")]),e._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"jest"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"collectCoverage"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[e._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"collectCoverageFrom"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"**/*.{js,vue}"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"!**/node_modules/**"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),s("p",[e._v("Cela permettera d'établir des rapports de couverture avec les "),s("a",{attrs:{href:"https://jestjs.io/docs/en/configuration#coveragereporters-array-string",target:"_blank",rel:"noopener noreferrer"}},[e._v("declarants de couverture par défaut"),s("OutboundLink")],1),e._v(". Vous trouverez une documentation supplémentaire dans la "),s("a",{attrs:{href:"https://jestjs.io/docs/en/configuration#collectcoverage-boolean",target:"_blank",rel:"noopener noreferrer"}},[e._v("documentation de configuration de Jest"),s("OutboundLink")],1),e._v(", où vous trouverez des options pour les seuils de couverture, les répertoires de sortie ciles, etc.")])])}),[],!1,null,null,null);t.default=a.exports}}]);