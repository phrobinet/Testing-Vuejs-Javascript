# DESKTOP NOTIFICATION SUPPORT

Les notifications de bureau permettent une communication asynchrone des événements sans vous obliger à réagir immédiatement à une notification. Leur apparence et leurs fonctionnalités spécifiques varient selon les plateformes. Elles disparaissent généralement automatiquement après un court délai, mais leur contenu est souvent stocké d'une manière qui vous permet d'accéder aux notifications antérieures.

Growl était une des premières implémentations d'un système de notification pour OS X et Windows, d'où le nom de l'option "Growl" de Mocha.

Une fois activée, lorsque votre suite racine termine l'exécution des tests, une notification devrait apparaître sur le bureau pour vous informer si vos tests ont réussi ou échoué.

## NODE-BASED NOTIFICATIONS

Pour pouvoir utiliser les notifications sur le bureau avec l'interface de ligne de commande (CLI), vous devez d'abord installer un logiciel préalable spécifique à la plate-forme. Les instructions pour ce faire sont disponibles [ici] (https://github.com/mochajs/mocha/wiki/Growl-Notifications).

Activez les notifications de bureau de Mocha comme suit :

```
$ mocha --growl
```

## BROWSER-BASED NOTIFICATIONS

La prise en charge de la notification par le Web est en cours de mise à disposition pour les versions actuelles des navigateurs modernes. Assurez-vous que la version de votre navigateur prend en charge à la fois les [promesses] (https://caniuse.com/#feat=promises) et les [notifications web] (https://caniuse.com/#feat=notifications). Comme l'API de notification a évolué au fil du temps, ne vous attendez pas à ce que la version minimale possible du navigateur fonctionne nécessairement.

Activez les notifications web de Mocha avec une légère modification de votre HTML moka côté client. Ajoutez un appel à `mocha.growl()` avant de lancer vos tests comme indiqué ci-dessous :

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Mocha Tests</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://unpkg.com/mocha/mocha.css" />
  </head>
  <body>
    <div id="mocha"></div>

    <script src="https://unpkg.com/chai/chai.js"></script>
    <script src="https://unpkg.com/mocha/mocha.js"></script>

    <script class="mocha-init">
      mocha.setup('bdd');
      mocha.growl(); // <-- Enables web notifications
    </script>
    <script src="test.spec.js"></script>
    <script class="mocha-exec">
      mocha.run();
    </script>
  </body>
</html>
```
