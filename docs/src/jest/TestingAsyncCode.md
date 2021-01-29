---
id: asynchronous
title: Testing Asynchronous Code
---

# Tester le code asynchrone

Il est courant en JavaScript que le code s'exécute de manière asynchrone. Lorsque vous avez du code qui s'exécute de manière asynchrone, Jest doit savoir quand le code qu'il teste est terminé, avant de pouvoir passer à un autre test. Jest dispose de plusieurs moyens pour gérer cela.

## Callbacks

Le schéma asynchrone le plus courant est celui des callbacks.

Par exemple, disons que vous avez une fonction `fetchData(callback)` qui va chercher des données et appelle `callback(data)` quand elle est terminée. Vous voulez tester que les données renvoyées sont la chaîne `'peanut butter'`.

Par défaut, les tests de Jest se terminent lorsqu'ils atteignent la fin de leur exécution. Cela signifie que ce test ne fonctionnera _pas_ comme prévu :

```js
// Ne pas faire ça!
test('the data is peanut butter', () => {
  function callback(data) {
    expect(data).toBe('peanut butter');
  }

  fetchData(callback);
});
```

Le problème est que le test se terminera dès que `fetchData` sera terminé, avant même d'appeler le rappel.

Il existe une autre forme de `test` qui résout ce problème. Au lieu de mettre le test dans une fonction avec un argument vide, utilisez un seul argument appelé `done`. Jest attendra que le callback `done` soit appelé avant de terminer le test.

```js
test('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```

Si `done()` n'est jamais appelé, le test échouera (avec une erreur de délai d'attente), ce qui est ce que vous voulez qu'il se produise.

Si l'instruction `expect` échoue, elle lance une erreur et `done()` n'est pas appelé. Si nous voulons voir dans le journal de test pourquoi il a échoué, nous devons envelopper `expect` dans un bloc `try` et passer l'erreur dans le bloc `catch` à `done`. Sinon, nous nous retrouvons avec une erreur de temporisation opaque qui ne montre pas quelle valeur a été reçue par `expect(data)`.

## Promises

Si votre code utilise des promesses, il existe un moyen plus simple de gérer les tests asynchrones. Renvoyez une promesse de votre test, et Jest attendra que cette promesse soit résolue. Si la promesse est rejetée, le test échouera automatiquement.

Par exemple, disons que `fetchData`, au lieu d'utiliser un callback, retourne une promesse qui est censée se résoudre à la chaîne `peanut butter`. Nous pourrions le tester avec :

```js
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

Assurez-vous de renvoyer la promesse - si vous omettez cette déclaration de `return`, votre test se terminera avant que la promesse renvoyée par `fetchData` ne soit résolue et que () n'ait une chance d'exécuter le rappel.

Si vous pensez qu'une promesse va être rejetée, utilisez la méthode `catch`. Veillez à ajouter `expect.assertions` pour vérifier qu'un certain nombre d'affirmations sont appelées. Sinon, une promesse tenue ne sera pas rejetée.

```js
test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchData().catch(e => expect(e).toMatch('error'));
});
```

## `.resolves` / `.rejects`

Vous pouvez également utiliser le marqueur `.resolves` dans votre déclaration d'attente, et Jest attendra que cette promesse se réalise. Si la promesse est rejetée, le test échouera automatiquement.

```js
test('the data is peanut butter', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});
```

Assurez-vous de renvoyer l'affirmation - si vous omettez cette déclaration de `return`, votre test se terminera avant que la promesse renvoyée par `fetchData` ne soit résolue et que () ait une chance d'exécuter le rappel.

Si vous vous attendez à ce qu'une promesse soit rejetée, utilisez l'appariement `rejects`. Il fonctionne de manière analogue à l'appariement `.resolves`. Si la promesse est remplie, le test échouera automatiquement.

```js
test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
});
```

## Async/Await

Parallèlement, vous pouvez utiliser `async` et `await` dans vos tests. Pour écrire un test async, utilisez le mot clés `async` devant la fonction passée à `test`. Par exemple, le même scénario peut-être testé avec :

```js
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```

Vous pouvez combiner `async` at `await` avec `.resolves` ou `.rejects`.

```js
test('the data is peanut butter', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  await expect(fetchData()).rejects.toThrow('error');
});
```

Dans ces cas, les termes `async` et `await` sont en fait des sucres syntaxiques pour la même logique que celle utilisée dans l'exemple des promesses.

Aucune de ces formes n'est particulièrement supérieure aux autres, et vous pouvez les mélanger et les faire correspondre à travers une base de code ou même dans un seul fichier. Cela dépend simplement du style que vous jugez plus simple pour vos tests.
