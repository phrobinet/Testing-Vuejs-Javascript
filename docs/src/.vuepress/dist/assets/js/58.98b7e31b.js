(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{410:function(e,t,s){"use strict";s.r(t);var a=s(42),r=Object(a.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"les-options-cli-de-jest"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#les-options-cli-de-jest"}},[e._v("#")]),e._v(" Les options CLI de Jest")]),e._v(" "),s("p",[e._v("Le programme d'exécution de la ligne de commande "),s("code",[e._v("jest")]),e._v(" dispose d'un certain nombre d'options utiles. Vous pouvez lancer "),s("code",[e._v("jest --help")]),e._v(" pour voir toutes les options disponibles. La plupart des options présentées ci-dessous peuvent également être utilisées ensemble pour effectuer des tests exactement comme vous le souhaitez. Chacune des options de Jest "),s("RouterLink",{attrs:{to:"/jest/api/Configuration.html"}},[e._v("Configuration")]),e._v(" peut également être spécifiée par le CLI.")],1),e._v(" "),s("p",[e._v("En voici un bref aperçu :")]),e._v(" "),s("h2",{attrs:{id:"en-ligne-de-commande"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#en-ligne-de-commande"}},[e._v("#")]),e._v(" En ligne de commande")]),e._v(" "),s("p",[e._v("Effectue tous les tests (par défaut):")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("jest\n")])])]),s("p",[e._v("Effectue seulement les tests qui ont été spécifiez avec un modèle ou un nom de fichier :")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("jest my-test "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#or")]),e._v("\njest path/to/my-test.js\n")])])]),s("p",[e._v("Effectue des tests relatifs aux fichiers modifiés sur la base hg/git (fichier non engagés):")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("jest -o\n")])])]),s("p",[e._v("Effectue les tests relatifs à "),s("code",[e._v("chemin/vers/fichierA.js")]),e._v(" et "),s("code",[e._v("chemin/vers/fichierB.js")]),e._v(" :")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("jest --findRelatedTests path/to/fileA.js path/to/fileB.js\n")])])]),s("p",[e._v("Effectue les tests qui correspondent à ce nom de spécification (correspondance avec le nom dans "),s("code",[e._v("describe")]),e._v(" ou "),s("code",[e._v("test")]),e._v(", basiquement).")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("jest -t name-of-spec\n")])])]),s("p",[e._v("Run watch mode:")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("jest --watch "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#runs jest -o by default")]),e._v("\njest --watchAll "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#runs all tests")]),e._v("\n")])])]),s("p",[e._v("Le mode veille permet aussi de spécifier le nom ou le chemin d'accès à un fichier pour se concentrer sur un ensemble spécifique de tests.")]),e._v(" "),s("h2",{attrs:{id:"utilisation-de-yarn"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#utilisation-de-yarn"}},[e._v("#")]),e._v(" Utilisation de yarn")]),e._v(" "),s("p",[e._v("Si vous exécutez Jest via "),s("code",[e._v("yarn test")]),e._v(", vous pouvez passer les arguments de la ligne de commande directement en tant qu'arguments Jest.")]),e._v(" "),s("p",[e._v("Au lieu de :")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("jest -u -t"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"ColorPicker"')]),e._v("\n")])])]),s("p",[e._v("Vous pouvez utiliser :")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("yarn")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("test")]),e._v(" -u -t"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"ColorPicker"')]),e._v("\n")])])]),s("h2",{attrs:{id:"utilisation-des-scripts-npm"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#utilisation-des-scripts-npm"}},[e._v("#")]),e._v(" Utilisation des scripts npm")]),e._v(" "),s("p",[e._v("Si vous exécutez Jest via "),s("code",[e._v("npm test")]),e._v(", vous pouvez toujours utiliser les arguments de la ligne de commande en insérant un "),s("code",[e._v("--")]),e._v(" entre "),s("code",[e._v("npm test")]),e._v(" et les arguments de Jest.")]),e._v(" "),s("p",[e._v("Au lieu de :")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("jest -u -t"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"ColorPicker"')]),e._v("\n")])])]),s("p",[e._v("Vous pouvez utiliser :")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("test")]),e._v(" -- -u -t"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"ColorPicker"')]),e._v("\n")])])]),s("h2",{attrs:{id:"le-support-des-arguments-camelcase-dashed"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#le-support-des-arguments-camelcase-dashed"}},[e._v("#")]),e._v(" Le support des arguments Camelcase & dashed")]),e._v(" "),s("p",[e._v("Jest prend en charge les formats des arguments en camelcase et dashed. Les exemples suivants auront un résultat égal :")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("jest --collect-coverage\njest --collectCoverage\n")])])]),s("p",[e._v("Les arguments pouvent aussi être mélangés :")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("jest --update-snapshot --detectOpenHandles\n")])])]),s("h2",{attrs:{id:"les-options"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#les-options"}},[e._v("#")]),e._v(" Les Options")]),e._v(" "),s("p",[s("em",[e._v("Note: Les options CLI ont la priorité sur les valeurs de la "),s("RouterLink",{attrs:{to:"/jest/api/Configuration.html"}},[e._v("Configuration")]),e._v(".")],1)]),e._v(" "),s("AUTOGENERATED_TABLE_OF_CONTENTS",[s("hr"),e._v(" "),s("h2",{attrs:{id:"reference"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#reference"}},[e._v("#")]),e._v(" Reference")]),e._v(" "),s("h3",{attrs:{id:"jest-regexfortestfiles"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#jest-regexfortestfiles"}},[e._v("#")]),e._v(" "),s("code",[e._v("jest <regexForTestFiles>")])]),e._v(" "),s("p",[e._v("Quand vous exécutez "),s("code",[e._v("jest")]),e._v(" avec un arguement, cet argument est traité comme une expression régulière à mettre en correspondance avec les fichiers de votre projet. Il est possible d'exécuter des suites de test en fournissant un modèle. Seuls les fichiers auquels le modèle correspond seront exécutés. Selon votre terminal, vous devez peut-être citer cet argument: "),s("code",[e._v('jest "my.*(complex)?pattern"')]),e._v(". Sous Windows, vous devez utiliser "),s("code",[e._v("/")]),e._v(" comme séparateur de chemin "),s("code",[e._v("\\")]),e._v(" comme "),s("code",[e._v("\\\\")]),e._v(".")]),e._v(" "),s("h3",{attrs:{id:"bail"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bail"}},[e._v("#")]),e._v(" "),s("code",[e._v("--bail")])]),e._v(" "),s("p",[e._v("Alias: "),s("code",[e._v("-b")]),e._v(". Quittez la suite de test immédiatement après le nombre "),s("code",[e._v("n")]),e._v(" de suites de tests échouées. La valeur par défaut est "),s("code",[e._v("1")]),e._v(".")]),e._v(" "),s("h3",{attrs:{id:"cache"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cache"}},[e._v("#")]),e._v(" "),s("code",[e._v("--cache")])]),e._v(" "),s("p",[e._v("L'utilisation de cache est par défaut 'vrai'. Pour désactiver le cache utiliser "),s("code",[e._v("--no-cache")]),e._v(". "),s("em",[e._v("Note: le cache doit être désactivé que si vous rencontrez des problèmes liés à la mise en cache. En moyenne, la désactiation du cache rend Jest deux fois plus lent.")])]),e._v(" "),s("p",[e._v("Si vous voulez inspecter le cache, utiliser "),s("code",[e._v("--showConfig")]),e._v(" et regarder la valeur de "),s("code",[e._v("cacheDirectory")]),e._v(". Si vous devez nettoyer le cache, utilisez "),s("code",[e._v("--clearCache")]),e._v(".")]),e._v(" "),s("h3",{attrs:{id:"changedfileswithancestor"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#changedfileswithancestor"}},[e._v("#")]),e._v(" "),s("code",[e._v("--changedFilesWithAncestor")])]),e._v(" "),s("p",[e._v("Exécute des tests liés aux changement actuels et aux changements effectués lors du dernier commit. Se comporte de la même manière que "),s("code",[e._v("--onlyChanged")]),e._v(".")]),e._v(" "),s("h3",{attrs:{id:"changedsince"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#changedsince"}},[e._v("#")]),e._v(" "),s("code",[e._v("--changedSince")])]),e._v(" "),s("p",[e._v("Exécute des tests liés aux changements depuis la branche fournie. Si la branche actuelle a divergé de la branche donnée, alors seuls les changements effectués localement seront testés. Se comporte de la même manière que "),s("code",[e._v("--onlyChanged")]),e._v(".")]),e._v(" "),s("h3",{attrs:{id:"ci"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ci"}},[e._v("#")]),e._v(" "),s("code",[e._v("--ci")])]),e._v(" "),s("p",[e._v("Lorsque cette option est proposée, Jest suppose qu'il fonctionne dans un environnement CI. Cela change le comportement lorsqu'un nouvel instantané est rencontré. Au lieu de stocker automatiquement un nouvel instantané, le test échouera et Jest devra être exécuté avec "),s("code",[e._v("--updateSnapshot")]),e._v(".")]),e._v(" "),s("h3",{attrs:{id:"clearcache"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#clearcache"}},[e._v("#")]),e._v(" "),s("code",[e._v("--clearCache")])]),e._v(" "),s("p",[e._v("Supprime le répertoire de cache de Jest et quitte ensuite sans effectuer de tests. Supprime le "),s("code",[e._v("cacheDirectory")]),e._v(" si l'option est passée, ou le répertoire de cache par défaut de Jest. Le répertoire de cache par défaut peut être trouvé en appelant "),s("code",[e._v("jest --showConfig")]),e._v(". "),s("em",[e._v("Note : la suppression du cache réduira les performances")]),e._v(".")]),e._v(" "),s("h3",{attrs:{id:"collectcoveragefrom-glob"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#collectcoveragefrom-glob"}},[e._v("#")]),e._v(" "),s("code",[e._v("--collectCoverageFrom=<glob>")])]),e._v(" "),s("p",[e._v("Un modèle de globalité relatif à "),s("code",[e._v("rootDir")]),e._v(" correspondant aux fichiers dans lesquels les informations de couverture doivent être collectées.")]),e._v(" "),s("h3",{attrs:{id:"colors"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#colors"}},[e._v("#")]),e._v(" "),s("code",[e._v("--colors")])]),e._v(" "),s("p",[e._v("Les résultats des tests des forces sont mis en évidence même si la sortie standard n'est pas un ATS.")]),e._v(" "),s("h3",{attrs:{id:"config-path"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#config-path"}},[e._v("#")]),e._v(" "),s("code",[e._v("--config=<path>")])]),e._v(" "),s("p",[e._v("Alias : "),s("code",[e._v("-c")]),e._v(". Le chemin vers un fichier de configuration Jest spécifiant comment trouver et exécuter des tests. Si aucun "),s("code",[e._v("rootDir")]),e._v(" n'est défini dans le fichier de configuration, le répertoire contenant le fichier de configuration est supposé être le "),s("code",[e._v("rootDir")]),e._v(" du projet. Il peut également s'agir d'une valeur codée en JSON que Jest utilisera comme configuration.")]),e._v(" "),s("h3",{attrs:{id:"coverage-boolean"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#coverage-boolean"}},[e._v("#")]),e._v(" "),s("code",[e._v("--coverage[=<boolean>]")])]),e._v(" "),s("p",[e._v("Alias : "),s("code",[e._v("--collectCoverage")]),e._v(". Indique que les informations sur la couverture des tests doivent être collectées et rapportées dans la sortie. Passez optionnellement "),s("code",[e._v("<boolean>")]),e._v(" pour remplacer l'option définie dans la configuration.")]),e._v(" "),s("h3",{attrs:{id:"coverageprovider-provider"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#coverageprovider-provider"}},[e._v("#")]),e._v(" "),s("code",[e._v("--coverageProvider=<provider>")])]),e._v(" "),s("p",[e._v("Indique quel fournisseur doit être utilisé pour instrumenter le code pour la couverture. Les valeurs autorisées sont "),s("code",[e._v("babel")]),e._v(' (par défaut) ou "v8".')]),e._v(" "),s("p",[e._v("Notez que l'utilisation de "),s("code",[e._v("v8")]),e._v(" est considérée comme expérimentale. Il utilise la couverture du code intégré de V8 plutôt qu'un code basé sur Babel. Il n'est pas aussi bien testé, et il a également été amélioré dans les dernières versions de Node. L'utilisation des dernières versions de Node (v14 au moment où nous écrivons ces lignes) donnera de meilleurs résultats.")]),e._v(" "),s("h3",{attrs:{id:"debug"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#debug"}},[e._v("#")]),e._v(" "),s("code",[e._v("--debug")])]),e._v(" "),s("p",[e._v("Imprimez les informations de débogage de votre configuration Jest.")]),e._v(" "),s("h3",{attrs:{id:"detectopenhandles"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#detectopenhandles"}},[e._v("#")]),e._v(" "),s("code",[e._v("--detectOpenHandles")])]),e._v(" "),s("p",[e._v('Tentative de collecte et d\'impression de poignées ouvertes empêchant la sortie propre de Jest. Utilisez ceci dans les cas où vous devez utiliser "--forceExit" pour que Jest puisse sortir afin de retrouver la raison éventuelle. Cela implique '),s("code",[e._v("--runInBand")]),e._v(", ce qui permet de faire des tests en série. Implémenté en utilisant "),s("a",{attrs:{href:"https://nodejs.org/api/async_hooks.html",target:"_blank",rel:"noopener noreferrer"}},[s("code",[e._v("async_hooks")]),s("OutboundLink")],1),e._v(". Cette option a une pénalité de performance significative et ne devrait être utilisée que pour le débogage.")]),e._v(" "),s("h3",{attrs:{id:"env-environment"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#env-environment"}},[e._v("#")]),e._v(" "),s("code",[e._v("--env=<environment>")])]),e._v(" "),s("p",[e._v('L\'environnement de test utilisé pour tous les tests. Il peut pointer vers n\'importe quel fichier ou module de nœud. Exemples : jsdom", "node" ou "path/to/myenvironment.js".')]),e._v(" "),s("h3",{attrs:{id:"errorondeprecated"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#errorondeprecated"}},[e._v("#")]),e._v(" "),s("code",[e._v("--errorOnDeprecated")])]),e._v(" "),s("p",[e._v("Faites e sorte que les API obsolètes envoient des messages d'erreur utiles. Utile pour faciliter le processus de mise à niveau.")]),e._v(" "),s("h3",{attrs:{id:"expand"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#expand"}},[e._v("#")]),e._v(" "),s("code",[e._v("--expand")])]),e._v(" "),s("p",[e._v("Alias: "),s("code",[e._v("-e")]),e._v(". Utilisez ce drapeau pour afficher les différences et erreurs complètes au lieu d'un patch.")]),e._v(" "),s("h3",{attrs:{id:"findrelatedtests-spaceseparatedlistofsourcefiles"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#findrelatedtests-spaceseparatedlistofsourcefiles"}},[e._v("#")]),e._v(" "),s("code",[e._v("--findRelatedTests <spaceSeparatedListOfSourceFiles>")])]),e._v(" "),s("p",[e._v("Trouvez et exécutez les tests qui couvrent une liste de fichiers sources séparés par des espaces et qui ont été passés en argument. Utile pour l'intégration  du hook pré-commit pour exécuter le minimum de tests nécessaires. Peut être utilisé avec "),s("code",[e._v("--coverage")]),e._v(" pour inclure une couverture de test pour les fichiers sources, pas de duplication des arguments "),s("code",[e._v("--collectCoverageFrom")]),e._v(" nécessaire.")]),e._v(" "),s("h3",{attrs:{id:"forceexit"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#forceexit"}},[e._v("#")]),e._v(" "),s("code",[e._v("--forceExit")])]),e._v(" "),s("p",[e._v("Forcer Jest à sortir après que tous les tests aient été effectués. Ceci est utile lorsque les ressources mises en place par le code de test ne peuvent pas être nettoyées de manière adéquate. "),s("em",[e._v("Note : Cette fonction est une trappe d'échappement. Si Jest ne se termine pas à la fin d'un test, cela signifie que les ressources externes sont toujours maintenues ou que des temporisateurs sont toujours en attente dans votre code. Il est conseillé de démonter les ressources externes après chaque test pour s'assurer que Jest peut s'éteindre proprement. Vous pouvez utiliser "),s("code",[e._v("--detectOpenHandles")]),e._v(" pour vous aider à le retrouver")]),e._v(".")]),e._v(" "),s("h3",{attrs:{id:"help"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#help"}},[e._v("#")]),e._v(" "),s("code",[e._v("--help")])]),e._v(" "),s("p",[e._v("Afficher les informations d'aide, similaires à cette page.")]),e._v(" "),s("h3",{attrs:{id:"init"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#init"}},[e._v("#")]),e._v(" "),s("code",[e._v("--init")])]),e._v(" "),s("p",[e._v("Générer un fichier de configuration de base. En fonction de votre projet, Jest vous posera quelques questions qui vous aideront à générer un fichier "),s("code",[e._v("jest.config.js")]),e._v(" avec une courte description pour chaque option.")]),e._v(" "),s("h3",{attrs:{id:"json"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#json"}},[e._v("#")]),e._v(" "),s("code",[e._v("--json")])]),e._v(" "),s("p",[e._v("Prints the test results in JSON. This mode will send all other test output and user messages to stderr.")]),e._v(" "),s("h3",{attrs:{id:"outputfile-filename"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#outputfile-filename"}},[e._v("#")]),e._v(" "),s("code",[e._v("--outputFile=<filename>")])]),e._v(" "),s("p",[e._v("Ecrire les résultats des tests dans un fichier lorsque l'option "),s("code",[e._v("--json")]),e._v(" est également spécifiée. La structure JSON renvoyée est documentée dans "),s("RouterLink",{attrs:{to:"/jest/api/Configuration.html#testresultsprocessor-string"}},[e._v("testResultsProcessor")]),e._v(".")],1),e._v(" "),s("h3",{attrs:{id:"lastcommit"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lastcommit"}},[e._v("#")]),e._v(" "),s("code",[e._v("--lastCommit")])]),e._v(" "),s("p",[e._v("Exécutez tous les tests affectés par les changements de fichiers dans le dernier commit effectué. Se comporte de manière similaire à "),s("code",[e._v("--onlyChanged")]),e._v(".")]),e._v(" "),s("h3",{attrs:{id:"listtests"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#listtests"}},[e._v("#")]),e._v(" "),s("code",[e._v("--listTests")])]),e._v(" "),s("p",[e._v("Liste tous les tests en tant que JSON que Jest va exécuter compte tenu des arguments, et sort. Ceci peut être utilisé avec "),s("code",[e._v("--findRelatedTests")]),e._v(" pour savoir quels tests Jest va exécuter.")]),e._v(" "),s("h3",{attrs:{id:"logheapusage"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#logheapusage"}},[e._v("#")]),e._v(" "),s("code",[e._v("--logHeapUsage")])]),e._v(" "),s("p",[e._v("Enregistre l'utilisation du tas après chaque test. Utile pour déboguer les fuites de mémoire. S'utilise avec "),s("code",[e._v("--runInBand")]),e._v(" et "),s("code",[e._v("--expose-gc")]),e._v(" dans le noeud.")]),e._v(" "),s("h3",{attrs:{id:"maxconcurrency-num"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#maxconcurrency-num"}},[e._v("#")]),e._v(" "),s("code",[e._v("--maxConcurrency=<num>")])]),e._v(" "),s("p",[e._v("Empêche Jest d'exécuter simultanément plus de tests que la quantité spécifiée. N'affecte que les tests qui utilisent "),s("code",[e._v("test.concurrent")]),e._v(".")]),e._v(" "),s("h3",{attrs:{id:"maxworkers-num-string"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#maxworkers-num-string"}},[e._v("#")]),e._v(" "),s("code",[e._v("--maxWorkers=<num>|<string>")])]),e._v(" "),s("p",[e._v("Alias : "),s("code",[e._v("w")]),e._v(". Spécifie le nombre maximum de travailleurs que le groupe de travailleurs va engendrer pour effectuer des tests. En mode d'exécution unique, le nombre de noyaux disponibles sur votre machine moins un pour le fil principal est utilisé par défaut. En mode veille, le nombre par défaut est de la moitié des noyaux disponibles sur votre machine pour garantir que Jest est discret et ne broie pas votre machine à l'arrêt. Il peut être utile d'ajuster cette valeur dans les environnements à ressources limitées comme les CI, mais les valeurs par défaut devraient être adéquates pour la plupart des cas d'utilisation.")]),e._v(" "),s("p",[e._v("Pour les environnements disposant d'unités centrales variables, vous pouvez utiliser une configuration basée sur le pourcentage : "),s("code",[e._v("--maxWorkers=50%")]),e._v(".")]),e._v(" "),s("h3",{attrs:{id:"nostacktrace"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nostacktrace"}},[e._v("#")]),e._v(" "),s("code",[e._v("--noStackTrace")])]),e._v(" "),s("p",[e._v("Désactive la trace de la pile dans la sortie des résultats des tests.")]),e._v(" "),s("h3",{attrs:{id:"notify"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#notify"}},[e._v("#")]),e._v(" "),s("code",[e._v("--notify")])]),e._v(" "),s("p",[e._v("Active les notifications des résultats des tests. Bon pour quand vous ne voulez pas que votre conscience puisse se concentrer sur autre chose que les tests JavaScript.")]),e._v(" "),s("h3",{attrs:{id:"onlychanged"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#onlychanged"}},[e._v("#")]),e._v(" "),s("code",[e._v("--onlyChanged")])]),e._v(" "),s("p",[e._v("Alias : "),s("code",[e._v("-o")]),e._v(". Tentatives d'identification des tests à exécuter en fonction des fichiers qui ont été modifiés dans le dépôt actuel. Ne fonctionne que si vous exécutez des tests dans un dépôt git/hg en ce moment et nécessite un graphe de dépendance statique (c'est-à-dire qu'aucune dynamique n'est nécessaire).")]),e._v(" "),s("h3",{attrs:{id:"passwithnotests"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#passwithnotests"}},[e._v("#")]),e._v(" "),s("code",[e._v("--passWithNoTests")])]),e._v(" "),s("p",[e._v("Permet à la suite de test de réussir lorsqu'aucun fichier n'est trouvé.")]),e._v(" "),s("h3",{attrs:{id:"projects-path1-pathn"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#projects-path1-pathn"}},[e._v("#")]),e._v(" "),s("code",[e._v("--projects <path1> ... <pathN>")])]),e._v(" "),s("p",[e._v("Effectuer des tests à partir d'un ou plusieurs projets, trouvés dans les chemins spécifiés ; prend également des chemins globaux. Cette option est l'équivalent CLI de l'option de configuration "),s("a",{attrs:{href:"configuration#projects-arraystring--projectconfig"}},[s("code",[e._v("projects")])]),e._v(". Notez que si les fichiers de configuration sont trouvés dans les chemins spécifiés, "),s("em",[e._v("tous")]),e._v(" les projets spécifiés dans ces fichiers de configuration seront exécutés.")]),e._v(" "),s("h3",{attrs:{id:"reporters"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#reporters"}},[e._v("#")]),e._v(" "),s("code",[e._v("--reporters")])]),e._v(" "),s("p",[e._v("Effectuez des tests avec des rapporteurs spécifiques. Les "),s("a",{attrs:{href:"configuration#reporters-arraymodulename--modulename-options"}},[e._v("options des rapporteurs")]),e._v(" ne sont pas disponibles via le CLI. Exemple avec plusieurs rapporteurs :")]),e._v(" "),s("p",[s("code",[e._v('jest --reporters="default" --reporters="jest-junit"')])]),e._v(" "),s("h3",{attrs:{id:"runinband"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#runinband"}},[e._v("#")]),e._v(" "),s("code",[e._v("--runInBand")])]),e._v(" "),s("p",[e._v('Alias : "-i". Effectuer tous les tests en série dans le processus en cours, plutôt que de créer un groupe de processus enfants qui effectuent des tests. Cela peut être utile pour le débogage.')]),e._v(" "),s("h3",{attrs:{id:"selectprojects-project1-projectn"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#selectprojects-project1-projectn"}},[e._v("#")]),e._v(" "),s("code",[e._v("--selectProjects <project1> ... <projectN>")])]),e._v(" "),s("p",[e._v("N'effectuez que les tests des projets spécifiés. Jest utilise l'attribut "),s("code",[e._v("displayName")]),e._v(" dans la configuration pour identifier chaque projet. Si vous utilisez cette option, vous devez fournir un "),s("code",[e._v("displayName")]),e._v(" à tous vos projets.")]),e._v(" "),s("h3",{attrs:{id:"runtestsbypath"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#runtestsbypath"}},[e._v("#")]),e._v(" "),s("code",[e._v("--runTestsByPath")])]),e._v(" "),s("p",[e._v("N'effectuez que les tests qui ont été spécifiés avec leurs trajectoires exactes.")]),e._v(" "),s("p",[s("em",[e._v("Note : La correspondance de regex par défaut fonctionne bien sur de petites séries, mais devient lente si elle est fournie avec des modèles multiples et/ou contre un grand nombre de tests. Cette option remplace la logique de correspondance de regex et optimise ainsi le temps que Jest prend pour filtrer des fichiers de test spécifiques")])]),e._v(" "),s("h3",{attrs:{id:"setuptestframeworkscriptfile-file"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#setuptestframeworkscriptfile-file"}},[e._v("#")]),e._v(" "),s("code",[e._v("--setupTestFrameworkScriptFile=<file>")])]),e._v(" "),s("p",[e._v("Le chemin vers un module qui exécute un certain code pour configurer ou mettre en place le cadre de test avant chaque test. Attention, les fichiers importés par le script de configuration ne seront pas simulés pendant les tests.")]),e._v(" "),s("h3",{attrs:{id:"showconfig"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#showconfig"}},[e._v("#")]),e._v(" "),s("code",[e._v("--showConfig")])]),e._v(" "),s("p",[e._v("Imprimez votre configuration Jest, puis quittez.")]),e._v(" "),s("h3",{attrs:{id:"silent"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#silent"}},[e._v("#")]),e._v(" "),s("code",[e._v("--silent")])]),e._v(" "),s("p",[e._v("Empêcher les tests d'imprimer des messages via la console.")]),e._v(" "),s("h3",{attrs:{id:"testnamepattern-regex"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#testnamepattern-regex"}},[e._v("#")]),e._v(" "),s("code",[e._v("--testNamePattern=<regex>")])]),e._v(" "),s("p",[e._v("Alias : "),s("code",[e._v("-t")]),e._v(". N'effectuez que des tests avec un nom qui correspond à la regex. Par exemple, supposons que vous ne vouliez exécuter que des tests liés à l'autorisation qui auront des noms comme "),s("code",[e._v('"GET /api/posts with auth"')]),e._v(", alors vous pouvez utiliser "),s("code",[e._v("jest -t=auth")]),e._v(".")]),e._v(" "),s("p",[e._v("Note : La regex est comparée au nom complet, qui est une combinaison du nom du test et de tous les blocs de description qui l'entourent.")]),e._v(" "),s("h3",{attrs:{id:"testlocationinresults"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#testlocationinresults"}},[e._v("#")]),e._v(" "),s("code",[e._v("--testLocationInResults")])]),e._v(" "),s("p",[e._v("Ajout d'un champ "),s("code",[e._v("localisation")]),e._v(" pour les résultats des tests. Utile si vous voulez signaler le lieu d'un test dans un rapport.")]),e._v(" "),s("p",[e._v("Notez que la "),s("code",[e._v("column")]),e._v(" est indexée à 0 alors que la "),s("code",[e._v("line")]),e._v(" ne l'est pas.")]),e._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"column"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("4")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[e._v('"line"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("5")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),s("h3",{attrs:{id:"testpathpattern-regex"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#testpathpattern-regex"}},[e._v("#")]),e._v(" "),s("code",[e._v("--testPathPattern=<regex>")])]),e._v(" "),s("p",[e._v("Une chaîne de motifs regexp qui est comparée à tous les chemins de test avant d'exécuter le test. Sous Windows, vous devrez utiliser "),s("code",[e._v("/")]),e._v(" comme séparateur de chemin ou échapper "),s("code",[e._v("\\")]),e._v(" comme "),s("code",[e._v("\\\\")]),e._v(".")]),e._v(" "),s("h3",{attrs:{id:"testpathignorepatterns-array"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#testpathignorepatterns-array"}},[e._v("#")]),e._v(" "),s("code",[e._v("--testPathIgnorePatterns=[array]")])]),e._v(" "),s("p",[e._v("Un ensemble de chaînes de motifs regexp qui sont testées par rapport à tous les chemins de test avant d'être exécutées. Contrairement à "),s("code",[e._v("--testPathPattern")]),e._v(", il n'exécutera ces tests qu'avec un chemin qui ne correspond pas aux expressions regexp fournies.")]),e._v(" "),s("h3",{attrs:{id:"testrunner-path"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#testrunner-path"}},[e._v("#")]),e._v(" "),s("code",[e._v("--testRunner=<path>")])]),e._v(" "),s("p",[e._v("Vous permettez  de spécifier un testeur personnalisé.")]),e._v(" "),s("h3",{attrs:{id:"testsequencer-path"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#testsequencer-path"}},[e._v("#")]),e._v(" "),s("code",[e._v("--testSequencer=<path>")])]),e._v(" "),s("p",[e._v("Permet de spécifier un séquenceur de test personnalisé. Veuillez vous référer à la documentation de la propriété de configuration correspondante pour plus de détails.")]),e._v(" "),s("h3",{attrs:{id:"testtimeout-number"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#testtimeout-number"}},[e._v("#")]),e._v(" "),s("code",[e._v("--testTimeout=<number>")])]),e._v(" "),s("p",[e._v("Délai d'attente par défaut d'un test en millisecondes. Valeur par défaut : 5000.")]),e._v(" "),s("h3",{attrs:{id:"updatesnapshot"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#updatesnapshot"}},[e._v("#")]),e._v(" "),s("code",[e._v("--updateSnapshot")])]),e._v(" "),s("p",[e._v("Alias : "),s("code",[e._v("-u")]),e._v(". Utilisez ce drapeau pour réenregistrer chaque instantané qui échoue pendant ce test. Peut être utilisé avec un modèle de suite de tests ou avec "),s("code",[e._v("--testNamePattern")]),e._v(" pour réenregistrer les instantanés.")]),e._v(" "),s("h3",{attrs:{id:"usestderr"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#usestderr"}},[e._v("#")]),e._v(" "),s("code",[e._v("--useStderr")])]),e._v(" "),s("p",[e._v("Déviez toutes les sorties vers stderr (standard error).")]),e._v(" "),s("h3",{attrs:{id:"verbose"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#verbose"}},[e._v("#")]),e._v(" "),s("code",[e._v("--verbose")])]),e._v(" "),s("p",[e._v("Afficher les résultats des tests individuels avec la hiérarchie des suites de tests.")]),e._v(" "),s("h3",{attrs:{id:"version"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#version"}},[e._v("#")]),e._v(" "),s("code",[e._v("--version")])]),e._v(" "),s("p",[e._v('Alias : "v". Imprimez la version et quittez.')]),e._v(" "),s("h3",{attrs:{id:"watch"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#watch"}},[e._v("#")]),e._v(" "),s("code",[e._v("--watch")])]),e._v(" "),s("p",[e._v("Surveillez les fichiers pour les modifications et refaites les tests liés aux fichiers modifiés. Si vous voulez relancer tous les tests lorsqu'un fichier a été modifié, utilisez plutôt l'option "),s("code",[e._v("--watchAll")]),e._v(".")]),e._v(" "),s("h3",{attrs:{id:"watchall"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#watchall"}},[e._v("#")]),e._v(" "),s("code",[e._v("--watchAll")])]),e._v(" "),s("p",[e._v("Surveillez les fichiers pour détecter les changements et refaites tous les tests lorsque quelque chose change. Si vous voulez relancer uniquement les tests qui dépendent des fichiers modifiés, utilisez l'option "),s("code",[e._v("--watch")]),e._v(".")]),e._v(" "),s("p",[e._v("Utilisez "),s("code",[e._v("--watchAll=false")]),e._v(" pour désactiver explicitement le mode de surveillance. Notez que dans la plupart des environnements de CI, ceci est automatiquement géré pour vous.")]),e._v(" "),s("h3",{attrs:{id:"watchman"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#watchman"}},[e._v("#")]),e._v(" "),s("code",[e._v("--watchman")])]),e._v(" "),s("p",[e._v("S'il faut utiliser le gardien pour le triage des dossiers. Par défaut, c'est vrai. Désactiver l'utilisation de "),s("code",[e._v("--no-watchman")]),e._v(".")])])],1)}),[],!1,null,null,null);t.default=r.exports}}]);