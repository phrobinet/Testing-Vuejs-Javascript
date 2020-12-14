(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{385:function(t,s,e){"use strict";e.r(s);var a=e(42),n=Object(a.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"les-plugins-de-surveillances"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#les-plugins-de-surveillances"}},[t._v("#")]),t._v(" Les plugins de surveillances")]),t._v(" "),e("p",[t._v("Le système de plugin de montre Jest permet de se connecter à des parties spécifiques de Jest et de définir des invites de menu en mode montre qui exécutent le code sur simple pression d'une touche. Combinées, ces fonctionnalités vous permettent de développer des expériences interactives adaptées à votre flux de travail.")]),t._v(" "),e("h2",{attrs:{id:"watch-plugin-interface"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#watch-plugin-interface"}},[t._v("#")]),t._v(" Watch Plugin Interface")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyWatchPlugin")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Ajouter des crochets aux événements du cycle de vie des Jest")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("apply")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("jestHooks")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Obtenez les informations nécessaires pour les plugins interactifs")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("getUsageInfo")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("globalConfig")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Exécuté lorsque la clé de `getUsageInfo` est entrée")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("run")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("globalConfig"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" updateConfigAndRun")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("h2",{attrs:{id:"hooking-into-jest"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#hooking-into-jest"}},[t._v("#")]),t._v(" Hooking into Jest")]),t._v(" "),e("p",[t._v("Pour connecter votre watch plugin à Jest, ajoutez son chemin sous "),e("code",[t._v("watchPlugins")]),t._v(" dans votre configuration Jest :")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// jest.config.js")]),t._v("\nmodule"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ...")]),t._v("\n  watchPlugins"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'path/to/yourWatchPlugin'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("p",[t._v("Des plugins de surveillance personnalisés peuvent ajouter des accroches aux événements de Jest. Ces accroches peuvent être ajoutées avec ou sans clé interactive dans le menu du mode montre.")]),t._v(" "),e("h3",{attrs:{id:"apply-jesthooks"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#apply-jesthooks"}},[t._v("#")]),t._v(" "),e("code",[t._v("apply(jestHooks)")])]),t._v(" "),e("p",[t._v('Des crochets de bouffon peuvent être attachés en appliquant la méthode "Appliquer". Cette méthode reçoit un argument "jestHooks" qui permet au plugin de s\'accrocher à des parties spécifiques du cycle de vie d\'un test.')]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyWatchPlugin")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("apply")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("jestHooks")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("Vous trouverez ci-dessous les crochets disponibles dans Jest.")]),t._v(" "),e("h4",{attrs:{id:"jesthooks-shouldruntestsuite-testsuiteinfo"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#jesthooks-shouldruntestsuite-testsuiteinfo"}},[t._v("#")]),t._v(" "),e("code",[t._v("jestHooks.shouldRunTestSuite(testSuiteInfo)")])]),t._v(" "),e("p",[t._v("Renvoie un booléen (ou "),e("code",[t._v("Promise<boolean>")]),t._v(" pour la gestion des opérations asynchrones) pour spécifier si un test doit être exécuté ou non.")]),t._v(" "),e("p",[t._v("Par exemple :")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyWatchPlugin")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("apply")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("jestHooks")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    jestHooks"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("shouldRunTestSuite")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("testSuiteInfo")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" testSuiteInfo"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("testPath"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("includes")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'my-keyword'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// or a promise")]),t._v("\n    jestHooks"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("shouldRunTestSuite")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("testSuiteInfo")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" Promise"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("testSuiteInfo"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("testPath"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("includes")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'my-keyword'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("h4",{attrs:{id:"jesthooks-ontestruncomplete-results"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#jesthooks-ontestruncomplete-results"}},[t._v("#")]),t._v(" "),e("code",[t._v("jestHooks.onTestRunComplete(results)")])]),t._v(" "),e("p",[t._v("Il est appelé à la fin de chaque essai. Il a les résultats des tests comme argument.")]),t._v(" "),e("p",[t._v("Par exemple :")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyWatchPlugin")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("apply")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("jestHooks")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    jestHooks"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("onTestRunComplete")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("results")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_hasSnapshotFailure "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" results"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("snapshot"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("failure"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("h4",{attrs:{id:"jesthooks-onfilechange-projects"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#jesthooks-onfilechange-projects"}},[t._v("#")]),t._v(" "),e("code",[t._v("jestHooks.onFileChange({projects})")])]),t._v(" "),e("p",[t._v("Est appelé chaque fois qu'il y a un changement dans le système de fichiers")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("projects: Array<config: ProjectConfig, testPaths: Array<string>")]),t._v(": Comprend tous les parcours de test que Jest surveille.")])]),t._v(" "),e("p",[t._v("Par exemple :")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyWatchPlugin")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("apply")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("jestHooks")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    jestHooks"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("onFileChange")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("projects"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_projects "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" projects"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("h2",{attrs:{id:"watch-menu-integration"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#watch-menu-integration"}},[t._v("#")]),t._v(" Watch Menu Integration")]),t._v(" "),e("p",[t._v('Les plugins de surveillance personnalisés peuvent également ajouter ou remplacer des fonctionnalités au menu de surveillance en spécifiant une paire clé/guide dans la méthode "GetUsageInfo" et une méthode "Run" pour l\'exécution de la clé.')]),t._v(" "),e("h3",{attrs:{id:"getusageinfo-globalconfig"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#getusageinfo-globalconfig"}},[t._v("#")]),t._v(" "),e("code",[t._v("getUsageInfo(globalConfig)")])]),t._v(" "),e("p",[t._v('Pour ajouter une clé au menu de surveillance, implémentez la méthode "getUsageInfo", en retournant une clé et l\'invite :')]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyWatchPlugin")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("getUsageInfo")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("globalConfig")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      key"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'s'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      prompt"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'do something'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("Cela ajoutera une ligne dans le menu du mode surveillance "),e("em",[t._v("("),e("code",[t._v("› Press s to do something.")]),t._v(")")])]),t._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("Watch Usage\n › Press p to filter by a filename regex pattern.\n › Press t to filter by a test name regex pattern.\n › Press q to quit watch mode.\n › Press s to do something. // <-- This is our plugin\n › Press Enter to trigger a test run.\n")])])]),e("p",[e("strong",[t._v("Note")]),t._v(": Si la clé de votre plugin existe déjà en tant que clé par défaut, votre plugin remplacera cette clé.")]),t._v(" "),e("h3",{attrs:{id:"run-globalconfig-updateconfigandrun"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#run-globalconfig-updateconfigandrun"}},[t._v("#")]),t._v(" "),e("code",[t._v("run(globalConfig, updateConfigAndRun)")])]),t._v(" "),e("p",[t._v('Pour gérer les événements de pression de la touche retournée par "GetUsageInfo", vous pouvez implémenter la méthode "run". Cette méthode renvoie un '),e("code",[t._v("Promise<boolean>")]),t._v(' qui peut être résolu lorsque le plugin veut renvoyer le contrôle à Jest. Le "booléen" spécifie si Jest doit relancer les tests après avoir récupéré le contrôle.')]),t._v(" "),e("ul",[e("li",[e("code",[t._v("globalConfig")]),t._v(": Une représentation de la configuration globale actuelle de Jest")]),t._v(" "),e("li",[e("code",[t._v("updateConfigAndRun")]),t._v(": Permet de déclencher un essai pendant que le plugin interactif est en cours d'exécution.")])]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyWatchPlugin")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("run")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("globalConfig"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" updateConfigAndRun")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Faire quelque chose.")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[e("strong",[t._v("Note")]),t._v(": Si vous appelez "),e("code",[t._v("updateConfigAndRun")]),t._v(", votre méthode "),e("code",[t._v("run")]),t._v(" ne devrait pas se résoudre à une valeur de vérité, car cela déclencherait une double exécution.")]),t._v(" "),e("h4",{attrs:{id:"authorized-configuration-keys"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#authorized-configuration-keys"}},[t._v("#")]),t._v(" Authorized configuration keys")]),t._v(" "),e("p",[t._v("Pour des raisons de stabilité et de sécurité, seule une partie des clés de configuration globale peut être mise à jour avec "),e("code",[t._v("updateConfigAndRun")]),t._v(". La liste blanche actuelle est la suivante :")]),t._v(" "),e("ul",[e("li",[e("RouterLink",{attrs:{to:"/jest/Guides/configuration.html#bail-number--boolean"}},[e("code",[t._v("bail")])])],1),t._v(" "),e("li",[e("RouterLink",{attrs:{to:"/jest/Guides/cli.html#--changedsince"}},[e("code",[t._v("changedSince")])])],1),t._v(" "),e("li",[e("RouterLink",{attrs:{to:"/jest/Guides/configuration.html#collectcoverage-boolean"}},[e("code",[t._v("collectCoverage")])])],1),t._v(" "),e("li",[e("RouterLink",{attrs:{to:"/jest/Guides/configuration.html#collectcoveragefrom-array"}},[e("code",[t._v("collectCoverageFrom")])])],1),t._v(" "),e("li",[e("RouterLink",{attrs:{to:"/jest/Guides/configuration.html#collectcoverageonlyfrom-array"}},[e("code",[t._v("collectCoverageOnlyFrom")])])],1),t._v(" "),e("li",[e("RouterLink",{attrs:{to:"/jest/Guides/configuration.html#coveragedirectory-string"}},[e("code",[t._v("coverageDirectory")])])],1),t._v(" "),e("li",[e("RouterLink",{attrs:{to:"/jest/Guides/configuration.html#coveragereporters-arraystring"}},[e("code",[t._v("coverageReporters")])])],1),t._v(" "),e("li",[e("RouterLink",{attrs:{to:"/jest/Guides/configuration.html#notify-boolean"}},[e("code",[t._v("notify")])])],1),t._v(" "),e("li",[e("RouterLink",{attrs:{to:"/jest/Guides/configuration.html#notifymode-string"}},[e("code",[t._v("notifyMode")])])],1),t._v(" "),e("li",[e("RouterLink",{attrs:{to:"/jest/Guides/configuration.html#onlyfailures-boolean"}},[e("code",[t._v("onlyFailures")])])],1),t._v(" "),e("li",[e("RouterLink",{attrs:{to:"/jest/Guides/configuration.html#reporters-arraymodulename--modulename-options"}},[e("code",[t._v("reporters")])])],1),t._v(" "),e("li",[e("RouterLink",{attrs:{to:"/jest/Guides/cli.html#--testnamepatternregex"}},[e("code",[t._v("testNamePattern")])])],1),t._v(" "),e("li",[e("RouterLink",{attrs:{to:"/jest/Guides/cli.html#--testpathpatternregex"}},[e("code",[t._v("testPathPattern")])])],1),t._v(" "),e("li",[e("RouterLink",{attrs:{to:"/jest/Guides/cli.html#--updatesnapshot"}},[e("code",[t._v("updateSnapshot")])])],1),t._v(" "),e("li",[e("RouterLink",{attrs:{to:"/jest/Guides/configuration.html#verbose-boolean"}},[e("code",[t._v("verbose")])])],1)]),t._v(" "),e("h2",{attrs:{id:"customization"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#customization"}},[t._v("#")]),t._v(" Customization")]),t._v(" "),e("p",[t._v("Les plugins peuvent être personnalisés via votre configuration Jest.")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// jest.config.js")]),t._v("\nmodule"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ...")]),t._v("\n  watchPlugins"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'path/to/yourWatchPlugin'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        key"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'k'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// <- your custom key")]),t._v("\n        prompt"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'show a custom prompt'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("p",[t._v("Noms de configuration recommandés :")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("key")]),t._v(": Modifie la clé du plugin.")]),t._v(" "),e("li",[e("code",[t._v("prompt")]),t._v(": Permet à l'utilisateur de personnaliser le texte dans l'invite du plugin.")])]),t._v(" "),e("p",[t._v("Si l'utilisateur a fourni une configuration personnalisée, celle-ci sera passée en argument au constructeur du plugin.")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyWatchPlugin")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("constructor")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("config"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("h2",{attrs:{id:"choisir-une-bonne-cle"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#choisir-une-bonne-cle"}},[t._v("#")]),t._v(" Choisir une bonne clé")]),t._v(" "),e("p",[t._v("Jest permet à des plugins tiers de passer outre certaines de ses touches de fonction intégrées, mais pas toutes. Plus précisément, les touches suivantes sont "),e("strong",[t._v("non écrasables")]),t._v(" :")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("c")]),t._v(" (efface les modèles de filtre)")]),t._v(" "),e("li",[e("code",[t._v("i")]),t._v(" (mise à jour interactives des instantanés non concordants)")]),t._v(" "),e("li",[e("code",[t._v("q")]),t._v(" (quitte)")]),t._v(" "),e("li",[e("code",[t._v("u")]),t._v(" (met à jour tous les instantanés non concordants)")]),t._v(" "),e("li",[e("code",[t._v("w")]),t._v(" (affiche l'utilisation du mode veille / les actions disponibles)")])]),t._v(" "),e("p",[t._v("Les touches suivantes pour les fonctionnalités intégrées "),e("strong",[t._v("peuvent être écrasées")]),t._v(" :")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("p")]),t._v(" (test du modèle de nom de fichier)")]),t._v(" "),e("li",[e("code",[t._v("t")]),t._v(" (nom du modèle de test)")])]),t._v(" "),e("p",[t._v('Toute clé non utilisée par la fonctionnalité intégrée peut être réclamée, comme vous pouvez vous y attendre. Essayez d\'éviter d\'utiliser des touches qui sont difficiles à obtenir sur divers claviers (par exemple "é", "€"), ou qui ne sont pas visibles par défaut (par exemple, de nombreux claviers Mac n\'ont pas d\'indices visuels pour les caractères tels que "'),e("code",[t._v("|")]),t._v(", "),e("code",[t._v("\\")]),t._v(", "),e("code",[t._v("[")]),t._v(", etc.")]),t._v(" "),e("h3",{attrs:{id:"quand-un-conflit-survient"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#quand-un-conflit-survient"}},[t._v("#")]),t._v(" Quand un conflit survient")]),t._v(" "),e("p",[t._v("Si votre plugin tente d'écraser une clé réservée, Jest fera une erreur en affichant un message descriptif, par exemple :")]),t._v(" "),e("blockquote",[e("p",[t._v('Watch plugin YourFaultyPlugin a tenté d\'enregistrer la clé "q", qui est réservée en interne pour quitter le mode surveillance. Veuillez changer la clé de configuration pour ce plugin.')])]),t._v(" "),e("p",[t._v("Il est également interdit aux plugins tiers d'écraser une clé déjà réservée par un autre plugin tiers présent plus tôt dans la liste des plugins configurés (paramètre de tableau "),e("code",[t._v("watchPlugins")]),t._v("). Lorsque cela se produit, vous recevez également un message d'erreur qui tente de vous aider à corriger ce problème :")]),t._v(" "),e("blockquote",[e("p",[t._v("Watch plugins YourFaultyPlugin et TheirFaultyPlugin ont tous deux tenté d'enregistrer la clé "),e("code",[t._v("x")]),t._v(". Veuillez modifier la configuration de la clé pour l'un des plugins en conflit afin d'éviter tout chevauchement.")])])])}),[],!1,null,null,null);s.default=n.exports}}]);