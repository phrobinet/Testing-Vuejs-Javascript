# CONFIGURING MOCHA (NODE.JS)

>Nouveau dans la v6.0.0

Mocha prend en charge les fichiers de configuration, typiques des outils de ligne de commande modernes, dans plusieurs formats :

**JavaScript:** Créez un `.mocharc.js` (ou `.mocharc.cjs` lorsque vous utilisez [`"type"="module"`](https://mochajs.org/#nodejs-native-esm-support) dans votre `package.json`) dans le répertoire racine de votre projet, et exportez un objet (`module.exports = {/* ... */}`) contenant votre configuration.
**YAML:** Créez un `.mocharc.yaml` (ou `.mocharc.yml`) dans le répertoire racine de votre projet.
**JSON:** Créez un `.mocharc.json `(ou `.mocharc.jsonc`) dans le répertoire racine de votre projet. Les commentaires - bien que non valides JSON - sont autorisés dans ce fichier, et seront ignorés par Mocha.
**package.json:** Créez une propriété `mocha` dans le `package.json` de votre projet.

## CUSTOM LOCATIONS

Vous pouvez spécifier un emplacement personnalisé pour votre fichier de configuration avec l'option `--config <path>`. Mocha utilisera l'extension du fichier pour déterminer comment analyser le fichier, et supposera JSON s'il est inconnu.

Vous pouvez également spécifier un emplacement de paquet.json personnalisé, en utilisant l'option `--package <path>`.

## IGNORING CONFIG FILES

Pour ne pas chercher les fichiers de configuration, utilisez --no-config. De même, utilisez --no-package pour empêcher Mocha de chercher la configuration dans un package.json.

## PRIORITIES

Si aucun chemin personnalisé n'a été donné, et s'il y a plusieurs fichiers de configuration dans le même répertoire, Mocha en cherchera - et en utilisera - un seul. La priorité est :

1. `.mocharc.js`
2. `.mocharc.yaml`
3. `.mocharc.yml`
4. `.mocharc.jsonc`
5. `.mocharc.json`

## MERGING

Mocha va également fusionner toutes les options trouvées dans `package.json` dans sa configuration d'exécution. En cas de conflit, la priorité est :

1. Arguments spécifiés sur la ligne de commande
2. Fichier de configuration (`.mocharc.js`, `.mocharc.yml`, etc.)
3. Propriété " mocha " de " paquet.json ".
Les options qui peuvent être répétées sans risque (par exemple, "exiger") seront concaténées, les sources de configuration de priorité supérieure apparaissant plus tôt dans la liste. Par exemple, un fichier .mocharc.json contenant "require" : "bar"`, couplé avec l'exécution de `mocha --require foo`, ferait en sorte que Mocha requière `foo`, puis `bar`, dans cet ordre.

## EXTENDING CONFIGURATION

Les configurations peuvent hériter d'autres modules en utilisant le mot-clé "extends". Voir [ici](http://yargs.js.org/docs/#api-configobject-extends-keyword) pour plus d'informations.

## CONFIGURATION FORMAT

Tout drapeau "booléen" (qui ne nécessite pas de paramètre, comme `--bail`), peut être spécifié en utilisant une valeur booléenne, par exemple : "bail" : true`.
Toute option de type "array" (voir `mocha --help` pour une liste) peut être une simple valeur de chaîne de caractères.
Pour les options contenant un tiret (`-`), le nom de l'option peut être spécifié en utilisant camelCase.
Les alias sont des noms valides, par exemple, `R` au lieu de `reporter`.
Les fichiers de test peuvent être spécifiés en utilisant spec, par exemple, `"spec":` `"test/**/*.spec.js"`.
Les drapeaux pour `node` sont également supportés dans les fichiers de configuration. Faites attention, car ils peuvent varier selon les versions de Node.js !
**Pour plus d'exemples de configuration, voir le répertoire [`the example/config`](https://github.com/mochajs/mocha/tree/master/example/config) sur GitHub.**

