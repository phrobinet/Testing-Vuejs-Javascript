# PARALLEL TESTS

>Nouveau dans la v.8.0.0.

Selon le nombre et la nature de vos tests, vous pouvez trouver un avantage significatif en termes de performance lorsque vous effectuez des tests en parallèle (en utilisant le drapeau "-parallèle").

Les tests parallèles devraient fonctionner sans problème pour de nombreux cas d'utilisation. Cependant, vous devez être conscient de certaines implications importantes du comportement.

>Note : Les auteurs de bibliothèques tierces construites sur Mocha devraient lire ceci !

## LIMITATIONS DU RAPPORTEUR

En raison de la nature des rapporteurs suivants, ils ne peuvent pas travailler lorsqu'ils effectuent des tests en parallèle :

 - [`markdown`](https://mochajs.org/#markdown) 
 - [`progress`](https://mochajs.org/#progress) 
 - [`json-stream`](https://mochajs.org/#json-stream)

Ces rqpporteurs attendent de Mocha qu'il sache combien de tests il prévoit d'effectuer avant l'exécution. Cette information n'est pas disponible en mode parallèle, car les fichiers de test ne sont chargés que lorsqu'ils sont sur le point d'être exécutés.

En mode série, les résultats des tests seront "diffusés" au fur et à mesure qu'ils se produiront. En mode parallèle, la sortie du rapporteur est mise en mémoire tampon ; le rapport sera produit après l'achèvement de chaque fichier. En pratique, la sortie du rapporteur apparaîtra en "morceaux" (mais sera sinon identique). Si un fichier test est particulièrement lent, il peut y avoir une pause importante pendant son exécution.

## LES TESTS EXCLUSIFS NE SONT PAS AUTORISÉS
Vous ne pouvez pas utiliser `it.only`, `describe.only`, `this.only()`, **etc., en mode parallèle**. C'est pour la même raison que les rapporteurs incompatibles mentionnés ci-dessus : en mode parallèle, Mocha ne charge pas tous les fichiers et suites en mémoire avant de lancer les tests.

Solutions de contournement suggérées :

1. Utilisew pultôt [`--grep`](https://mochajs.org/#-grep-regexp-g-regexp) ou [`--fgrep`](http://localhost:8080/#-fgrep-string-f-string) ce n'est pas particulièrement efficace, mais cela fonctionnera.
2. N'utilisez pas le mode parallèle. Il est probable que vous ne ferez pas beaucoup de tests exclusifs, donc vous ne verrez pas de grand avantage à utiliser le mode parallèle de toute façon.
>ASTUCE : Si le mode parallèle est défini dans votre fichier de configuration, vous pouvez le désactiver temporairement sur la ligne de commande en utilisant soit le drapeau `--no-parallèle` soit en réduisant le nombre de travaux, par exemple, `--jobs=0`.

## L'ORDRE DES FICHIERS EST NON DÉTERMINISTE
En mode parallèle, Mocha ne garantit pas l'ordre dans lequel les fichiers tests seront exécutés, ni le processus de travail qui les exécute.

Pour cette raison, les options suivantes, qui dépendent de l'ordre, ne peuvent pas être utilisées en mode parallèle :

- [`--file`](https://mochajs.org/#-file-filedirectoryglob)
- [`--sort`](https://mochajs.org/#-sort-s)
- [`--delay`](https://mochajs.org/#delayed-root-suite)

## VARIABILITÉ DE LA DURÉE DES TESTS

L'exécution de tests en mode parallèle utilisera naturellement plus de ressources système. Le système d'exploitation peut prendre plus de temps pour programmer et effectuer certaines opérations, en fonction de la charge du système. Pour cette raison, il peut être nécessaire d'augmenter les délais de certains tests soit [globally](https://mochajs.org/#-timeout-ms-t-ms) ou [otherwise](https://mochajs.org/#timeouts).

## “BAIL” IS “BEST EFFORT”

Lorsqu'il est utilisé avec `--bail` (ou `this.bail()`) pour sortir après le premier échec, il est probable que d'autres tests seront effectués en même temps. Le mocha doit arrêter ses processus de travail avant de sortir.

De même, les sous-processus peuvent lancer des exceptions non prises. Lorsqu'il est utilisé avec --uncaught, le Mocha va "bouillonner" cette exception au processus principal, mais doit quand même arrêter ses processus.

Dans tous les cas, Mocha annulera le test "très bientôt".

## LES ROOT HOOKS NE SONT PAS GLOBAUX

>NOTE : Ceci ne s'applique qu'en cas de fonctionnement en mode parallèle.

Un hook racine est un hook dans un fichier de test qui n'est pas défini dans une suite. Un exemple utilisant l'interface `bdd` :

``` js
// test/setup.js

// root hook to run before every test (even in other files)
beforeEach(function () {
  doMySetup();
});

// root hook to run after every test (even in other files)
afterEach(function () {
  doMyTeardown();
});
```

Lorsqu'il est exécuté (dans le mode "série" par défaut) via cette commande :

``` js
mocha --file "./test/setup.js" "./test/**/*.spec.js"
```

`setup.js` sera exécuté en premier, et installera les deux crochets indiqués ci-dessus pour chaque test trouvé dans `./test/**/*.spec.js`.

**L'exemple ci-dessus ne fonctionne pas en mode parallèle.**

Lorsque Mocha fonctionne en mode parallèle, les **fichiers de test ne partagent pas le même processus**, ni la même instance de Mocha. Par conséquent, un crochet de racine hypothétique défini dans le fichier de test A **ne sera pas présent** dans le fichier de test B.

Voici quelques suggestions de contournement :

1. `requérir('./setup.js')` ou `importer './setup.js'` en haut de chaque fichier de test. Il est préférable d'éviter les personnes qui ne veulent pas de la méthode "passe-partout".
2. recommandé : Définir les root hooks dans un fichier "requis", en utilisant le nouveau (également à partir de la v8.0.0) système de plugin root hook.

## PAS DE SUPPORT POUR LES NAVIGATEURS

Le mode parallèle n'est disponible que dans Node.js, pour l'instant.

## API LIMITÉE POUR LES REPORTERS TIERS

Les journalistes tiers peuvent rencontrer des problèmes lorsqu'ils tentent d'accéder à des propriétés inexistantes dans les objets "Test", "Suite" et "Hook". Si un rapporteur tiers ne travaille pas en mode parallèle (mais travaille autrement en mode série), veuillez signaler un problème.

## DÉPANNAGE DU MODE PARALLÈLE

Si vous trouvez que vos tests ne fonctionnent pas correctement w

✅ Assurez-vous que vous utilisez un [reporter pris en charge] (https://mochajs.org/#reporter-limitations).
✅ Assurez-vous que vous n'utilisez pas [d'autres indicateurs non pris en charge] (https://mochajs.org/#file-order-is-non-deterministic).
✅ Vérifiez votre [fichier de configuration](https://mochajs.org/#configuring-mocha-nodejs) ; les options définies dans les fichiers de configuration seront fusionnées avec toute option de ligne de commande.
✅ Recherchez les "root hooks" (ils ressemblent à [this](https://mochajs.org/#root-hooks-are-not-global)) dans vos tests. Déplacez-les dans un [Plugin root hook](https://mochajs.org/#root-hook-plugins).
✅ Les bibliothèques d'assertions, de simulations ou d'autres tests que vous utilisez utilisent-elles des "root hooks" ? Il est possible qu'il faille les migrer pour assurer la compatibilité avec le mode parallèle.
✅ i les tests s'arrêtent inopinément, vous devrez peut-être augmenter le délai d'attente par défaut (via [`--timeout`](https://mochajs.org/#-timeout-ms-t-ms))
Assurez-vous que vos tests ne dépendent pas d'un ordre précis.
✅ Assurez-vous que vos tests ne dépendent pas d'un ordre précis.
✅ Veillez à ce que vos tests se nettoient d'eux-mêmes ; retirez les fichiers temporaires, les poignées, les sockets, etc. N'essayez pas de partager l'état ou les ressources entre les fichiers de test.

## AVERTISSEMENT CONCERNANT LES TESTS EN PARALLÈLE

Certains types de tests ne se prêtent pas aussi bien à une exécution en parallèle. Par exemple, les tests extrêmement sensibles au temps, ou les tests qui adressent des demandes d'E/S à un ensemble limité de ressources (comme l'ouverture de ports, ou l'automatisation de fenêtres de navigateur, l'accès à une base de données de test, ou à un serveur distant, etc.)

Les services de CI en nuage libre peuvent ne pas fournir de conteneur multicœur ou de VM appropriés pour leurs agents de construction. En ce qui concerne les gains de performance attendus en matière de CI : votre kilométrage peut varier. Il peut être utile d'utiliser un conditionnel dans un `.mocharc.js` pour vérifier `process.env.CI`, et ajuster le nombre de tâches comme il convient.

Il est peu probable (mais pas impossible) de voir un gain de performance provenant d'un nombre d'emplois supérieur au nombre de cœurs de processeur disponibles. Cela dit, jouez avec le nombre de tâches - il n'y a pas de solution unique, et les caractéristiques uniques de vos tests détermineront le nombre optimal de tâches ; il se peut même que moins soit plus rapide !

