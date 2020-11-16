(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{424:function(e,o,r){"use strict";r.r(o);var t=r(42),n=Object(t.a)({},(function(){var e=this,o=e.$createElement,r=e._self._c||o;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"configuring-mocha-node-js"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#configuring-mocha-node-js"}},[e._v("#")]),e._v(" CONFIGURING MOCHA (NODE.JS)")]),e._v(" "),r("blockquote",[r("p",[e._v("Nouveau dans la v6.0.0")])]),e._v(" "),r("p",[e._v("Mocha prend en charge les fichiers de configuration, typiques des outils de ligne de commande modernes, dans plusieurs formats :")]),e._v(" "),r("p",[r("strong",[e._v("JavaScript:")]),e._v(" Créez un "),r("code",[e._v(".mocharc.js")]),e._v(" (ou "),r("code",[e._v(".mocharc.cjs")]),e._v(" lorsque vous utilisez "),r("a",{attrs:{href:"https://mochajs.org/#nodejs-native-esm-support",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v('"type"="module"')]),r("OutboundLink")],1),e._v(" dans votre "),r("code",[e._v("package.json")]),e._v(") dans le répertoire racine de votre projet, et exportez un objet ("),r("code",[e._v("module.exports = {/* ... */}")]),e._v(") contenant votre configuration.\n"),r("strong",[e._v("YAML:")]),e._v(" Créez un "),r("code",[e._v(".mocharc.yaml")]),e._v(" (ou "),r("code",[e._v(".mocharc.yml")]),e._v(") dans le répertoire racine de votre projet.\n"),r("strong",[e._v("JSON:")]),e._v(" Créez un "),r("code",[e._v(".mocharc.json")]),e._v("(ou "),r("code",[e._v(".mocharc.jsonc")]),e._v(") dans le répertoire racine de votre projet. Les commentaires - bien que non valides JSON - sont autorisés dans ce fichier, et seront ignorés par Mocha.\n"),r("strong",[e._v("package.json:")]),e._v(" Créez une propriété "),r("code",[e._v("mocha")]),e._v(" dans le "),r("code",[e._v("package.json")]),e._v(" de votre projet.")]),e._v(" "),r("h2",{attrs:{id:"custom-locations"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#custom-locations"}},[e._v("#")]),e._v(" CUSTOM LOCATIONS")]),e._v(" "),r("p",[e._v("Vous pouvez spécifier un emplacement personnalisé pour votre fichier de configuration avec l'option "),r("code",[e._v("--config <path>")]),e._v(". Mocha utilisera l'extension du fichier pour déterminer comment analyser le fichier, et supposera JSON s'il est inconnu.")]),e._v(" "),r("p",[e._v("Vous pouvez également spécifier un emplacement de paquet.json personnalisé, en utilisant l'option "),r("code",[e._v("--package <path>")]),e._v(".")]),e._v(" "),r("h2",{attrs:{id:"ignoring-config-files"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#ignoring-config-files"}},[e._v("#")]),e._v(" IGNORING CONFIG FILES")]),e._v(" "),r("p",[e._v("Pour ne pas chercher les fichiers de configuration, utilisez --no-config. De même, utilisez --no-package pour empêcher Mocha de chercher la configuration dans un package.json.")]),e._v(" "),r("h2",{attrs:{id:"priorities"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#priorities"}},[e._v("#")]),e._v(" PRIORITIES")]),e._v(" "),r("p",[e._v("Si aucun chemin personnalisé n'a été donné, et s'il y a plusieurs fichiers de configuration dans le même répertoire, Mocha en cherchera - et en utilisera - un seul. La priorité est :")]),e._v(" "),r("ol",[r("li",[r("code",[e._v(".mocharc.js")])]),e._v(" "),r("li",[r("code",[e._v(".mocharc.yaml")])]),e._v(" "),r("li",[r("code",[e._v(".mocharc.yml")])]),e._v(" "),r("li",[r("code",[e._v(".mocharc.jsonc")])]),e._v(" "),r("li",[r("code",[e._v(".mocharc.json")])])]),e._v(" "),r("h2",{attrs:{id:"merging"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#merging"}},[e._v("#")]),e._v(" MERGING")]),e._v(" "),r("p",[e._v("Mocha va également fusionner toutes les options trouvées dans "),r("code",[e._v("package.json")]),e._v(" dans sa configuration d'exécution. En cas de conflit, la priorité est :")]),e._v(" "),r("ol",[r("li",[e._v("Arguments spécifiés sur la ligne de commande")]),e._v(" "),r("li",[e._v("Fichier de configuration ("),r("code",[e._v(".mocharc.js")]),e._v(", "),r("code",[e._v(".mocharc.yml")]),e._v(", etc.)")]),e._v(" "),r("li",[e._v('Propriété " mocha " de " paquet.json ".\nLes options qui peuvent être répétées sans risque (par exemple, "exiger") seront concaténées, les sources de configuration de priorité supérieure apparaissant plus tôt dans la liste. Par exemple, un fichier .mocharc.json contenant "require" : "bar"'),r("code",[e._v(", couplé avec l'exécution de")]),e._v("mocha --require foo"),r("code",[e._v(", ferait en sorte que Mocha requière")]),e._v("foo"),r("code",[e._v(", puis")]),e._v("bar`, dans cet ordre.")])]),e._v(" "),r("h2",{attrs:{id:"extending-configuration"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#extending-configuration"}},[e._v("#")]),e._v(" EXTENDING CONFIGURATION")]),e._v(" "),r("p",[e._v('Les configurations peuvent hériter d\'autres modules en utilisant le mot-clé "extends". Voir '),r("a",{attrs:{href:"http://yargs.js.org/docs/#api-configobject-extends-keyword",target:"_blank",rel:"noopener noreferrer"}},[e._v("ici"),r("OutboundLink")],1),e._v(" pour plus d'informations.")]),e._v(" "),r("h2",{attrs:{id:"configuration-format"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#configuration-format"}},[e._v("#")]),e._v(" CONFIGURATION FORMAT")]),e._v(" "),r("p",[e._v('Tout drapeau "booléen" (qui ne nécessite pas de paramètre, comme '),r("code",[e._v("--bail")]),e._v('), peut être spécifié en utilisant une valeur booléenne, par exemple : "bail" : true'),r("code",[e._v('. Toute option de type "array" (voir')]),e._v("mocha --help"),r("code",[e._v("pour une liste) peut être une simple valeur de chaîne de caractères. Pour les options contenant un tiret (")]),e._v("-"),r("code",[e._v("), le nom de l'option peut être spécifié en utilisant camelCase. Les alias sont des noms valides, par exemple,")]),e._v("R"),r("code",[e._v("au lieu de")]),e._v("reporter"),r("code",[e._v(". Les fichiers de test peuvent être spécifiés en utilisant spec, par exemple,")]),e._v('"spec":'),r("code"),e._v('"test/'),r("strong",[e._v('/*.spec.js"'),r("code",[e._v(". Les drapeaux pour")]),e._v("node"),r("code",[e._v("sont également supportés dans les fichiers de configuration. Faites attention, car ils peuvent varier selon les versions de Node.js ! **Pour plus d'exemples de configuration, voir le répertoire [")]),e._v("the example/config`](https://github.com/mochajs/mocha/tree/master/example/config) sur GitHub.")])])])}),[],!1,null,null,null);o.default=n.exports}}]);