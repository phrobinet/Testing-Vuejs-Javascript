(window.webpackJsonp=window.webpackJsonp||[]).push([[128],{481:function(e,t,s){"use strict";s.r(t);var a=s(42),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"installation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[e._v("#")]),e._v(" Installation")]),e._v(" "),s("h2",{attrs:{id:"version-semantique"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#version-semantique"}},[e._v("#")]),e._v(" Version sémantique")]),e._v(" "),s("p",[e._v("Vue Test Utils suit "),s("a",{attrs:{href:"https://semver.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Semantic Versioning"),s("OutboundLink")],1),e._v(" dans tous ses projets officiels pour les fonctionnalités et le comportement documentés. Pour les comportements non documentés ou les internes exposés, les changements sont décrits dans les "),s("a",{attrs:{href:"https://github.com/vuejs/vue-test-utils/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("notes de version"),s("OutboundLink")],1),e._v(".")]),e._v(" "),s("h2",{attrs:{id:"utilisation-des-outils-de-vue-test-utils-avec-jest-recommande"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#utilisation-des-outils-de-vue-test-utils-avec-jest-recommande"}},[e._v("#")]),e._v(" Utilisation des outils de Vue Test Utils avec Jest (recommandé)")]),e._v(" "),s("p",[e._v("Jest est un outil de test développé par Facebook, visant à fournir une solution de test unitaire sur batterie. Vous pouvez en savoir plus sur Jest en consultant sa "),s("a",{attrs:{href:"https://jestjs.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("documentation officielle"),s("OutboundLink")],1),e._v(".\nJest is a test runner developed by Facebook, aiming to deliver a battery-included unit testing solution. You can learn more about Jest on its "),s("a",{attrs:{href:"https://jestjs.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("official documentation"),s("OutboundLink")],1),e._v(".")]),e._v(" "),s("div",{staticClass:"vueschool"},[s("a",{attrs:{href:"https://vueschool.io/courses/learn-how-to-test-vuejs-components?friend=vuejs",target:"_blank",rel:"sponsored noopener",title:"Learn how to use Jest and Vue Test Utils to test Single File Components with Vue School"}},[e._v("Apprenez comment utiliser Jest pour tester les composants à fichier unique avec Vue School")])]),e._v(" "),s("p",[e._v("Si vous utilisez le CLI de Vue pour construire votre projet, vous pouvez utiliser le plugin "),s("a",{attrs:{href:"https://cli.vuejs.org/core-plugins/unit-jest.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("cli-plugin-unit-jest"),s("OutboundLink")],1),e._v(" pour effectuer des tests Jest.")]),e._v(" "),s("p",[e._v("Après avoir configuré Jest, la première chose à faire est d'installer Vue Test Utils et "),s("a",{attrs:{href:"https://github.com/vuejs/vue-jest",target:"_blank",rel:"noopener noreferrer"}},[s("code",[e._v("vue-jest")]),s("OutboundLink")],1),e._v(" pour traiter les mono-fichiers.")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" --save-dev @vue/test-utils vue-jest\n")])])]),s("p",[e._v("Ensuite, vous devez dire à Jest de transformer les fichiers "),s("code",[e._v(".vue")]),e._v(" en utilisant "),s("code",[e._v(".vu-jest")]),e._v(". Vous pouvez le faire en ajoutant la configuration suivante dans le "),s("code",[e._v("package.json")]),e._v(" ou dans un "),s("a",{attrs:{href:"https://jestjs.io/docs/en/configuration",target:"_blank",rel:"noopener noreferrer"}},[e._v("fichier de configuration de Jest"),s("OutboundLink")],1),e._v(" :")]),e._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"jest"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"moduleFileExtensions"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"js"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"json"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// dire à Jest de gérer les fichiers `*.vue`")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"vue"')]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"transform"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// traiter les fichiers `*.vue` avec `vue-jest`")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('".*\\\\.(vue)$"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"vue-jest"')]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),s("blockquote",[s("p",[s("strong",[e._v("Notez:")]),e._v(" Si vous utilisez Babel 7 ou supérieur, vous devez ajouter "),s("a",{attrs:{href:"https://github.com/babel/babel-bridge",target:"_blank",rel:"noopener noreferrer"}},[e._v("babel-bridge"),s("OutboundLink")],1),e._v(" à vos devDependencies ("),s("code",[e._v("$ npm install --save-dev babel-core@^7.0.0-bridge.0")]),e._v(").")])]),e._v(" "),s("h3",{attrs:{id:"gestion-des-alias-de-webpack"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#gestion-des-alias-de-webpack"}},[e._v("#")]),e._v(" Gestion des alias de webpack")]),e._v(" "),s("p",[e._v("Si vous utilisez un alias de résolution dans la configuration du webpack, par exemple l'alias "),s("code",[e._v("@")]),e._v(" vers "),s("code",[e._v("/src")]),e._v(", vous devez ajouter une configuration correspondante pour Jest également, en utilisant l'option "),s("code",[e._v("moduleNameMapper")]),e._v(" :")]),e._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"jest"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// suportent le même@ -> cartographie des alias src dans le code source")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"moduleNameMapper"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"^@/(.*)$"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"<rootDir>/src/$1"')]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),s("h3",{attrs:{id:"couverture-du-code"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#couverture-du-code"}},[e._v("#")]),e._v(" Couverture du code")]),e._v(" "),s("p",[e._v("Jest peut être utilisé pour générer des rapports de couverture dans plusieurs formats. Voici un exemple simple pour commencer :")]),e._v(" "),s("p",[e._v("Développez votre configuration de "),s("code",[e._v("jest")]),e._v(" avec l'option "),s("a",{attrs:{href:"https://jestjs.io/docs/en/configuration#collectcoverage-boolean",target:"_blank",rel:"noopener noreferrer"}},[s("code",[e._v("collectCoverage")]),s("OutboundLink")],1),e._v(", puis ajoutez le tableau "),s("a",{attrs:{href:"https://jestjs.io/docs/en/configuration#collectcoveragefrom-array",target:"_blank",rel:"noopener noreferrer"}},[s("code",[e._v("collectCoverageFrom")]),s("OutboundLink")],1),e._v(" pour définir les fichiers pour lesquels les informations de couverture doivent être collectées.")]),e._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"jest"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"collectCoverage"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[e._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"collectCoverageFrom"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"**/*.{js,vue}"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"!**/node_modules/**"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),s("p",[e._v("Cela permettra d'établir des rapports de couverture avec les "),s("a",{attrs:{href:"https://jestjs.io/docs/en/configuration#coveragereporters-array-string",target:"_blank",rel:"noopener noreferrer"}},[e._v("déclarants de couverture par défaut"),s("OutboundLink")],1),e._v(". Vous trouverez une documentation supplémentaire dans la "),s("a",{attrs:{href:"https://jestjs.io/docs/en/configuration#collectcoverage-boolean",target:"_blank",rel:"noopener noreferrer"}},[e._v("documentation de configuration de Jest"),s("OutboundLink")],1),e._v(", où vous trouverez des options pour les seuils de couverture, les répertoires de sortie cibles, etc.")]),e._v(" "),s("h2",{attrs:{id:"utilisation-d-autres-testeurs"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#utilisation-d-autres-testeurs"}},[e._v("#")]),e._v(" Utilisation d'autres testeurs")]),e._v(" "),s("h3",{attrs:{id:"fonctionnement-de-vue-test-utils-avec-karma"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#fonctionnement-de-vue-test-utils-avec-karma"}},[e._v("#")]),e._v(" Fonctionnement de Vue Test Utils avec Karma")]),e._v(" "),s("p",[s("a",{attrs:{href:"http://karma-runner.github.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Karma"),s("OutboundLink")],1),e._v(" est un programme de test qui lance des navigateurs, effectue des tests et nous les rapporte.")]),e._v(" "),s("p",[e._v("En plus de Karma, vous pouvez utiliser le cadre "),s("a",{attrs:{href:"https://mochajs.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Mocha"),s("OutboundLink")],1),e._v(" pour écrire les tests, et la bibliothèque "),s("a",{attrs:{href:"http://chaijs.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Chai"),s("OutboundLink")],1),e._v(" pour les assertions des tests. Vous pouvez également consulter "),s("a",{attrs:{href:"http://sinonjs.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Sinon"),s("OutboundLink")],1),e._v(" pour créer des spies et des stubs")]),e._v(" "),s("p",[e._v("Vous trouverez ci-dessous une configuration de base de Karma pour Vue Test Utils :")]),e._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// karma.conf.js")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("var")]),e._v(" webpackConfig "),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'./webpack.config.js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[e._v("exports")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[e._v("config")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  config"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("set")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    frameworks"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'mocha'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    files"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'test/**/*.spec.js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    webpack"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" webpackConfig"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    reporters"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'spec'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    browsers"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'Chrome'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    preprocessors"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'**/*.spec.js'")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'webpack'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'sourcemap'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),s("h3",{attrs:{id:"fonctionnement-de-vue-test-utils-avec-mocha-webpack"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#fonctionnement-de-vue-test-utils-avec-mocha-webpack"}},[e._v("#")]),e._v(" Fonctionnement de Vue Test Utils avec mocha-webpack")]),e._v(" "),s("p",[e._v("Une autre stratégie pour tests les SFC consiste à compiler tous nos tests via la webpack et à les exécuter ensuite dans un testeur. L'avantage de cette approche est qu'elle nous donne un support complet pour toutes les fonctionnalités du webpack et du "),s("code",[e._v("vue-loader")]),e._v(", donc nous n'avons pas à faire de compromis dans notre code source.")]),e._v(" "),s("p",[e._v("Nous avons trouvé "),s("a",{attrs:{href:"https://github.com/sysgears/mochapack",target:"_blank",rel:"noopener noreferrer"}},[s("code",[e._v("mochapack")]),s("OutboundLink")],1),e._v(" qui nous offre une expérience très simplifiée pour cette tâche particulière.")]),e._v(" "),s("p",[e._v("La première chose à faire est d'installer des dépendances de test :")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" --save-dev @vue/test-utils mocha mochapack\n")])])]),s("p",[e._v("Après avoir installer Vue Test Utils et "),s("code",[e._v("mochapack")]),e._v(", vous devez définir un script de test dans votre "),s("code",[e._v("package.json")]),e._v(" :")]),e._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// package.json")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"scripts"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"test"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"mochapack --webpack-config webpack.config.js --require test/setup.js test/**/*.spec.js"')]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),s("h3",{attrs:{id:"fonctionnement-de-vue-test-utils-sans-etape-de-construction"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#fonctionnement-de-vue-test-utils-sans-etape-de-construction"}},[e._v("#")]),e._v(" Fonctionnement de Vue Test Utils sans étape de construction")]),e._v(" "),s("p",[e._v("Alors qu'il est courant de construire des applications Vue en utilisant des outils tels que "),s("a",{attrs:{href:"https://webpack.js.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("webpack"),s("OutboundLink")],1),e._v(" pour regrouper l'application, "),s("code",[e._v("vue-loader")]),e._v(" pour exploiter les composants de fichiers uniques, il est possible d'uiliser beaucoup moins les Vue Test Utils . Les exigences minimales pour les Vue Test Utils, en dehors de la bibliothèque elle-même, sont les suivantes :")]),e._v(" "),s("ul",[s("li",[e._v("Vue")]),e._v(" "),s("li",[s("a",{attrs:{href:"https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler#readme",target:"_blank",rel:"noopener noreferrer"}},[e._v("vue-template-compiler"),s("OutboundLink")],1)]),e._v(" "),s("li",[e._v("a DOM (be it "),s("a",{attrs:{href:"https://github.com/jsdom/jsdom",target:"_blank",rel:"noopener noreferrer"}},[e._v("jsdom"),s("OutboundLink")],1),e._v(" in a Node environment, or the DOM in a real browser)")])]),e._v(" "),s("p",[e._v("Notez que "),s("code",[e._v("jsdom")]),e._v("(ou toute autre implémentation de DOM) doit être requis avant les Vue Test Utils, car il s'attend à ce qu'un DOM (vrai DOM, ou JSDOM) existe.\nNotice that "),s("code",[e._v("jsdom")]),e._v("(or any other DOM implementation) must be required before Vue Test Utils, because it expects a DOM (real DOM, or JSDOM) to exist.")])])}),[],!1,null,null,null);t.default=n.exports}}]);