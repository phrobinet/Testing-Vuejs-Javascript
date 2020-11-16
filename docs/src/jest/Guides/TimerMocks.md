---
id: timer-mocks
title: Timer fictif
---

# Timer fictifs

Les fonctions de temporisation natives (c'est-à-dire `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`) sont loin d'être idéales pour un environnement de test puisqu'elles dépendent du temps réel pour s'écouler. Jest peut remplacer les temporisateurs par des fonctions qui vous permettent de contrôler le passage du temps. [Great Scott !](https://www.youtube.com/watch?v=QZoJ2Pt27BY)

```javascript
// timerGame.js
'use strict';

function timerGame(callback) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 1000);
}

module.exports = timerGame;
```

```javascript
// __tests__/timerGame-test.js
'use strict';

jest.useFakeTimers();

test('waits 1 second before ending the game', () => {
  const timerGame = require('../timerGame');
  timerGame();

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});
```

Ici, nous activons les faux chronomètres en appelant `jest.useFakeTimers();`. Cela permet de simuler setTimeout et d'autres fonctions de minuterie avec des fonctions fictives. Si vous exécutez plusieurs tests dans un fichier ou un bloc de description, `jest.useFakeTimers();` peut être appelé avant chaque test manuellement ou avec une fonction de configuration telle que `beforeEach`. Si vous ne le faites pas, le compteur d'utilisation interne ne sera pas remis à zéro.

## Run All Timers

Un autre test que nous pourrions vouloir écrire pour ce module est celui qui affirme que le rappel est appelé après 1 seconde. Pour ce faire, nous allons utiliser les API de contrôle de la minuterie de Jest pour avancer rapidement le temps en plein milieu du test :

```javascript
test('calls the callback after 1 second', () => {
  const timerGame = require('../timerGame');
  const callback = jest.fn();

  timerGame(callback);

  // A l'heure actuelle, le rappel n'aurait pas encore dû être effectuer
  expect(callback).not.toBeCalled();

  // Avance rapide jusqu'à ce que toutes les minuteries aient été exécutées
  jest.runAllTimers();

  // Maintenant, notre rappel aurait dû être appelé !
  expect(callback).toBeCalled();
  expect(callback).toHaveBeenCalledTimes(1);
});
```

## Minuteries en attente

Il existe aussi des scénarios où vous pourriez avoir un minuteur récursif, c'est-à-dire un minuteur qui fixe un nouveau minuteur dans son propre rappel. Pour ces cas, faire tourner tous les timers serait une boucle sans fin... donc quelque chose comme `jest.runAllTimers()` n'est pas souhaitable. Pour ces cas, vous pouvez utiliser `jest.runOnlyPendingTimers()` :

```javascript
// infiniteTimerGame.js
'use strict';

function infiniteTimerGame(callback) {
  console.log('Ready....go!');

  setTimeout(() => {
    console.log("Time's up! 10 seconds before the next game starts...");
    callback && callback();

    // Programmer le prochain match dans 10 secondes
    setTimeout(() => {
      infiniteTimerGame(callback);
    }, 10000);
  }, 1000);
}

module.exports = infiniteTimerGame;
```

```javascript
// __tests__/infiniteTimerGame-test.js
'use strict';

jest.useFakeTimers();

describe('infiniteTimerGame', () => {
  test('schedules a 10-second timer after 1 second', () => {
    const infiniteTimerGame = require('../infiniteTimerGame');
    const callback = jest.fn();

    infiniteTimerGame(callback);

    // À ce stade, il aurait dû y avoir un seul appel à
    // setTimeout pour programmer la fin du match en 1 seconde.
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    // Avance rapide et épuisement uniquement des chronomètres actuellement en cours
    // (mais pas les nouveaux minuteurs qui sont créés au cours de ce processus)
    jest.runOnlyPendingTimers();

    // A ce stade, notre chronomètre de 1 seconde aurait dû déclencher son rappel
    expect(callback).toBeCalled();

    // Et il aurait dû créer un nouveau minuteur pour recommencer le jeu en
    // 10 secondes
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
  });
});
```

## Minuteurs avancés par temps

##### Renommer de `runTimersToTime` à `advanceTimersByTime` dans Jest **22.0.0**

Une autre possibilité est d'utiliser `jest.advanceTimersByTime(msToRun)`. Lorsque cette API est appelée, tous les timers sont avancés de "msToRun" millisecondes. Toutes les "macro-tâches" en attente qui ont été mises en file d'attente via setTimeout() ou setInterval(), et qui seraient exécutées pendant ce laps de temps, seront exécutées. En outre, si ces macro-tâches prévoient de nouvelles macro-tâches qui seraient exécutées dans le même délai, celles-ci seront exécutées jusqu'à ce qu'il ne reste plus de macro-tâches dans la file d'attente qui devraient être exécutées dans les msToRun millisecondes.

```javascript
// timerGame.js
'use strict';

function timerGame(callback) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 1000);
}

module.exports = timerGame;
```

```javascript
it('calls the callback after 1 second via advanceTimersByTime', () => {
  const timerGame = require('../timerGame');
  const callback = jest.fn();

  timerGame(callback);

  // À ce stade, le rappel ne devrait pas encore avoir été appelé
  expect(callback).not.toBeCalled();

  // Avance rapide jusqu'à ce que toutes les minuteries aient été exécutées
  jest.advanceTimersByTime(1000);

  // Maintenant, notre rappel aurait dû être appelé !
  expect(callback).toBeCalled();
  expect(callback).toHaveBeenCalledTimes(1);
});
```

Enfin, il peut parfois être utile, dans certains tests, de pouvoir effacer tous les chronomètres en attente. Pour cela, nous avons `jest.clearAllTimers()`.

Le code de cet exemple est disponible à l'adresse [exemples/timer].(https://github.com/facebook/jest/tree/master/examples/timer).
