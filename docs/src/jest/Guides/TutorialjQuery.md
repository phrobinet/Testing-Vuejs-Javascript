---
id: tutorial-jquery
title: Manipulation du DOM
---

# Manipulation du DOM

Une autre classe de fonctions souvent considérée comme difficile à tester est le code qui manipule directement le DOM. Voyons comment nous pouvons tester l'extrait suivant de code jQuery qui écoute un événement de clic, récupère certaines données de manière asynchrone et définit le contenu d'un span.

```javascript
// displayUser.js
'use strict';

const $ = require('jquery');
const fetchCurrentUser = require('./fetchCurrentUser.js');

$('#button').click(() => {
  fetchCurrentUser(user => {
    const loggedText = 'Logged ' + (user.loggedIn ? 'In' : 'Out');
    $('#username').text(user.fullName + ' - ' + loggedText);
  });
});
```

Là encore, nous créons un fichier test dans le dossier `__tests__/` :

```javascript
// __tests__/displayUser-test.js
'use strict';

jest.mock('../fetchCurrentUser');

test('displays a user after a click', () => {
  // Mettre en place notre corps de documents
  document.body.innerHTML =
    '<div>' +
    '  <span id="username" />' +
    '  <button id="button" />' +
    '</div>';

  // Ce module a un effet secondaire
  require('../displayUser');

  const $ = require('jquery');
  const fetchCurrentUser = require('../fetchCurrentUser');

  // Dites à la fonction fictive fetchCurrentUser d'invoquer automatiquement
  // son rappel avec quelques données
  fetchCurrentUser.mockImplementation(cb => {
    cb({
      fullName: 'Johnny Cash',
      loggedIn: true,
    });
  });

  // Utiliser jquery pour émuler un clic sur notre bouton
  $('#button').click();

  // affirment que la fonction fetchCurrentUser a été appelée, et que la
  // Le texte intérieur de #username span a été mis à jour comme on pouvait s'y attendre.
  expect(fetchCurrentUser).toBeCalled();
  expect($('#username').text()).toEqual('Johnny Cash - Logged In');
});
```

La fonction testée ajoute un auditeur d'événements sur l'élément DOM "#button", nous devons donc configurer correctement notre DOM pour le test. Jest est livré avec `jsdom` qui simule un environnement DOM comme si vous étiez dans le navigateur. Cela signifie que chaque API DOM que nous appelons peut être observée de la même manière qu'elle le serait dans un navigateur !

Nous allons simuler `fetchCurrentUser.js` afin que notre test ne fasse pas une vraie requête de réseau mais qu'il se résolve plutôt à simuler des données localement. Cela garantit que notre test peut se terminer en quelques millisecondes plutôt qu'en quelques secondes et garantit une vitesse d'itération de test unitaire rapide.

Le code de cet exemple est disponible à l'adresse [examples/jquery](https://github.com/facebook/jest/tree/master/examples/jquery).
