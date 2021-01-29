# L'UTILISATION DE LA LIGNE DE COMMANDE

``` js
mocha [spec..]

Run tests with Mocha

Commands
  mocha inspect [spec..]  Run tests with Mocha                         [default]
  mocha init <path>       create a client-side Mocha setup at <path>

Rules & Behavior
  --allow-uncaught           Allow uncaught errors to propagate        [boolean]
  --async-only, -A           Require all tests to use a callback (async) or
                             return a Promise                          [boolean]
  --bail, -b                 Abort ("bail") after first test failure   [boolean]
  --check-leaks              Check for global variable leaks           [boolean]
  --delay                    Delay initial execution of root suite     [boolean]
  --exit                     Force Mocha to quit after tests complete  [boolean]
  --forbid-only              Fail if exclusive test(s) encountered     [boolean]
  --forbid-pending           Fail if pending test(s) encountered       [boolean]
  --global, --globals        List of allowed global variables            [array]
  --jobs, -j                 Number of concurrent jobs for --parallel; use 1 to
                             run in serial
                                   [number] [default: (number of CPU cores - 1)]
  --parallel, -p             Run tests in parallel                     [boolean]
  --retries                  Retry failed tests this many times         [number]
  --slow, -s                 Specify "slow" test threshold (in milliseconds)
                                                          [string] [default: 75]
  --timeout, -t, --timeouts  Specify test timeout threshold (in milliseconds)
                                                        [string] [default: 2000]
  --ui, -u                   Specify user interface    [string] [default: "bdd"]

Reporting & Output
  --color, -c, --colors                     Force-enable color output  [boolean]
  --diff                                    Show diff on failure
                                                       [boolean] [default: true]
  --full-trace                              Display full stack traces  [boolean]
  --growl, -G                               Enable Growl notifications [boolean]
  --inline-diffs                            Display actual/expected differences
                                            inline within each string  [boolean]
  --reporter, -R                            Specify reporter to use
                                                      [string] [default: "spec"]
  --reporter-option, --reporter-options,    Reporter-specific options
  -O                                        (<k=v,[k1=v1,..]>)           [array]

Configuration
  --config   Path to config file           [string] [default: (nearest rc file)]
  --package  Path to package.json for config                            [string]

File Handling
  --extension          File extension(s) to load
                                           [array] [default: ["js","cjs","mjs"]]
  --file               Specify file(s) to be loaded prior to root suite
                       execution                       [array] [default: (none)]
  --ignore, --exclude  Ignore file(s) or glob pattern(s)
                                                       [array] [default: (none)]
  --recursive          Look for tests in subdirectories                [boolean]
  --require, -r        Require module                  [array] [default: (none)]
  --sort, -S           Sort test files                                 [boolean]
  --watch, -w          Watch files in the current working directory for changes
                                                                       [boolean]
  --watch-files        List of paths or globs to watch                   [array]
  --watch-ignore       List of paths or globs to exclude from watching
                                      [array] [default: ["node_modules",".git"]]

Test Filters
  --fgrep, -f   Only run tests containing this string                   [string]
  --grep, -g    Only run tests matching this string or regexp           [string]
  --invert, -i  Inverts --grep and --fgrep matches                     [boolean]

Positional Arguments
  spec  One or more files, directories, or globs to test
                                                     [array] [default: ["test"]]

Other Options
  --help, -h         Show usage information & exit                     [boolean]
  --version, -V      Show version number & exit                        [boolean]
  --list-interfaces  List built-in user interfaces & exit              [boolean]
  --list-reporters   List built-in reporters & exit                    [boolean]

Mocha Resources
    Chat: https://gitter.im/mochajs/mocha
  GitHub: https://github.com/mochajs/mocha.git
    Docs: https://mochajs.org/
```

### `--allow-uncaught`
Par défaut, Mocha tentera de piéger les exceptions non capturées lors des tests en cours et les signalera comme des échecs aux tests. Utilisez `--allow-uncaught` pour désactiver ce comportement et permettre aux exceptions non capturées de se propager. Cela provoquera généralement un plantage du processus.

Ce drapeau est utile pour le débogage d'exceptions particulièrement difficiles à suivre.

### `--async-only, -A`

Appliquer une règle selon laquelle les tests doivent être rédigés dans le style "asynchrone", ce qui signifie que chaque test fournit un `done` ou renvoie une `Promise`. Les tests non conformes seront marqués comme des échecs.

### `--bail, -b`

Mocha cesse de faire des tests après le premier échec qu'il rencontre. Les crochets correspondants "après chaque" et "après tout" sont exécutés pour un éventuel nettoyage.

`--bail` n'implique pas `--exit`.

### `--check-leaks`

Utilisez cette option pour que Mocha vérifie les variables globales qui fuient pendant les tests. Spécifiez les variables globales qui sont acceptables via l'option `--global` (par exemple : `--check-leaks --global jQuery --global MyLib`).

### `--compilers`

>`--compilateurs` a été supprimé dans la v6.0.0. Voir [explications supplémentaires et solutions de contournement.](https://github.com/mochajs/mocha/wiki/compilers-deprecation)

### ` --exit`

>Mise à jour dans la v4.0.0.

TL;DR : Si vos tests sont interrompus après une mise à jour vers Mocha v4.0.0 ou plus récent, utilisez `--exit` pour une correction rapide (mais pas nécessairement recommandée).

Avant la version v4.0.0, par défaut, Mocha forçait son propre processus à se terminer une fois qu'il avait fini d'exécuter tous les tests. Ce comportement permet un ensemble de problèmes potentiels ; c'est révélateur de tests (ou de montages, de harnais, de code sous test, etc.) qui ne se nettoient pas correctement après coup. ) qui ne se nettoient pas correctement. En fin de compte, des tests "sales" peuvent (mais pas toujours) conduire à des résultats faussement positifs ou faussement négatifs.

"Hanging" se manifeste le plus souvent si un serveur est encore en écoute sur un port, ou si une prise est encore ouverte, etc. Il peut également s'agir d'un `setInterval()` qui s'est enfui, ou même d'une `Promise` erronée qui n'a jamais été tenue.

Le comportement par défaut dans les versions 4.0.0 (et plus récentes) est `--no-exit`, alors qu'auparavant il était `--no-exit`.

**La façon la plus simple de "corriger" le problème est de passer la `--exit` au processus Mocha.** Le débogage peut prendre du temps - car il n'est pas toujours évident de savoir où se trouve le problème - mais il est recommandé de le faire.

Pour vous assurer que vos tests ne laissent pas de traces, voici quelques idées pour commencer :

Voir le [Guide de débogage du nœud.js](https://nodejs.org/en/docs/inspector/)
Utilisez la nouvelle API [async_hooks](https://github.com/nodejs/node/blob/master/doc/api/async_hooks.md) API ([example](https://git.io/vdlNM))
Essayez quelque chose comme [wtfnode](https://npm.im/wtfnode)
Utilisez [.only](https://mochajs.org/#exclusive-tests) until you find the test that causes Mocha to hang


### ` --forbid-only`

Appliquer une règle selon laquelle les tests ne doivent pas être exclusifs (l'utilisation de `describe.only()` ou `it.only()` est interdite, par exemple).

`--forbid-only` fait échouer Mocha lorsqu'un test ou une suite exclusive ("only'd") est rencontré, et il annulera l'exécution des tests ultérieurs.

### ` --forbid-pending`

Appliquer une règle selon laquelle les tests ne peuvent pas être ignorés (l'utilisation, par exemple, de `describe.skip()`, `it.skip()`, ou `this.skip()` n'importe où est interdite).

--forbid-pending provoque l'échec du Mocha lorsqu'un test ou une suite de tests sautés ("en attente") est rencontré, et il interrompra l'exécution de tout autre test.

### ` --global <variable-name>`

>Mise à jour dans la v6.0.0 ; l'option est `--global` et `--globals` est maintenant un alias.

Définir un nom de variable globale. Par exemple, supposons que votre application expose délibérément un global nommé `app` et `YUI`, vous pouvez ajouter `--global app --global YUI`.

`--global` accepte les jokers. Vous pourriez faire `--global '*bar' et il correspondrait à `foobar', `barbar', etc. Vous pouvez aussi passer en "*" pour ignorer tous les globals.

`--global` peut accepter une liste délimitée par des virgules ; `--global app,YUI` est équivalent à `--global app --global YUI`.

En utilisant cette option en conjonction avec --check-leaks, vous pouvez spécifier une liste blanche de variables globales connues dont vous pensez qu'elles vont fuir dans la portée globale.

### ` --retries <n>`

Les essais ont échoué "n" fois.

Mocha ne réessaie pas les échecs de tests par défaut.

### ` --slow <ms>, -s <ms>`

Précisez le seuil de test "slow" en millisecondes. Mocha l'utilise pour mettre en évidence les cas de test qui prennent trop de temps. Les tests "slow" ne sont pas considérés comme des échecs.

Note : Un test qui s'exécute pendant la moitié du temps "slow" sera mis en évidence en jaune avec le rapporteur de spécification par défaut ; un test qui s'exécute pendant tout le temps "lent" sera mis en évidence en rouge.

### `--timeout <ms>, -t <ms>`

Mise à jour dans la v6.0.0 : `--no-timeout` est implicite lorsque l'on invoque le Mocha en utilisant les drapeaux d'inspection. Il est équivalent à `--timeout 0.` `--timeout 99999999` n'est plus nécessaire.

Spécifie le délai d'attente du scénario de test, qui est par défaut de deux (2) secondes (2000 millisecondes). Les tests prenant plus de temps que ce délai seront marqués comme des échecs.

Pour passer outre, vous pouvez passer le délai en millisecondes, ou une valeur avec le suffixe `s`, par exemple, `--temps 2s` et `--temps 2000` sont équivalents.

Pour désactiver les temps morts, utilisez le suffixe " --no-timeout ".

Note : les tests synchrones (de blocage) sont également liés par le délai d'attente, mais ils ne se termineront pas tant que le code ne cessera pas de bloquer. Les boucles infinies seront toujours des boucles infinies !

### `--ui <name>, -u <name>`

L'option `--ui` vous permet de spécifier l'interface à utiliser, en choisissant par défaut `bdd`.

### `--color, -c, --colors`

>Mise à jour dans la v6.0.0. `--colors` est maintenant un alias pour `--color`.

"Force" la sortie de couleur à être activée, ou alternativement la force à être désactivée via `--no-color`. Par défaut, Mocha utilise le module supports-color (npm) pour décider.

Dans certains cas, la sortie couleur sera explicitement supprimée par certains reporters produisant dans un format lisible par la machine.

### `--diff`

Si possible, indiquez la différence entre les valeurs attendues et les valeurs réelles en cas d'échec d'une affirmation.

Ce drapeau est inhabituel dans la mesure où il **défaut de ** "vrai" ; utilisez `--no-diff` pour supprimer la propre sortie de diff de Mocha.

Certaines bibliothèques d'affirmations fourniront leurs propres diffs, auquel cas celui de Mocha ne sera pas utilisé, quelle que soit la valeur par défaut.

La sortie de diff de Mocha n'est conforme à aucun standard connu, et est conçue pour être lisible par l'homme.

### `--full-trace`

Activer les traces de la pile "full". Par défaut, Mocha tente de distiller les traces de pile en une sortie moins bruyante (bien que toujours utile).

Ce drapeau est utile pour déboguer un problème suspect dans Mocha ou Node.js lui-même.

### `--growl, -G`

Activez Growl (ou les notifications au niveau du système d'exploitation, le cas échéant).

Nécessite l'installation de logiciels supplémentaires ; voir la [docs du module Growl] (https://npm.im/growl) pour plus d'informations.

### `--inline-diffs`

Activez les diffs "inline", une sortie alternative pour les chaînes de caractères différentes.

Utile pour travailler avec de grandes chaînes de caractères.

Ne fait rien si une bibliothèque d'affirmations fournit sa propre sortie de diff.

### `--reporter <name>, -R <name>`

Précisez le rapporteur qui sera utilisé, en choisissant par défaut "spec".

Permet d'utiliser des rapporteurs tiers. Par exemple, [mocha-lcov-reporter](https://npm.im/mocha-lcov-reporter) peut être utilisé avec `--reporter mocha-lcov-reporter` après avoir été installé.

### `--reporter-option <option>, -O <option>, --reporter-options <option>`

Fournir des options spécifiques à un rapporteur dans le format *key => value*, par exemple, --reporter tap --reporter-option tapVersion=13.

Tous les reporters n'acceptent pas les options.

Peut être spécifié sous la forme d'une liste délimitée par des virgules.


### `--config <path>`

> Nouveau dans la v6.0.0.

Spécifiez un chemin explicite vers un [fichier de configuration] (https://mochajs.org/#configuring-mocha-nodejs).

Par défaut, Mocha cherchera un fichier de configuration si `--config` n'est pas spécifié ; utilisez `--no-config` pour supprimer ce comportement.

### `--opts <path>`

Supprimée dans la v8.0.0. Veuillez utiliser le [fichier de configuration] (https://mochajs.org/#configuring-mocha-nodejs) à la place.

### `--package <path>`

>Nouveau dans la v6.0.0.

Spécifier un chemin explicite vers un fichier package.json (contenant ostensiblement la configuration dans une propriété moka).

Par défaut, Mocha cherche un `package.json` dans le répertoire de travail courant ou l'ancêtre le plus proche, et utilisera le premier fichier trouvé (qu'il contienne ou non une propriété `mocha`) ; pour supprimer la recherche de `package.json`, utilisez `--no-package`.

### `--extension <ext>`

Les fichiers ayant cette extension seront considérés comme des fichiers tests. La valeur par défaut est js.

Spécifier `--extension` supprimera `.js` comme extension de fichier de test ; utiliser `--extension js` pour le réajouter. Par exemple, pour charger les fichiers de test `.mjs` et `.js`, vous devez fournir `--extension mjs --extension js`.

L'option peut être donnée plusieurs fois. L'option accepte une liste délimitée par des virgules : L'extension a,b est équivalente à l'extension a --extension b

###` --file <file|directory|glob>`

> ATTENTION : `--file` est incompatible avec le [mode parallèle.](https://mochajs.org/#parallel-tests)

Inclure explicitement un fichier test à charger avant les autres fichiers test. Les utilisations multiples de `--file` sont autorisées, et seront chargées dans l'ordre donné.

Utile si vous voulez déclarer, par exemple, que les hooks doivent être exécutés avant chaque test sur tous les autres fichiers de test.

Les fichiers spécifiés de cette façon ne sont pas affectés par `--sort` ou `--recursive`.

Les fichiers spécifiés de cette manière doivent contenir une ou plusieurs suites, tests ou hooks. Si ce n'est pas le cas, considérez plutôt `--require`.

###` --ignore <file|directory|glob>, --exclude <file|directory|glob>,`

Ignorer (exclure) explicitement un ou plusieurs fichiers, répertoires ou globs de test (par exemple, "certains/**/fichiers*") qui seraient autrement chargés.

Les fichiers spécifiés à l'aide de `--file` ne sont pas concernés par cette option.

Peut être spécifié plusieurs fois.

### `--recursive`

Lorsque vous recherchez des fichiers de test, récursez dans les sous-répertoires.

Voir `--extension` pour définir quels fichiers sont considérés comme des fichiers de test.

### `--require <module>, -r <module>`

Nécessite un module avant de charger l'interface utilisateur ou les fichiers de test. Ceci est utile pour :
| Les harnais de test | Les modules ECMAScript instantanés via [esm](https://npm.im/esm) |
|--|--|
| Les bibliothèques d'affirmation qui augmentent la portée intégrée ou globale (comme [should.js](https://npm.im/should)) | Des compilateurs tels que Babel via [@babel/register](https://npm.im/@babel/register) ou TypeScript via [ts-node](https://npm.im/ts-node) (en utilisant --requiert `ts-node/register`). Voir les exemples de travail [Babel](https://github.com/mochajs/mocha-examples/tree/master/packages/babel) ou [TypeScript](https://github.com/mochajs/mocha-examples/tree/master/packages/typescript). |

Les modules requis de cette manière sont censés fonctionner de manière synchrone ; Mocha n'attendra pas que les tâches asynchrones d'un module requis soient terminées.

**Vous ne pouvez pas utiliser `--require` pour mettre des crochets**. Si vous voulez mettre des hooks en place, par exemple, avant chaque test, utilisez un [Root Hook Plugin.](https://mochajs.org/#root-hook-plugins)

>Depuis la version 8.0.0, Mocha prend en charge l'exigence de [NodeJS native ESM] (https://mochajs.org/#nodejs-native-esm-support). Il n'y a pas de drapeau `--import` séparé.

### `--sort, -S`

>ATTENTION : `--sort` est incompatible avec le [mode parallèle.](https://mochajs.org/#parallel-tests)

Trier les fichiers de test (par chemin absolu) en utilisant [Array.prototype.sort.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

### `--watch, -w`

Répéter les tests sur les modifications de fichiers.

Les options `--watch-files` et `--watch-ignore` peuvent être utilisées pour contrôler quels fichiers sont surveillés pour les changements.

Les tests peuvent être relancés manuellement en tapant ⓡ ⓢ ⏎ (même raccourci que `nodemon`).

### `--watch-files <file|directory|glob>`

>Nouveau dans la v7.0.0

Liste des chemins ou des globs à surveiller quand `--watch` est activé. Si un fichier correspondant au glob donné change ou est ajouté ou supprimé, mocha relancera tous les tests.

Si le chemin est un répertoire, tous les fichiers et sous-répertoires seront surveillés.

Par défaut, tous les fichiers dans le répertoire courant ayant une des extensions fournies par `--extension` et non contenus dans les dossiers `node_modules` ou `.git` sont surveillés.

L'option peut être donnée plusieurs fois. L'option accepte une liste délimitée par des virgules : `--watch-files a,b` est équivalent à `--watch-files a --watch-files b`

### `--watch-ignore <file|directory|glob>`

>Nouveau dans la v7.0.0
Liste des chemins ou des globs à exclure de l'observation. Les valeurs par défaut sont `node_modules` et `.git`.

Pour exclure tous les fichiers d'un répertoire, il est préférable d'utiliser `foo/bar` au lieu de `foo/bar/**/*`. Ce dernier surveillera toujours le répertoire foo/bar mais ignorera toutes les modifications du contenu de ce répertoire.

L'option peut être donnée plusieurs fois. L'option accepte une liste délimitée par des virgules : `--watch-ignore a,b `est équivalent à `--watch-ignore a --watch-ignore b`

### `--fgrep <string>, -f <string>`

>Rupture de changement dans la v6.0.0 ; maintenant mutuellement exclusif avec `--grep`.

Faire en sorte que Mocha n'exécute que les tests dont les titres contiennent la chaîne donnée.

Mutuellement exclusif avec --grep.

### `--grep <regexp>, -g <regexp>`

>Rupture de changement dans la v6.0.0 ; maintenant mutuellement exclusifs avec `--fgrep`.

Mocha n'exécute plus que les tests correspondant à la `regexp` donnée, qui est compilée en interne dans un [RegExp] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Regexp).

Supposons, par exemple, que vous avez des tests liés à "api", ainsi que des tests liés à "app", comme le montre l'extrait suivant ; On pourrait utiliser `--grep api` ou `--grep app` pour exécuter l'un ou l'autre. Il en va de même pour toute autre partie d'une suite ou d'un titre de scénario de test, les "utilisateurs de grep" seraient également valables, ou même "grep GET".

``` js
describe('api', fonction () {
  describe('GET /api/users', fonction () {
    it('respond with an array of users', function () {
      // ...
    }) ;
  }) ;
}) ;

describe('app', fonction () {
  describe('GET /users', fonction () {
    it('respond with an array of users', function () {
      // ...
    }) ;
  }) ;
}) ;
```
Mutuellement exclusif avec `--fgrep`.

### `--invert`

Utilisez l'inverse de la correspondance spécifiée par --grep ou fgrep.

Nécessite soit --grep soit --fgrep (mais pas les deux).

### `--inspect, --inspect-brk, inspect`

>Rupture de changement dans la v7.0.0 ; `--debug` / `--debug-brk` sont supprimés et `debug` est déprécié.

Active l'inspecteur de Node.js.

Utilisez `--inspect` / `--inspect-brk` pour lancer l'inspecteur V8 à utiliser avec Chrome Dev Tools.

Utilisez `inspect` pour lancer le débogueur interne de Node.js.

Toutes ces options sont mutuellement exclusives.

Implique `--no-timeout`.

### `--parallel, -p`

>Nouveau dans la v.8.0.0.

Utilisez le drapeau `-parallèle` pour effectuer des tests dans un groupe de travailleurs.

Chaque fichier de test sera mis dans une file d'attente et exécuté au fur et à mesure que les travailleurs deviennent disponibles.

AVIS : `--parallèle` a certaines implications sur le comportement de Mocha dont vous devez être conscient. En savoir plus sur l'exécution de tests en parallèle.

### `--jobs <count>, -j <count>`

>Nouveau dans la v.8.0.0.

Utilisez `--jobs <count>` pour spécifier le nombre maximum de processus dans le pool de travailleurs.

La valeur par défaut est le nombre de cœurs CPU moins 1.

Astuce : Utilisez `--jobs 0` ou `--jobs 1` pour désactiver temporairement le `--parallèle`.

N'a aucun effet à moins d'être utilisé avec `--parallèle`.

### ABOUT OPTION TYPES

>Mise à jour dans la v6.0.0.

Chaque drapeau annoté de type [booléen] dans la sortie --help de Mocha peut être annulé en ajoutant `--no-` au nom du drapeau. Par exemple, `--no-color` désactivera la sortie couleur de Mocha, qui est activée par défaut.

Sauf indication contraire, tous les drapeaux booléens sont par défaut "false".

### ABOUT node FLAGS

L'exécutable mocha supporte tous les drapeaux applicables que l'exécutable "node" supporte.

Ces drapeaux varient en fonction de votre version de Node.js.

Les drapeaux de nœud peuvent être définis dans la [configuration] de Mocha (https://mochajs.org/#configuring-mocha-nodejs).

`--enable-source-maps` (activer les cartes sources)
>Nouveau dans Node.js v12.12.0

Si le drapeau [`--enable-source-maps`](https://nodejs.org/dist/latest-v12.x/docs/api/cli.html#cli_enable_source_maps) est passé à moka, les cartes sources seront collectées et utilisées pour fournir des traces précises de la pile pour le code transposé :
```
Erreur : cool
    à Object.<anonymous> (/Users/fake-user/bigco/nodejs-tasks/build/src/index.js:27:7)
        -> /Users/fake-user/bigco/nodejs-tasks/src/index.ts:24:7
```

### ABOUT V8 FLAGS

Pour l'utiliser, ajoutez `--v8-` à n'importe quel drapeau listé dans la sortie de `node --v8-options` (à l'exclusion de `--v8-options lui-même`).

Les drapeaux V8 peuvent être définis dans la [configuration] de Mocha (https://mochajs.org/#configuring-mocha-nodejs).
