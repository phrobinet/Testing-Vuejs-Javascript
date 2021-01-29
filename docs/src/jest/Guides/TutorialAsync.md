---
id: tutorial-async
title: Un exemple d'asynchronisation
---

# Un exemple d'asynchronisation

Tout d'abord, activez le support Babel dans Jest comme indiqué dans le guide [Getting Started](GettingStarted.md#using-babel).

Mettons en place un module qui récupère les données de l'utilisateur à partir d'une API et renvoie le nom de l'utilisateur.

```js
// user.js
import request from './request';

export function getUserName(userID) {
  return request('/users/' + userID).then(user => user.name);
}
```

Dans la mise en œuvre ci-dessus, nous attendons du module "request.js" qu'il nous rende une promesse. Nous enchaînons un appel à `then` pour recevoir le nom d'utilisateur.

Imaginez maintenant une implémentation de `request.js` qui va sur le réseau et récupère quelques données utilisateur :

```js
// request.js
const http = require('http');

export default function request(url) {
  return new Promise(resolve => {
    // Ceci est un exemple de requête http, par exemple pour aller chercher
    // les données d'utilisateur d'une API.
    // Ce module est simulé dans __mocks__/request.js
    http.get({path: url}, response => {
      let data = '';
      response.on('data', _data => (data += _data));
      response.on('end', () => resolve(data));
    });
  });
}
```

Comme nous ne voulons pas aller sur le réseau dans notre test, nous allons créer une simulation manuelle pour notre module `request.js` dans le dossier `__mocks__` (le dossier est sensible à la casse, `__MOCKS__` ne fonctionnera pas). Cela pourrait ressembler à quelque chose comme ça :

```js
// __mocks__/request.js
const users = {
  4: {name: 'Mark'},
  5: {name: 'Paul'},
};

export default function request(url) {
  return new Promise((resolve, reject) => {
    const userID = parseInt(url.substr('/users/'.length), 10);
    process.nextTick(() =>
      users[userID]
        ? resolve(users[userID])
        : reject({
            error: 'User with ' + userID + ' not found.',
          }),
    );
  });
}
```

Maintenant, faisons un test pour notre fonctionnalité d'asynchronisation.

```js
// __tests__/user-test.js
jest.mock('../request');

import * as user from '../user';

// L'affirmation pour une promesse doit être retournée.
it('works with promises', () => {
  expect.assertions(1);
  return user.getUserName(4).then(data => expect(data).toEqual('Mark'));
});
```

Nous appelons `jest.mock('../requête')` pour dire à Jest d'utiliser notre fantaisie manuelle. Il s'attend à ce que la valeur de retour soit une Promesse qui va être résolue. Vous pouvez enchaîner autant de promesses que vous le souhaitez et appeler "expect" à tout moment, à condition de renvoyer une promesse à la fin.

## `.resolves`

Il existe une manière moins verbeuse d'utiliser les `resolves` pour déballer la valeur d'une promesse tenue avec tout autre élément de correspondance. Si la promesse est rejetée, l'affirmation échouera.

```js
it('works with resolves', () => {
  expect.assertions(1);
  return expect(user.getUserName(5)).resolves.toEqual('Paul');
});
```

## `async`/`await`

Des tests d'écriture utilisant la syntaxe `async`/`await` sont également possibles. Voici comment vous pourriez écrire les mêmes exemples qu'auparavant :

```js
// async/await peut-être utilisé
it('works with async/await', async () => {
  expect.assertions(1);
  const data = await user.getUserName(4);
  expect(data).toEqual('Mark');
});

// async/await peut-être aussi utilisé avec `.resolves`.
it('works with async/await and resolves', async () => {
  expect.assertions(1);
  await expect(user.getUserName(5)).resolves.toEqual('Paul');
});
```

Pour activer async/await dans votre projet, installez [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) et activez la fonction dans votre fichier `babel.config.js`.

## Traitement des erreurs

Les erreurs peuvent être traitées à l'aide de la méthode `catch`. Assurez-vous d'ajouter `expect.assertions` pour vérifier qu'un certain nombre d'affirmations sont appelées. Sinon, une promesse remplie ne serait pas un échec :

```js
// Test des erreurs d'asynchronisation à l'aide de Promise.catch.
it('tests error with promises', () => {
  expect.assertions(1);
  return user.getUserName(2).catch(e =>
    expect(e).toEqual({
      error: 'User with 2 not found.',
    }),
  );
});

// Ou utilisé async/await.
it('tests error with async/await', async () => {
  expect.assertions(1);
  try {
    await user.getUserName(1);
  } catch (e) {
    expect(e).toEqual({
      error: 'User with 1 not found.',
    });
  }
});
```

## `.rejects`

L'aide `.rejects` fonctionne comme l'aide `.resolves`. Si la promesse est tenue, le test échouera automatiquement. L'aide `expect.assertions(number)` n'est pas obligatoire mais recommandée pour vérifier qu'un certain nombre d'[affirmations](https://jestjs.io/docs/en/expect#expectassertionsnumber) sont appelées pendant un test. Sinon, il est facile d'oublier de `return`/`await` les affirmations `.resolves`.

```js
// Tester les erreurs d'asynchronisation à l'aide de `.rejects`.
it('tests error with rejects', () => {
  expect.assertions(1);
  return expect(user.getUserName(3)).rejects.toEqual({
    error: 'User with 3 not found.',
  });
});

// Ou en utilisant async/await avec `.rejects`.
it('tests error with async/await and rejects', async () => {
  expect.assertions(1);
  await expect(user.getUserName(3)).rejects.toEqual({
    error: 'User with 3 not found.',
  });
});
```

Le code de cet exemple est disponible sur [examples/async](https://github.com/facebook/jest/tree/master/examples/async).

Si vous souhaitez tester des minuteries, comme `setTimeout`, consultez la documentation [Timer mocks](TimerMocks.md).
