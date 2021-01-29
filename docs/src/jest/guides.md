
# Tests instantanés

Les tests instantanés sont un outil très utile lorsque vous voulez vous assurer que votre UI ne change pas de manière inattendue.

Un scénario de test snapshot typique rend un composant de l'interface utilisateur, prend un instantané, puis le compare à un fichier snapshot de référence stocké à côté du test. Le test échouera si les deux instantanés ne correspondent pas : soit le changement est inattendu, soit l'instantané de référence doit être mis à jour avec la nouvelle version du composant de l'interface utilisateur.

## Test instantané avec Jest

Une approche similaire peut être adoptée lorsqu'il s'agit de tester vos composants React. Au lieu de rendre l'interface graphique, ce qui nécessiterait de construire l'application entière, vous pouvez utiliser un moteur de rendu de test pour générer rapidement une valeur sérialisable pour votre arbre React. Considérez ce [exemple de test](https://github.com/facebook/jest/blob/master/examples/snapshot/__tests__/link.react.test.js) pour un [composant de lien](https://github.com/facebook/jest/blob/master/examples/snapshot/Link.react.js) :

```javascript
import React from 'react';
import Link from '../Link.react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```

La première fois que ce test est effectué, Jest crée un [fichier instantané] (https://github.com/facebook/jest/blob/master/examples/snapshot/__tests__/__snapshots__/link.react.test.js.snap) qui ressemble à ceci :

```javascript
exports[`renders correctly 1`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Facebook
</a>
`;
```

L'artefact instantané doit être commis en même temps que les changements de code, et examiné dans le cadre de votre processus de révision du code. Jest utilise [pretty-format] (https://github.com/facebook/jest/tree/master/packages/pretty-format) pour rendre les instantanés lisibles par l'homme pendant la révision du code. Lors des tests suivants, Jest compare la sortie rendue avec l'instantané précédent. S'ils correspondent, le test sera réussi. S'ils ne correspondent pas, soit le testeur a trouvé un bug dans votre code (dans ce cas, c'est le composant `<Link>`) qui doit être corrigé, soit l'implémentation a changé et l'instantané doit être mis à jour.

> Note : L'instantané est directement lié aux données que vous rendez - dans notre exemple, il s'agit du composant `<Link />` avec le page prop qui lui est passé. Cela implique que même si un autre fichier a des accessoires manquants (disons, `App.js`) dans le composant `<Link />`, il passera quand même le test car le test ne connaît pas l'utilisation du composant `<Link />` et il est seulement limité au composant `Link.react.js`. De plus, rendre le même composant avec des accessoires différents dans d'autres tests d'instantanés n'affectera pas le premier, car les tests ne se connaissent pas entre eux.

Vous trouverez plus d'informations sur le fonctionnement des tests instantanés et sur la raison pour laquelle nous les avons mis en place sur le [release blog post] (https://jestjs.io/blog/2016/07/27/jest-14.html). Nous vous recommandons de lire [ce billet] (http://benmccormick.org/2016/09/19/testing-with-jest-snapshots-first-impressions/) pour avoir une bonne idée du moment où vous devriez utiliser les tests d'instantanés. Nous vous recommandons également de regarder cette [vidéo egghead] (https://egghead.io/lessons/javascript-use-jest-s-snapshot-testing-feature?pl=testing-javascript-with-jest-a36c4074) sur le test instantané avec Jest.

### Mise à jour des instantanés

Il est facile de repérer quand un test instantané échoue après l'introduction d'un bug. Lorsque cela se produit, corrigez le problème et assurez-vous que vos tests instantanés sont à nouveau réussis. Maintenant, parlons du cas où un test instantané échoue à cause d'un changement intentionnel de l'implémentation.

Une telle situation peut se produire si nous modifions intentionnellement l'adresse vers laquelle le composant Link de notre exemple pointe.

```javascript
// Cas test mis à jour avec un lien vers une adresse différente
it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.instagram.com">Instagram</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```

Dans ce cas, Jest imprimera cette sortie :

![](/img/content/failedSnapshotTest.png)

Comme nous venons de mettre à jour notre composant pour qu'il pointe vers une adresse différente, il est raisonnable de s'attendre à des changements dans l'instantané de ce composant. Notre scénario de test de l'instantané échoue parce que l'instantané de notre composant mis à jour ne correspond plus à l'artefact de l'instantané de ce scénario de test.

Pour résoudre ce problème, nous devrons mettre à jour nos artefacts d'instantané. Vous pouvez lancer Jest avec un drapeau qui lui indiquera de générer à nouveau des instantanés :

```bash
jest --updateSnapshot
```

Allez-y et acceptez les changements en exécutant la commande ci-dessus. Vous pouvez également utiliser l'équivalent du drapeau `-u` à un seul caractère pour générer à nouveau des instantanés si vous préférez. Cela permettra de générer à nouveau des artefacts d'instantanés pour tous les tests d'instantanés qui échouent. Si nous avions d'autres échecs de tests d'instantanés à cause d'un bug involontaire, nous aurions besoin de corriger le bug avant de re-générer des instantanés pour éviter d'enregistrer des instantanés du comportement bogué.

Si vous souhaitez limiter les cas de tests snapshot à re-générer, vous pouvez passer un drapeau supplémentaire `--testNamePattern` pour ne ré-enregistrer des snapshots que pour les tests qui correspondent au pattern.

Vous pouvez tester cette fonctionnalité en clonant le [snapshot example] (https://github.com/facebook/jest/tree/master/examples/snapshot), en modifiant le composant "Link" et en lançant Jest.

### Mode instantané interactif

Les clichés ratés peuvent également être mis à jour de manière interactive en mode veille :

![](/img/content/interactiveSnapshot.png)

Une fois que vous entrez dans le mode instantané interactif, Jest vous fera passer les instantanés ratés un test à la fois et vous donnera la possibilité de revoir les résultats ratés.

De là, vous pouvez choisir de mettre à jour cet instantané ou de passer au suivant :

![](/img/content/interactiveSnapshotUpdate.gif)

Une fois que vous aurez terminé, Jest vous donnera un résumé avant de revenir au mode de surveillance :

![](/img/content/interactiveSnapshotDone.png)

### Instantanés en ligne

Les instantanés en ligne se comportent de manière identique aux instantanés externes (fichiers "snap"), sauf que les valeurs des instantanés sont automatiquement réécrites dans le code source. Cela signifie que vous pouvez bénéficier des avantages des instantanés générés automatiquement sans avoir à passer à un fichier externe pour vous assurer que la bonne valeur a été écrite.

> Les photos en ligne sont alimentées par [Prettier] (https://prettier.io). Pour utiliser les instantanés en ligne, vous devez avoir installé `prettier` dans votre projet. Votre configuration Prettier sera respectée lors de l'écriture des fichiers de test.
>
> Si vous avez installé `prettier` dans un endroit où Jest ne peut pas le trouver, vous pouvez lui dire comment le trouver en utilisant la propriété de configuration [`"prettierPath"`](./Configuration.md#prettierpath-string).

**Exemple :**

D'abord, vous écrirez un test, en appelant `.toMatchInlineSnapshot()` sans arguments :


```javascript
it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="https://prettier.io">Prettier</Link>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot();
});
```

La prochaine fois que vous lancerez Jest, `tree` sera évalué, et un snapshot sera écrit en argument de `toMatchInlineSnapshot` :

```javascript
it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="https://prettier.io">Prettier</Link>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
<a
  className="normal"
  href="https://prettier.io"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Prettier
</a>
`);
});
```

C'est tout ce qu'il y a à faire ! Vous pouvez même mettre à jour les snapshots avec `--updateSnapshot` ou en utilisant la touche `u` en mode `--watch`.

### Les matchers de propriété

Souvent, l'objet que vous souhaitez photographier comporte des champs qui sont générés (comme les ID et les dates). Si vous essayez de prendre un instantané de ces objets, ils forceront l'instantané à échouer à chaque exécution :

```javascript
it('will fail every time', () => {
  const user = {
    createdAt: new Date(),
    id: Math.floor(Math.random() * 20),
    name: 'LeBron James',
  };

  expect(user).toMatchSnapshot();
});

// Snapshot
exports[`will fail every time 1`] = `
Object {
  "createdAt": 2018-05-19T23:36:09.816Z,
  "id": 3,
  "name": "LeBron James",
}
`;
```

Pour ces cas, Jest permet de fournir un appariement asymétrique pour n'importe quel bien. Ces correspondances sont vérifiées avant que l'instantané ne soit écrit ou testé, puis enregistrées dans le fichier de l'instantané au lieu de la valeur reçue :

```javascript
it('will check the matchers and pass', () => {
  const user = {
    createdAt: new Date(),
    id: Math.floor(Math.random() * 20),
    name: 'LeBron James',
  };

  expect(user).toMatchSnapshot({
    createdAt: expect.any(Date),
    id: expect.any(Number),
  });
});

// Snapshot
exports[`will check the matchers and pass 1`] = `
Object {
  "createdAt": Any<Date>,
  "id": Any<Number>,
  "name": "LeBron James",
}
`;
```

Toute valeur donnée qui n'est pas une correspondance sera vérifiée exactement et enregistrée dans l'instantané :

```javascript
it('will check the values and pass', () => {
  const user = {
    createdAt: new Date(),
    name: 'Bond... James Bond',
  };

  expect(user).toMatchSnapshot({
    createdAt: expect.any(Date),
    name: 'Bond... James Bond',
  });
});

// Snapshot
exports[`will check the values and pass 1`] = `
Object {
  "createdAt": Any<Date>,
  "name": 'Bond... James Bond',
}
`;
```

## Meilleures pratiques

Les instantanés sont un outil fantastique pour identifier les changements d'interface inattendus au sein de votre application - que cette interface soit une réponse API, une interface utilisateur, des journaux ou des messages d'erreur. Comme pour toute stratégie de test, il existe des bonnes pratiques que vous devez connaître et des directives que vous devez suivre pour les utiliser efficacement.

### 1. Traiter les instantanés comme du code

Faites des instantanés et examinez-les dans le cadre de votre processus régulier de révision du code. Cela signifie que vous devez traiter les instantanés comme n'importe quel autre type de test ou de code dans votre projet.

Assurez-vous que vos instantanés sont lisibles en les gardant concentrés, courts, et en utilisant des outils qui font respecter ces conventions stylistiques.

Comme mentionné précédemment, Jest utilise [`pretty-format`](https://yarnpkg.com/en/package/pretty-format) pour rendre les instantanés lisibles par l'homme, mais vous pouvez trouver utile d'introduire des outils supplémentaires, comme [`eslint-plugin-jest`](https://yarnpkg.com/en/package/eslint-plugin-jest) avec son option [`no-large-snapshots`](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-large-snapshots.md), ou [`snapshot-diff`](https://yarnpkg.com/en/package/snapshot-diff) avec sa fonction de comparaison d'instantanés de composants, afin de promouvoir des affirmations courtes et ciblées.

L'objectif est de faciliter l'examen des instantanés dans les requêtes pull, et de lutter contre l'habitude de régénérer les instantanés lorsque les suites de test échouent au lieu d'examiner les causes profondes de leur échec.

### 2. Les tests doivent être déterministes

Vos tests doivent être déterministes. Exécuter les mêmes tests plusieurs fois sur un composant qui n'a pas changé devrait produire les mêmes résultats à chaque fois. Vous devez vous assurer que les instantanés générés ne contiennent pas de données spécifiques à la plate-forme ou d'autres données non déterministes.

Par exemple, si vous avez un composant [Clock](https://github.com/facebook/jest/blob/master/examples/snapshot/Clock.react.js) qui utilise `Date.now()`, l'instantané généré par ce composant sera différent à chaque fois que le scénario de test sera exécuté. Dans ce cas, nous pouvons [simuler la méthode Date.now()](MockFunctions.md) pour renvoyer une valeur cohérente à chaque fois que le test est exécuté :

```js
Date.now = jest.fn(() => 1482363367071);
```

Maintenant, à chaque fois que le scénario de test de l'instantané est exécuté, `Date.now()` renverra `1482363367071` de manière cohérente. Cela aura pour conséquence de générer le même instantané pour ce composant, quel que soit le moment où le test est exécuté.

### 3. Utiliser des noms d'instantanés descriptifs

Essayez toujours d'utiliser des noms de tests descriptifs et/ou de clichés pour les instantanés. Les meilleurs noms décrivent le contenu attendu de l'instantané. Il est ainsi plus facile pour les examinateurs de vérifier les instantanés pendant l'examen, et pour quiconque de savoir si un instantané périmé est ou non le bon comportement avant la mise à jour.

Par exemple, comparer :

```js
exports[`<UserName /> should handle some test case`] = `null`;

exports[`<UserName /> should handle some other test case`] = `
<div>
  Alan Turing
</div>
`;
```

A L'adresse suivante :

```js
exports[`<UserName /> should render null`] = `null`;

exports[`<UserName /> should render Alan Turing`] = `
<div>
  Alan Turing
</div>
`;
```

Comme ce dernier décrit exactement ce qui est attendu dans le résultat, il est plus clair de voir quand il est erroné :
```js
exports[`<UserName /> should render null`] = `
<div>
  Alan Turing
</div>
`;

exports[`<UserName /> should render Alan Turing`] = `null`;
```

## Foire aux questions

### Les instantanés sont-ils écrits automatiquement sur les systèmes d'intégration continue (IC) ?

Non, à partir de Jest 20, les snapshots dans Jest ne sont pas automatiquement écrits lorsque Jest est exécuté dans un système de CI sans passer explicitement par `--updateSnapshot`. On s'attend à ce que tous les snapshots fassent partie du code qui est exécuté sur le CI et comme les nouveaux snapshots passent automatiquement, ils ne devraient pas passer un test sur un système de CI. Il est recommandé de toujours valider tous les instantanés et de les garder sous contrôle de version.

### Faut-il commettre des instantanés ?

Oui, tous les fichiers d'instantanés doivent être validés en même temps que les modules qu'ils couvrent et leurs tests. Ils doivent être considérés comme faisant partie d'un test, tout comme la valeur de toute autre affirmation dans Jest. En fait, les instantanés représentent l'état des modules sources à un moment donné. De cette façon, lorsque les modules sources sont modifiés, Jest peut dire ce qui a changé par rapport à la version précédente. Il peut également fournir beaucoup de contexte supplémentaire pendant la révision du code, dans lequel les réviseurs peuvent mieux étudier vos changements.

### Est-ce que les tests instantanés ne fonctionnent qu'avec les composants React ?

Les composants [React](TutorialReact.md) et [React Native](TutorialReactNative.md) sont un bon cas d'utilisation pour les tests d'instantanés. Cependant, les instantanés peuvent capturer n'importe quelle valeur sérialisable et doivent être utilisés chaque fois que l'objectif est de tester si la sortie est correcte. Le dépôt Jest contient de nombreux exemples de test de la sortie de Jest lui-même, de la sortie de la bibliothèque d'affirmations de Jest ainsi que des messages de log de diverses parties de la base de code de Jest. Voir un exemple de [snapshotting CLI output](https://github.com/facebook/jest/blob/master/e2e/__tests__/console.test.ts) dans le dépôt Jest.

### Quelle est la différence entre un test d'instantané et un test de régression visuelle ?

Les tests instantanés et les tests de régression visuelle sont deux moyens distincts de tester les interfaces utilisateur, et ils servent des objectifs différents. Les outils de test de régression visuelle prennent des captures d'écran de pages web et comparent les images résultantes pixel par pixel. Avec le test Snapshot, les valeurs sont sérialisées, stockées dans des fichiers texte et comparées à l'aide d'un algorithme de diffraction. Il y a différents compromis à considérer et nous avons énuméré les raisons pour lesquelles les tests instantanés ont été construits dans le [Jest blog] (https://jestjs.io/blog/2016/07/27/jest-14.html#why-snapshot-testing).

### Les tests instantanés remplacent-ils les tests unitaires ?

Le test instantané n'est qu'une des 20 affirmations qui accompagnent Jest. L'objectif des tests instantanés n'est pas de remplacer les tests unitaires existants, mais d'apporter une valeur ajoutée et de rendre les tests indolores. Dans certains scénarios, les tests instantanés peuvent potentiellement supprimer la nécessité de tests unitaires pour un ensemble particulier de fonctionnalités (par exemple, les composants de réaction), mais ils peuvent également fonctionner ensemble.

### Quelles sont les performances des tests d'instantanés en ce qui concerne la vitesse et la taille des fichiers générés ?

Jest a été réécrit dans un souci de performance, et les tests d'instantanés ne font pas exception. Comme les instantanés sont stockés dans des fichiers texte, cette méthode de test est rapide et fiable. Jest génère un nouveau fichier pour chaque fichier de test qui invoque le "MatchSnapshot". La taille des snapshots est assez petite : Pour référence, la taille de tous les fichiers d'instantanés dans la base de code de Jest elle-même est inférieure à 300 Ko.

### Comment résoudre les conflits dans les fichiers d'instantanés ?

Les fichiers d'instantanés doivent toujours représenter l'état actuel des modules qu'ils couvrent. Par conséquent, si vous fusionnez deux branches et que vous rencontrez un conflit dans les fichiers d'instantanés, vous pouvez soit résoudre le conflit manuellement, soit mettre à jour le fichier d'instantanés en exécutant Jest et en inspectant le résultat.

### Est-il possible d'appliquer les principes de développement piloté par les tests avec des tests instantanés ?

Bien qu'il soit possible d'écrire des fichiers d'instantanés manuellement, cela n'est généralement pas envisageable. Les instantanés aident à déterminer si la sortie des modules couverts par les tests est modifiée, plutôt que de donner des conseils pour concevoir le code en premier lieu.

### La couverture de code fonctionne-t-elle avec les tests instantanés ?

Oui, ainsi qu'avec tout autre test.

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

The`.rejects` helper works like the `.resolves` helper. If the promise is fulfilled, the test will automatically fail. `expect.assertions(number)` is not required but recommended to verify that a certain number of [assertions](https://jestjs.io/docs/en/expect#expectassertionsnumber) are called during a test. It is otherwise easy to forget to `return`/`await` the `.resolves` assertions.
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

# Simulation manuelle

Des simulations manuelles sont utilisées pour masquer les fonctionnalités à l'aide de données fictives. Par exemple, au lieu d'accéder à une ressource distante comme un site web ou une base de données, vous pouvez créer une simulation manuelle qui vous permet d'utiliser de fausses données. Cela garantit que vos tests seront rapides et ne seront pas faussés.

## Modules utilisateurs fictifs

Les simulations manuelles sont définies par l'écriture d'un module dans un sous-répertoire `__mocks__/` immédiatement adjacent au module. Par exemple, pour simuler un module appelé `user` dans le répertoire `models`, créez un fichier appelé `user.js` et placez-le dans le répertoire `models/__mocks`. Notez que le répertoire `__mocks__` est sensible à la casse, donc le fait de nommer le répertoire `__MOCKS__` va casser sur certains systèmes.

> Lorsque nous avons besoin de ce module dans nos tests, il faut explicitement appeler `jest.mock('./moduleName')`.

## Modules de nœuds fictifs

Si le module que vous simulez est un module Node (par exemple : `lodash`), le mock doit être placé dans le répertoire `__mocks__` adjacent à `node_modules` (sauf si vous avez configuré [`roots`](Configuration.md#roots-arraystring) pour pointer vers un dossier autre que la racine du projet) et sera **automatiquement** mocké. Il n'est pas nécessaire d'appeler explicitement `jest.mock('nom_du_module')`.

Les modules scopés peuvent être simulés en créant un fichier dans une structure de répertoire qui correspond au nom du module simulé. Par exemple, pour simuler un module appelé `@scope/project-name`, créez un fichier à `__mocks__/@scope/project-name.js`, en créant le répertoire `@scope/` en conséquence.

> Attention : Si nous voulons simuler les modules de base du Node (par exemple : `fs` ou `path`), alors l'appel explicite de `jest.mock('path')` est **requis**, parce que les modules de base du Node ne sont pas simulés par défaut.

## Exemples

```bash
.
├── config
├── __mocks__
│   └── fs.js
├── models
│   ├── __mocks__
│   │   └── user.js
│   └── user.js
├── node_modules
└── views
```

Lorsqu'une simulation manuelle existe pour un module donné, le système de modules de Jest utilisera ce module en appelant explicitement `jest.mock('moduleName')`. Cependant, lorsque `automock` est défini sur `true`, l'implémentation manuelle de la fantaisie sera utilisée au lieu de la fantaisie créée automatiquement, même si `jest.mock('nomdumodules')` n'est pas appelé. Pour éviter ce comportement, vous devrez appeler explicitement `jest.unmock('nomdumodèle')` dans les tests qui doivent utiliser l'implémentation réelle du module.

> Note : Afin de se moquer correctement, Jest a besoin que `jest.mock('moduleName')` soit dans la même portée que l'instruction `require/import`.

Voici un exemple d'implémentation où nous avons un module qui fournit un résumé de tous les fichiers d'un répertoire donné. Dans ce cas, nous utilisons le module de base (intégré) `fs`.

```javascript
// FileSummarizer.js
'use strict';

const fs = require('fs');

function summarizeFilesInDirectorySync(directory) {
  return fs.readdirSync(directory).map(fileName => ({
    directory,
    fileName,
  }));
}

exports.summarizeFilesInDirectorySync = summarizeFilesInDirectorySync;
```

Comme nous voulons que nos tests évitent de toucher le disques (qui est assez lent et fragile), nous créons une simulation manuelle pour le module `fs` en étendant une maquette automatique. Notre modèle manuel implémentera des versions personnalisées des API `fs` sur lesquelles nous pourrons nous appuyer pour nos tests :

```javascript
// __mocks__/fs.js
'use strict';

const path = require('path');

const fs = jest.createMockFromModule('fs');

// Il s'agit d'une fonction personnalisée que nos tests peuvent utiliser lors de la configuration pour spécifier
// à quoi doivent ressembler les fichiers du système de fichiers `mock` lorsque l'uns des API `fs` est utilisée.
// `fs` APIs are used.
let mockFiles = Object.create(null);
function __setMockFiles(newMockFiles) {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  }
}

// Une version personnalisée de `readdirSync` qui lit à partir de la simulation spéciale
// liste de fichiers établie via __setMockFiles
function readdirSync(directoryPath) {
  return mockFiles[directoryPath] || [];
}

fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;

module.exports = fs;
```

Maintenant, que nous écrivons notre test. Notez que nous devons dire explicitement que nous voulons simuler le module `fs` parce que c'est un module de base de Node :

```javascript
// __tests__/FileSummarizer-test.js
'use strict';

jest.mock('fs');

describe('listFilesInDirectorySync', () => {
  const MOCK_FILE_INFO = {
    '/path/to/file1.js': 'console.log("file1 contents");',
    '/path/to/file2.txt': 'file2 contents',
  };

  beforeEach(() => {
    // Mettre en place des informations fictives sur les fichiers avant chaque test
    require('fs').__setMockFiles(MOCK_FILE_INFO);
  });

  test('includes all files in the directory in the summary', () => {
    const FileSummarizer = require('../FileSummarizer');
    const fileSummary = FileSummarizer.summarizeFilesInDirectorySync(
      '/path/to',
    );

    expect(fileSummary.length).toBe(2);
  });
});
```

L'exemple présenté ici utilise [`jest.createMockFromModule`](JestObjectAPI.md#jestcreatemockfrommodulemodulename) pour générer un modèle automatique, et remplace son comportement par défaut. C'est l'approche recommandée, mais elle est totalement optionnelle. Si vous ne souhaitez pas du tout utiliser la simulation automatique, vous pouvez exporter vos propres fonctions à partir du fichier de simulation. L'inconvénient des simulations entièrement manuelles est qu'elles sont manuelles, ce qui signifie que vous devez les mettre à jour manuellement chaque fois que le module dont elles sont issues change. C'est pourquoi il est préférable d'utiliser ou d'étendre la maquette automatique lorsqu'elle répond à vos besoins.

Pour s'assurer qu'une simulation manuelle et son implémentation réelle restent synchronisées, il peut être utile d'exiger le module réel en utilisant [`jest.requireActual(moduleName)`](JestObjectAPI.md#jestrequireactualmodulename) dans votre simulation manuelle et de la modifier avec les fonctions de la simulation avant de l'exporter.

Le code pour cet exemple est disponible sur le site [examples/manual-mocks](https://github.com/facebook/jest/tree/master/examples/manual-mocks).

## Utilisation avec les importations de modules ES

Si vous utilisez [ES module imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import), vous serez normalement enclin à placer vos déclarations d'importation en haut du fichier test. Mais souvent, vous devez demander à Jest d'utiliser une simulation avant que les modules ne l'utilisent. Pour cette raison, Jest hissera automatiquement les appels `jest.mock` en haut du module (avant toute importation). Pour en savoir plus sur ce système et le voir en action, consultez [ce repo](https://github.com/kentcdodds/how-jest-mocking-works).

## Les méthodes de simulations qui ne sont pas mises en œuvre dans JSDOM

Si certains codes utilisent une méthode que le JSDOM (l'implémentation DOM utilisée par Jest) n'a pas encore mise en œuvre, il n'est pas facile de la tester. C'est par exemple le cas avec `window.matchMedia()`. Jest retourne `TypeError : window.matchMedia n'est pas une fonction` et n'exécute pas correctement le test.

Dans ce cas, la simulation de `matchMedia` dans le fichier de test devrait résoudre le problème :

```js
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // déprécié
    removeListener: jest.fn(), // déprécié
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

Cela fonctionne si `window.matchMedia()` est utilisé dans une fonction (ou méthode) qui est invoquée dans le test. Si `window.matchMedia()` est exécuté directement dans le fichier testé, Jest signale la même erreur. Dans ce cas, la solution est de déplacer la simulation manuelle dans un fichier séparé et d'inclure celui-ci dans le test **before** le fichier testé :

```js
import './matchMedia.mock'; // Doit être importé avant le fichier testé
import {myMethod} from './file-to-test';

describe('myMethod()', () => {
  // Testez la méthode ici...
});
```


# Les classes ES6 fictives

Jest peut-être utilisé pour simuler les classes ES6 qui sont importées dans les fichiers que vous voulez tester.

Les classes ES6 sont des fonctions de construction avec un peu de sucre syntaxique. Par conséquent, toute simulation d'une classe ES6 doit être une fonction d'une classe ES6 réelle (qui est, encore une fois, une autre fonction). Vous pouvez donc les simuler en utilisant des [fonctions simulées](MockFunctions.md)


## Un exemple de classe ES6

Nous utiliserons un exemple inventé d'une classe qui joue des fichiers sonores, `SoundPlayer`, et une classe de consommateurs qui utilise cette classe, `SoundPlayerConsumer`. Nous simulerons `SoundPlayer` dans nos tests pour `SoundPlayerConsumer`.

```javascript
// sound-player.js
export default class SoundPlayer {
  constructor() {
    this.foo = 'bar';
  }

  playSoundFile(fileName) {
    console.log('Playing sound file ' + fileName);
  }
}
```

```javascript
// sound-player-consumer.js
import SoundPlayer from './sound-player';

export default class SoundPlayerConsumer {
  constructor() {
    this.soundPlayer = new SoundPlayer();
  }

  playSomethingCool() {
    const coolSoundFileName = 'song.mp3';
    this.soundPlayer.playSoundFile(coolSoundFileName);
  }
}
```

## Les 4 façons de créer une simulation de classe ES6

### Simulation automatique

Appeler `jest.mock('./sound-player')` renvoie un "mock automatique" utile que vous pouvez utiliser pour espionner les appels au constructeur de la classe et toutes ses méthodes. Il remplace la classe ES6 par un constructeur fictif, et remplace toutes ses méthodes par des [fonctions fictives](MockFunctions.md) qui retournent toujours `undefined`. Les appels de méthodes sont enregistrés dans `theAutomaticMock.mock.instances[index].methodName.mock.calls`.

Veuillez noter que si vous utilisez des fonctions flèches dans vos classes, elles ne feront _pas_ partie de la simulation. La raison en est que les fonctions flèches ne sont pas présentes sur le prototype e l'objet, il s'agit simplement de propriétés contenant une référence à une fonction.

Si vous n'avez pas besoin de remplacer l'implémentation de la classe, c'est l'option la plus facile à mettre en place. Par exemple :

```javascript
import SoundPlayer from './sound-player';
import SoundPlayerConsumer from './sound-player-consumer';
jest.mock('./sound-player'); // SoundPlayer est désormais un constructeur fictif

beforeEach(() => {
 // Effacer toutes les instances et appels au constructeur et toutes les méthodes :
  SoundPlayer.mockClear();
});

it('We can check if the consumer called the class constructor', () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
  expect(SoundPlayer).toHaveBeenCalledTimes(1);
});

it('We can check if the consumer called a method on the class instance', () => {
  // Montrer que mockClear() fonctionne :
  expect(SoundPlayer).not.toHaveBeenCalled();

  const soundPlayerConsumer = new SoundPlayerConsumer();
  // Le constructeur aurait dû être rappelé :
  expect(SoundPlayer).toHaveBeenCalledTimes(1);

  const coolSoundFileName = 'song.mp3';
  soundPlayerConsumer.playSomethingCool();

  // mock.instances est disponible avec des maquettes automatiques :
  const mockSoundPlayerInstance = SoundPlayer.mock.instances[0];
  const mockPlaySoundFile = mockSoundPlayerInstance.playSoundFile;
  expect(mockPlaySoundFile.mock.calls[0][0]).toEqual(coolSoundFileName);
  // Equivalent à la vérification ci-dessus :
  expect(mockPlaySoundFile).toHaveBeenCalledWith(coolSoundFileName);
  expect(mockPlaySoundFile).toHaveBeenCalledTimes(1);
});
```

### Simulation manuelle

Créez une [maquette manuelle] (ManualMocks.md) en enregistrant une implémentation de la simulation dans le dossier `__mocks__`. Cela vous permet de spécifier l'implémentation, et elle peut être utilisée dans tous les fichiers de test.

```javascript
// __mocks__/sound-player.js

// Importez cette exportation nommée dans votre fichier test :
export const mockPlaySoundFile = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  return {playSoundFile: mockPlaySoundFile};
});

export default mock;
```

Importez la simulation et la méthode de la simulation partagés par toutes les instances :

```javascript
// sound-player-consumer.test.js
import SoundPlayer, {mockPlaySoundFile} from './sound-player';
import SoundPlayerConsumer from './sound-player-consumer';
jest.mock('./sound-player'); // SoundPlayer est désormais un constructeur fictif

beforeEach(() => {
  // Effacer toutes les instances et appels au constructeur et toutes les méthodes :
  SoundPlayer.mockClear();
  mockPlaySoundFile.mockClear();
});

it('We can check if the consumer called the class constructor', () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
  expect(SoundPlayer).toHaveBeenCalledTimes(1);
});

it('We can check if the consumer called a method on the class instance', () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
  const coolSoundFileName = 'song.mp3';
  soundPlayerConsumer.playSomethingCool();
  expect(mockPlaySoundFile).toHaveBeenCalledWith(coolSoundFileName);
});
```

### Appeler [`jest.mock()`](JestObjectAPI.md#jestmockmodulename-factory-options) avec le paramètre d'usine du module

`jest.mock(path, moduleFactory)` prend un argument de **module factory**. Une usine de modules est une fonction qui renvoie la simulation.

Afin de simuler une fonction de constructeur, la fabrique de modules doit retourner une fonction de constructeur. En d'autres termes, la fabrique de modules doit être une fonction qui renvoie une fonction - une fonction d'ordre supérieur (HOF).

```javascript
import SoundPlayer from './sound-player';
const mockPlaySoundFile = jest.fn();
jest.mock('./sound-player', () => {
  return jest.fn().mockImplementation(() => {
    return {playSoundFile: mockPlaySoundFile};
  });
});
```

Une limitation avec le paramètre d'usine est que, puisque les appels à `jest.mock()` sont hissés au sommet du fichier, il n'est pas possible de définir d'abord une variable et de l'utiliser ensuite dans l'usine. Une exception est faite pour les variables qui commencent par le mot "mock". C'est à vous de garantir qu'elles seront initialisées à temps ! Par exemple, voici un exemple d'erreur hors champ due à l'utilisation de "fake" au lieu de "mock" dans la déclaration de la variable :

```javascript
// Note: ce sera un échec
import SoundPlayer from './sound-player';
const fakePlaySoundFile = jest.fn();
jest.mock('./sound-player', () => {
  return jest.fn().mockImplementation(() => {
    return {playSoundFile: fakePlaySoundFile};
  });
});
```

### Remplacement de la simulation en utilisant [`mockImplementation()`](MockFunctionAPI.md#mockfnmockimplementationfn) ou [`mockImplementationOnce()`](MockFunctionAPI.md#mockfnmockimplementationoncefn)

Vous pouvez remplacer toutes les simulations ci-dessus afin de modifier l'implémentation, pour un seul test ou pour tous les tests, en appelant `mockImplementation()` sur la simulation existante.

Les appels à jest.mock sont placés en haut du code. Vous pouvez spécifier un objet fictif plus tard, par exemple dans `beforeAll()`, en appelant `mockImplementation()` (ou `mockImplementationOnce()`) sur l'objet fictif existant au lieu d'utiliser le paramètre d'usine. Cela vous permet également de changer la simulation entre les tests, si nécessaire :

```javascript
import SoundPlayer from './sound-player';
import SoundPlayerConsumer from './sound-player-consumer';

jest.mock('./sound-player');

describe('When SoundPlayer throws an error', () => {
  beforeAll(() => {
    SoundPlayer.mockImplementation(() => {
      return {
        playSoundFile: () => {
          throw new Error('Test error');
        },
      };
    });
  });

  it('Should throw an error when calling playSomethingCool', () => {
    const soundPlayerConsumer = new SoundPlayerConsumer();
    expect(() => soundPlayerConsumer.playSomethingCool()).toThrow();
  });
});
```

## En profondeur : Comprendre les fonctions du constructeur fictif

La construction de votre fonction de construction fictive en utilisant `jest.fn().mockImplementation()` fait paraître les ficelles plus compliquées qu'elles ne le sont en réalité. Cette section montre comment vous pouvez créer vos propres simulations pour illustrer le fonctionnement de la simulation.

### Simulation manuelle qui est une autre classe ES6

Si vous définissez une classe ES6 en utilisant le même nom de fichier que la classe fantaisie dans le dossier `__mocks__`, elle servira de fantaisie. Cette classe sera utilisée à la place de la classe réelle. Cela vous permet d'injecter une implémentation de test pour la classe, mais ne fournit pas de moyen d'espionner les appels.

Pour l'exemple inventé, le mock pourrait ressembler à ceci :

```javascript
// __mocks__/sound-player.js
export default class SoundPlayer {
  constructor() {
    console.log('Mock SoundPlayer: constructor was called');
  }

  playSoundFile() {
    console.log('Mock SoundPlayer: playSoundFile was called');
  }
}
```

### Maquette utilisant le paramètre d'usine du module

La fonction module factory passée à `jest.mock(path, moduleFactory)` peut être un HOF qui renvoie une fonction\*. Cela permettra d'appeler `new` sur le mock. Encore une fois, cela permet d'injecter un comportement différent pour les tests, mais ne permet pas d'espionner les appels.

#### \* La fonction d'usine du module doit renvoyer une fonction

Afin de simuler une fonction de constructeur, l'usine de modules doit renvoyer une fonction de constructeur. En d'autres termes, la fabrique de modules doit être une fonction qui renvoie une fonction - une fonction d'ordre supérieur (HOF).

```javascript
jest.mock('./sound-player', () => {
  return function () {
    return {playSoundFile: () => {}};
  };
});
```

**_Note: Les fonctions fléchées  ne fonctionnent pas_**

Notez que la simulation ne peut pas être une fonction fléchée car l'appel de "nouveau" sur une fonction flèchée n'est pas autorisé en JavaScript. Cela ne fonctionnera donc pas :

```javascript
jest.mock('./sound-player', () => {
  return () => {
    // Ne fonctionne pas ; les fonctions fléchées ne peuvent pas être appelées avec de nouvelles
    return {playSoundFile: () => {}};
  };
});
```

Cela entraînera une erreur de type **_TypeError : \_soundPlayer2.default n'est pas un constructor_**, sauf si le code est transposé à ES5, par exemple par `@babel/preset-env`. (ES5 n'a pas de fonctions de flèches ni de classes, donc les deux seront transposées en fonctions simples).

## Garder une trace de l'utilisation (espionnage du simulacre)

L'injection d'une implémentation de test est utile, mais vous voudrez probablement aussi tester si le constructeur de classe et les méthodes sont appelés avec les bons paramètres.

### Espionner le constructeur

Afin de suivre les appels au constructeur, remplacez la fonction renvoyée par le HOF par une fonction fictive Jest. Créez-la avec [`jest.fn()`](JestObjectAPI.md#jestfnimplementation), puis spécifiez son implémentation avec `mockImplementation()`.

```javascript
import SoundPlayer from './sound-player';
jest.mock('./sound-player', () => {
  // Fonctionne et vous permet de vérifier les appels des constructeurs :
  return jest.fn().mockImplementation(() => {
    return {playSoundFile: () => {}};
  });
});
```

Cela nous permettra d'inspecter l'utilisation de notre classe fictive, en utilisant `SoundPlayer.mock.calls` : `expect(SoundPlayer).toHaveBeenCalled();` ou quasi-équivalent : `expect(SoundPlayer.mock.calls.length).toEqual(1);`.

### Se moquer des exportations hors classe de défaut

Si la classe est **not** l'exportation par défaut du module, vous devez renvoyer un objet avec la clé qui est la même que le nom de l'exportation de la classe.

```javascript
import {SoundPlayer} from './sound-player';
jest.mock('./sound-player', () => {
  // Fonctionne et vous permet de vérifier les appels des constructeurs :
  return {
    SoundPlayer: jest.fn().mockImplementation(() => {
      return {playSoundFile: () => {}};
    }),
  };
});
```

### Espionner les méthodes de notre classe

Notre classe simulée devra fournir toutes les fonctions membres (`playSoundFile` dans l'exemple) qui seront appelées pendant nos tests, sinon nous obtiendrons une erreur pour avoir appelé une fonction qui n'existe pas. Mais nous voudrons probablement aussi espionner les appels à ces méthodes, pour nous assurer qu'elles ont été appelées avec les paramètres attendus.

Un nouvel objet sera créé à chaque fois que la fonction de constructeur fictif sera appelée pendant les tests. Pour espionner les appels de méthode dans tous ces objets, nous remplissons `playSoundFile` avec une autre fonction fantaisie, et nous stockons une référence à cette même fonction fantaisie dans notre fichier de test, afin qu'elle soit disponible pendant les tests.
```javascript
import SoundPlayer from './sound-player';
const mockPlaySoundFile = jest.fn();
jest.mock('./sound-player', () => {
  return jest.fn().mockImplementation(() => {
    return {playSoundFile: mockPlaySoundFile};
    // Nous pouvons maintenant suivre les appels à playSoundFile
  });
});
```

L'équivalent manuel simulé serait :

```javascript
// __mocks__/sound-player.js

// Importez cette exportation nommée dans votre fichier test
export const mockPlaySoundFile = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  return {playSoundFile: mockPlaySoundFile};
});

export default mock;
```

L'utilisation est similaire à la fonction d'usine du module, sauf que vous pouvez omettre le second argument de `jest.mock()`, et vous devez importer la méthode fantaisie dans votre fichier de test, puisqu'elle n'y est plus définie. Utilisez pour cela le chemin d'accès original du module ; n'incluez pas `__mocks__`.

### Nettoyage entre les tests


Pour nettoyer l'enregistrement des appels à la fonction du constructeur fictif et à ses méthodes, nous appelons [`mockClear()`](MockFunctionAPI.md#mockfnmockclear) dans la fonction `beforeEach()` :

```javascript
beforeEach(() => {
  SoundPlayer.mockClear();
  mockPlaySoundFile.mockClear();
});
```

## Exemple complet

Voici un fichier de test complet qui utilise le paramètre d'usine du module pour `jest.mock` :

```javascript
// sound-player-consumer.test.js
import SoundPlayerConsumer from './sound-player-consumer';
import SoundPlayer from './sound-player';

const mockPlaySoundFile = jest.fn();
jest.mock('./sound-player', () => {
  return jest.fn().mockImplementation(() => {
    return {playSoundFile: mockPlaySoundFile};
  });
});

beforeEach(() => {
  SoundPlayer.mockClear();
  mockPlaySoundFile.mockClear();
});

it('The consumer should be able to call new() on SoundPlayer', () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
  // S'assurer que le constructeur a créé l'objet :
  expect(soundPlayerConsumer).toBeTruthy();
});

it('We can check if the consumer called the class constructor', () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
  expect(SoundPlayer).toHaveBeenCalledTimes(1);
});

it('We can check if the consumer called a method on the class instance', () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
  const coolSoundFileName = 'song.mp3';
  soundPlayerConsumer.playSomethingCool();
  expect(mockPlaySoundFile.mock.calls[0][0]).toEqual(coolSoundFileName);
});
```


# Contourner la simulation des modules

Jest vous permet de simuler es modules entiers dans vos tests, ce qui peut être utile pour vérifier si votre code appelle correctement les fonctions de ce module. Cependant, il peut arriver que vous souhaitiez utiliser des parties d'un module simulé dans votre fichier _test_, auquel cas vous souhaitez accéder à l'implémentation originale, plutôt qu'à une version simulée.

Envisagez  d'écrire un scénario de test pour cette fonction `createUser` :

```javascript
// createUser.js
import fetch from 'node-fetch';

export const createUser = async () => {
  const response = await fetch('http://website.com/users', {method: 'POST'});
  const userId = await response.text();
  return userId;
};
```

Votre test devra faire la simulation de la fonction `fetch` afin que nous puissions être sûrs qu'elle soit appelée sans faire la demande aux réseaux. Cependant, vous devrez également simuler la valeur de retour de `fetch` avec `Response` (enveloppée dans une `promesse`), car notre fonction l'utilise pour saisir l'Id de l'utilisateur  créé. Vous pouvez donc essayer d'écrire un test comme celui-ci:

```javascript
jest.mock('node-fetch');

import fetch, {Response} from 'node-fetch';

import {createUser} from './createUser';

test('createUser calls fetch with the right args and returns the user id', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response('4')));

  const userId = await createUser();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('http://website.com/users', {
    method: 'POST',
  });
  expect(userId).toBe('4');
});
```

Cependant, si vous exécutez ce test, vous constaterez que la fonction `createUser` échouera, ce qui entraînera l'erreur suivante : `TypeError: response.text is not a function`. Ceci est dû au fait que la classe `Response` que vous avez importée de `node-fetch` a été simulée (à cause de l'appel `jest.mock` en haut du fichier de test) et qu'elle ne se comporte plus comme elle le devrait.

Pour contourner ce genre de problème, Jest fournit l'aide `jest.requireActual`. Pour que le test ci-dessus fonctionne, apportez la modification suivante aux importations dans le fichier de test :

```javascript
// AVANT
jest.mock('node-fetch');
import fetch, {Response} from 'node-fetch';
```

```javascript
// APRES
jest.mock('node-fetch');
import fetch from 'node-fetch';
const {Response} = jest.requireActual('node-fetch');
```

Cela permet à votre fichier de test d'importer l'objet `Response` réel de `node-fetch`, plutôt qu'une version fictive. Cela signifie que le test passera maintenant correctement.


Jest peut être utilisé dans des projets qui utilisent [webpack](https://webpack.js.org/) pour gérer les actifs, les styles et la compilation. webpack _does_ offre des défis uniques par rapport aux autres outils car il s'intègre directement à votre application pour permettre la gestion des feuilles de style, des actifs comme les images et les polices, ainsi que le vaste écosystème de langages et d'outils de compilation vers JavaScript.

## Un exemple de webpack

Commençons par une sorte de fichier de configuration webpack commun et traduisons le en une configuration Jest.

```js
// webpack.config.js
module.exports = {
  module: {
    loaders: [
      {exclude: ['node_modules'], loader: 'babel', test: /\.jsx?$/},
      {loader: 'style-loader!css-loader', test: /\.css$/},
      {loader: 'url-loader', test: /\.gif$/},
      {loader: 'file-loader', test: /\.(ttf|eot|svg)$/},
    ],
  },
  resolve: {
    alias: {
      config$: './configs/app-config.js',
      react: './vendor/react-master',
    },
    extensions: ['', 'js', 'jsx'],
    modules: [
      'node_modules',
      'bower_components',
      'shared',
      '/shared/vendor/modules',
    ],
  },
};
```

Si vous avez des fichiers JavaScript qui sont transformés par Babel, vous pouvez [activer le support pour Babel] (GettingStarted.md#using-babel) en installant le plugin `babel-jest`. Les transformations JavaScript non-Babel peuvent être traitées avec l'option de configuration de Jest [`transform`](Configuration.md#transform-objectstring-pathtotransformer--pathtotransformer-object).

### Gestion des actifs statiques

Ensuite, configurons Jest pour qu'il gère avec élégance les fichiers d'actifs tels que les feuilles de style et les images. Habituellement, ces fichiers ne sont pas particulièrement utiles dans les tests, donc nous pouvons les simuler en toute sécurité. Cependant, si vous utilisez des modules CSS, il est préférable de simuler un proxy pour vos recherches de noms de classe.

```json
// package.json
{
  "jest": {
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    }
  }
}
```

Et les fichiers fictifs eux-mêmes :

```js
// __mocks__/styleMock.js

module.exports = {};
```

```js
// __mocks__/fileMock.js

module.exports = 'test-file-stub';
```

### Modules CSS fictifs

Vous pouvez utiliser un [ES6 Proxy](https://github.com/keyanzhang/identity-obj-proxy) pour simuler les [modules CSS](https://github.com/css-modules/css-modules) :

```bash
yarn add --dev identity-obj-proxy
```

Ensuite, toutes vos recherches className sur l'objet styles seront renvoyées telles quelles (par exemple, `styles.foobar === 'foobar'). C'est très pratique pour le test "React [Snapshot Testing]" (SnapshotTesting.md).

```json
// package.json (for CSS Modules)
{
  "jest": {
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less)$": "identity-obj-proxy"
    }
  }
}
```

> Remarquez que le proxy est activé par défaut dans le nœud 6. Si vous n'êtes pas encore sur le Node 6, assurez-vous que vous invoquez Jest en utilisant `node --harmony_proxies node_modules/.bin/jest`.

Si `moduleNameMapper` ne peut pas répondre à vos besoins, vous pouvez utiliser l'option de configuration de Jest [`transform`](Configuration.md#transform-objectstring-pathtotransformer--pathtotransformer-object) pour spécifier comment les actifs sont transformés. Par exemple, un transformateur qui renvoie le nom de base d'un fichier (tel que `require('logo.jpg');` renvoie `'logo'`) peut être écrit comme :

```js
// fileTransformer.js
const path = require('path');

module.exports = {
  process(src, filename, config, options) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  },
};
```

```json
// package.json (for custom transformers and CSS Modules)
{
  "jest": {
    "moduleNameMapper": {
      "\\.(css|less)$": "identity-obj-proxy"
    },
    "transform": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileTransformer.js"
    }
  }
}
```

Nous avons dit à Jest d'ignorer les fichiers correspondant à une feuille de style ou à une extension d'image, et d'exiger à la place nos fichiers fantaisie. Vous pouvez ajuster l'expression régulière pour qu'elle corresponde aux types de fichiers gérés par la configuration de votre webpack.

Note : si vous utilisez babel-jest avec des préprocesseurs de code supplémentaires, vous devez définir explicitement babel-jest comme un transformateur pour votre code JavaScript afin de faire correspondre les fichiers `.js` au module babel-jest._

```json
"transform": {
  "^.+\\.js$": "babel-jest",
  "^.+\\.css$": "custom-transformer",
  ...
}
```

### Configurer Jest pour trouver nos fichiers

Maintenant que Jest sait comment traiter nos dossiers, nous devons lui dire comment les _trouver_. Pour les options `modulesDirectories` et `extensions` de webpack, il existe des analogues directs dans les options `moduleDirectories` et `moduleFileExtensions` de Jest.

```json
// package.json
{
  "jest": {
    "moduleFileExtensions": ["js", "jsx"],
    "moduleDirectories": ["node_modules", "bower_components", "shared"],

    "moduleNameMapper": {
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
      "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
    }
  }
}
```

> Note : `<rootDir>` est un token spécial qui est remplacé par Jest avec la racine de votre projet. La plupart du temps, ce sera le dossier où se trouve votre `package.json` à moins que vous ne spécifiiez une option `rootDir` personnalisée dans votre configuration.

De même, l'option `resolve.root` de webpack fonctionne comme la variable `NODE_PATH` env, que vous pouvez définir, ou utiliser l'option `modulePaths`.

```json
// package.json
{
  "jest": {
    "modulePaths": ["/shared/vendor/modules"],
    "moduleFileExtensions": ["js", "jsx"],
    "moduleDirectories": ["node_modules", "bower_components", "shared"],
    "moduleNameMapper": {
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
      "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
    }
  }
}
```

Et enfin, nous devons gérer le webpack "alias". Pour cela, nous pouvons à nouveau utiliser l'option "moduleNameMapper".

```json
// package.json
{
  "jest": {
    "modulePaths": ["/shared/vendor/modules"],
    "moduleFileExtensions": ["js", "jsx"],
    "moduleDirectories": ["node_modules", "bower_components", "shared"],

    "moduleNameMapper": {
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
      "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",

      "^react(.*)$": "<rootDir>/vendor/react-master$1",
      "^config$": "<rootDir>/configs/app-config.js"
    }
  }
}
```

C'est tout ! Le webpack est un outil complexe et flexible, vous devrez donc peut-être procéder à quelques ajustements pour répondre aux besoins spécifiques de votre demande. Heureusement, pour la plupart des projets, Jest devrait être plus que suffisamment flexible pour gérer la configuration de votre webpack.

> Note : Pour des configurations de webpack plus complexes, vous pouvez également envisager des projets tels que [babel-plugin-webpack-loaders](https://github.com/istarkov/babel-plugin-webpack-loaders).

## Utilisation avec le webpack 2

webpack 2 offre un support natif pour les modules ES. Cependant, Jest fonctionne en Node, et nécessite donc la transposition des modules ES vers les modules CommonJS. Par conséquent, si vous utilisez le webpack 2, vous voudrez probablement configurer Babel pour transposer les modules ES en modules CommonJS uniquement dans l'environnement "test".

```json
// .babelrc
{
  "presets": [["env", {"modules": false}]],

  "env": {
    "test": {
      "plugins": ["transform-es2015-modules-commonjs"]
    }
  }
}
```

> Note : Jest met en cache des fichiers pour accélérer l'exécution des tests. Si vous avez mis à jour le fichier .babelrc et que Jest ne fonctionne toujours pas, essayez d'exécuter Jest avec `--no-cache`.

Si vous utilisez les importations dynamiques (`import('some-file.js').then(module => ...)`), vous devez activer le plugin `dynamic-import-node`.

```json
// .babelrc
{
  "presets": [["env", {"modules": false}]],

  "plugins": ["syntax-dynamic-import"],

  "env": {
    "test": {
      "plugins": ["dynamic-import-node"]
    }
  }
}
```

Pour un exemple d'utilisation de Jest avec Webpack avec React, Redux, et Node, vous pouvez en voir un [ici](https://github.com/jenniferabowd/jest_react_redux_node_webpack_complex_example).


# L'utilisation de Pupeteer

Avec les API [Global Setup/Teardown](Configuration.md#globalsetup-string) et [Async Test Environment](Configuration.md#testenvironment-string), Jest peut fonctionner sans problème avec [MongoDB](https://www.mongodb.com/).

> La génération de la couverture de code pour les fichiers de test utilisant Puppeteer n'est actuellement pas possible si votre test utilise `page.$eval`, `page.$$eval` ou `page.evaluate` car la fonction passée est exécutée en dehors du champ d'application de Jest. Consultez le [numéro 7962](https://github.com/facebook/jest/issues/7962#issuecomment-495272339) sur GitHub pour une solution de contournement.

## utiliser le préréglage de jest-puppeteer

[Jest Puppeteer](https://github.com/smooth-code/jest-puppeteer) fournit toute la configuration requise pour effectuer vos tests en utilisant Puppeteer.

1.  Tout d'abord, installer `jest-puppeteer`

```
yarn add --dev jest-puppeteer
```

2.  Précisez le préréglage dans votre configuration Jest :

```json
{
  "preset": "jest-puppeteer"
}
```

3.  Ecrire le test

```js
describe('Google', () => {
  beforeAll(async () => {
    await page.goto('https://google.com');
  });

  it('should be titled "Google"', async () => {
    await expect(page.title()).resolves.toMatch('Google');
  });
});
```

Il n'est pas nécessaire de charger des dépendances. Les classes "page" et "navigateur" de Puppeteer seront automatiquement exposées

Voir la [documentation](https://github.com/smooth-code/jest-puppeteer).

## Exemple personnalisé sans préréglage de jest-puppeteer

You can also hook up puppeteer from scratch. The basic idea is to:

1.  launch & file the websocket endpoint of puppeteer with Global Setup
2.  connect to puppeteer from each Test Environment
3.  close puppeteer with Global Teardown

Here's an example of the GlobalSetup script

Vous pouvez également vous procurer un puppeteer en partant de zéro. L'idée de base est de :

1. lancer et classer l'extrémité du websocket de puppeteer avec Global Setup
2. se connecter à puppeteer de chaque environnement de test
3. Le puppeteer de proximité avec Global Teardown

Voici un exemple de script de GlobalSetup

```js
// setup.js
const puppeteer = require('puppeteer');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const os = require('os');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function () {
  const browser = await puppeteer.launch();
  // stocker l'instance du navigateur pour pouvoir la démonter plus tard
  // ce global n'est disponible que dans le démontage mais pas dans TestEnvironments
  global.__BROWSER_GLOBAL__ = browser;

  // utiliser le système de fichiers pour exposer le wsEndpoint pour les TestEnvironments
  mkdirp.sync(DIR);
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};
```

Nous avons ensuite besoin d'un environnement de test personnalisé pour les marionnettistes

```js
// puppeteer_environment.js
const NodeEnvironment = require('jest-environment-node');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const os = require('os');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    // obtenir le wsEndpoint
    const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8');
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }

    // se connecter à puppeteer
    this.global.__BROWSER__ = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    });
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = PuppeteerEnvironment;
```

Enfin, nous pouvons fermer l'instance puppeteer et nettoyer le dossier

```js
// teardown.js
const os = require('os');
const rimraf = require('rimraf');
const path = require('path');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
module.exports = async function () {
  // fermer l'insstance du navigateur
  await global.__BROWSER_GLOBAL__.close();

  // nettoyer le fichier wsEndpoint
  rimraf.sync(DIR);
};
```

Avec tout ce qui a été mis en place, nous pouvons maintenant passer nos tests de cette manière :

```js
// test.js
const timeout = 5000;

describe(
  '/ (Home Page)',
  () => {
    let page;
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto('https://google.com');
    }, timeout);

    it('should load without error', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain('google');
    });
  },
  timeout,
);
```

Enfin, configurez `jest.config.js` pour lire ces fichiers. (Le preset `jest-puppeteer` fait quelque chose comme ça sous le capot).

```js
module.exports = {
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testEnvironment: './puppeteer_environment.js',
};
```

Voici le code de [exemple de travail complet] (https://github.com/xfumihiro/jest-puppeteer-example).


# L'utilisation avec MongoDB

Avec les API [Global Setup/Teardown](Configuration.md#globalsetup-string) et [Async Test Environment](Configuration.md#testenvironment-string), Jest peut fonctionner sans problème avec [MongoDB](https://www.mongodb.com/).

## Utiliser le préréglage jest-mongodb

[Jest MongoDB](https://github.com/shelfio/jest-mongodb) fournit toute la configuration requise pour exécuter vos tests en utilisant MongoDB.

1.  Premièrement installer `@shelf/jest-mongodb`

```
yarn add @shelf/jest-mongodb --dev
```

2.   Précisez le préréglage dans votre configuration Jest :

```json
{
  "preset": "@shelf/jest-mongodb"
}
```

3.  Ecrire votre test

```js
const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});
```

Il n'est pas nécessaire de charger des dépendances.

Voir la [documentation](https://github.com/shelfio/jest-mongodb) pour plus de details (configuring MongoDB version, etc).

# L'utilisation avec DynamoDB

Avec les API [Global Setup/Teardown](Configuration.md#globalsetup-string) et [Async Test Environment](Configuration.md#testenvironment-string), Jest peut fonctionner sans problème avec [DynamoDB](https://aws.amazon.com/dynamodb/).

## Utilisation de  jest-dynamodb Preset

[Jest DynamoDB](https://github.com/shelfio/jest-dynamodb) fournit toute la configuration requise pour effectuer vos tests à l'aide de DynamoDB.

1.  Tout d'abord, installez `@shelf/jest-dynamodb`

```
yarn add @shelf/jest-dynamodb --dev
```

2.  Specify preset in your Jest configuration:

```json
{
  "preset": "@shelf/jest-dynamodb"
}
```

3.  Créer `jest-dynamodb-config.js` et définir les tables DynamoDB

Voir [Créer une API de table](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#createTable-property)

```js
module.exports = {
  tables: [
    {
      TableName: `files`,
      KeySchema: [{AttributeName: 'id', KeyType: 'HASH'}],
      AttributeDefinitions: [{AttributeName: 'id', AttributeType: 'S'}],
      ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
    },
    // etc
  ],
};
```

4.  Configurer le client DynamoDB

```js
const {DocumentClient} = require('aws-sdk/clients/dynamodb');

const isTest = process.env.JEST_WORKER_ID;
const config = {
  convertEmptyValues: true,
  ...(isTest && {
    endpoint: 'localhost:8000',
    sslEnabled: false,
    region: 'local-env',
  }),
};

const ddb = new DocumentClient(config);
```

5.  Ecrire les tests

```js
it('should insert item into table', async () => {
  await ddb
    .put({TableName: 'files', Item: {id: '1', hello: 'world'}})
    .promise();

  const {Item} = await ddb.get({TableName: 'files', Key: {id: '1'}}).promise();

  expect(Item).toEqual({
    id: '1',
    hello: 'world',
  });
});
```

Il n'est pas nécessaire de charger des dépendances.

Voir [documentation](https://github.com/shelfio/jest-dynamodb) pour les détails.

Manipulation du DOM

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


# Les plugins de surveillances

Le système de plugin de montre Jest permet de se connecter à des parties spécifiques de Jest et de définir des invites de menu en mode montre qui exécutent le code sur simple pression d'une touche. Combinées, ces fonctionnalités vous permettent de développer des expériences interactives adaptées à votre flux de travail.

## Watch Plugin Interface

```javascript
class MyWatchPlugin {
  // Ajouter des crochets aux événements du cycle de vie des Jest
  apply(jestHooks) {}

  // Obtenez les informations nécessaires pour les plugins interactifs
  getUsageInfo(globalConfig) {}

  // Exécuté lorsque la clé de `getUsageInfo` est entrée
  run(globalConfig, updateConfigAndRun) {}
}
```

## Hooking into Jest

Pour connecter votre watch plugin à Jest, ajoutez son chemin sous `watchPlugins` dans votre configuration Jest :

```javascript
// jest.config.js
module.exports = {
  // ...
  watchPlugins: ['path/to/yourWatchPlugin'],
};
```

Des plugins de surveillance personnalisés peuvent ajouter des accroches aux événements de Jest. Ces accroches peuvent être ajoutées avec ou sans clé interactive dans le menu du mode montre.

### `apply(jestHooks)`

Des crochets de bouffon peuvent être attachés en appliquant la méthode "Appliquer". Cette méthode reçoit un argument "jestHooks" qui permet au plugin de s'accrocher à des parties spécifiques du cycle de vie d'un test.

```javascript
class MyWatchPlugin {
  apply(jestHooks) {}
}
```

Vous trouverez ci-dessous les crochets disponibles dans Jest.

#### `jestHooks.shouldRunTestSuite(testSuiteInfo)`

Renvoie un booléen (ou `Promise<boolean>` pour la gestion des opérations asynchrones) pour spécifier si un test doit être exécuté ou non.

Par exemple :

```javascript
class MyWatchPlugin {
  apply(jestHooks) {
    jestHooks.shouldRunTestSuite(testSuiteInfo => {
      return testSuiteInfo.testPath.includes('my-keyword');
    });

    // or a promise
    jestHooks.shouldRunTestSuite(testSuiteInfo => {
      return Promise.resolve(testSuiteInfo.testPath.includes('my-keyword'));
    });
  }
}
```

#### `jestHooks.onTestRunComplete(results)`

Il est appelé à la fin de chaque essai. Il a les résultats des tests comme argument.

Par exemple :

```javascript
class MyWatchPlugin {
  apply(jestHooks) {
    jestHooks.onTestRunComplete(results => {
      this._hasSnapshotFailure = results.snapshot.failure;
    });
  }
}
```

#### `jestHooks.onFileChange({projects})`

Est appelé chaque fois qu'il y a un changement dans le système de fichiers

- `projects: Array<config: ProjectConfig, testPaths: Array<string>`: Comprend tous les parcours de test que Jest surveille.

Par exemple :

```javascript
class MyWatchPlugin {
  apply(jestHooks) {
    jestHooks.onFileChange(({projects}) => {
      this._projects = projects;
    });
  }
}
```

## Watch Menu Integration

Les plugins de surveillance personnalisés peuvent également ajouter ou remplacer des fonctionnalités au menu de surveillance en spécifiant une paire clé/guide dans la méthode "GetUsageInfo" et une méthode "Run" pour l'exécution de la clé.

### `getUsageInfo(globalConfig)`

Pour ajouter une clé au menu de surveillance, implémentez la méthode "getUsageInfo", en retournant une clé et l'invite :

```javascript
class MyWatchPlugin {
  getUsageInfo(globalConfig) {
    return {
      key: 's',
      prompt: 'do something',
    };
  }
}
```

Cela ajoutera une ligne dans le menu du mode surveillance _(`› Press s to do something.`)_

```text
Watch Usage
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press s to do something. // <-- This is our plugin
 › Press Enter to trigger a test run.
```

**Note**: Si la clé de votre plugin existe déjà en tant que clé par défaut, votre plugin remplacera cette clé.

### `run(globalConfig, updateConfigAndRun)`

Pour gérer les événements de pression de la touche retournée par "GetUsageInfo", vous pouvez implémenter la méthode "run". Cette méthode renvoie un `Promise<boolean>` qui peut être résolu lorsque le plugin veut renvoyer le contrôle à Jest. Le "booléen" spécifie si Jest doit relancer les tests après avoir récupéré le contrôle.

- `globalConfig`: Une représentation de la configuration globale actuelle de Jest
- `updateConfigAndRun`: Permet de déclencher un essai pendant que le plugin interactif est en cours d'exécution.

```javascript
class MyWatchPlugin {
  run(globalConfig, updateConfigAndRun) {
    // Faire quelque chose.
  }
}
```

**Note**: Si vous appelez `updateConfigAndRun`, votre méthode `run` ne devrait pas se résoudre à une valeur de vérité, car cela déclencherait une double exécution.

#### Authorized configuration keys

Pour des raisons de stabilité et de sécurité, seule une partie des clés de configuration globale peut être mise à jour avec `updateConfigAndRun`. La liste blanche actuelle est la suivante :

- [`bail`](configuration.html#bail-number--boolean)
- [`changedSince`](cli.html#--changedsince)
- [`collectCoverage`](configuration.html#collectcoverage-boolean)
- [`collectCoverageFrom`](configuration.html#collectcoveragefrom-array)
- [`collectCoverageOnlyFrom`](configuration.html#collectcoverageonlyfrom-array)
- [`coverageDirectory`](configuration.html#coveragedirectory-string)
- [`coverageReporters`](configuration.html#coveragereporters-arraystring)
- [`notify`](configuration.html#notify-boolean)
- [`notifyMode`](configuration.html#notifymode-string)
- [`onlyFailures`](configuration.html#onlyfailures-boolean)
- [`reporters`](configuration.html#reporters-arraymodulename--modulename-options)
- [`testNamePattern`](cli.html#--testnamepatternregex)
- [`testPathPattern`](cli.html#--testpathpatternregex)
- [`updateSnapshot`](cli.html#--updatesnapshot)
- [`verbose`](configuration.html#verbose-boolean)

## Customization

Les plugins peuvent être personnalisés via votre configuration Jest.

```javascript
// jest.config.js
module.exports = {
  // ...
  watchPlugins: [
    [
      'path/to/yourWatchPlugin',
      {
        key: 'k', // <- your custom key
        prompt: 'show a custom prompt',
      },
    ],
  ],
};
```

Noms de configuration recommandés :

- `key`: Modifie la clé du plugin.
- `prompt`: Permet à l'utilisateur de personnaliser le texte dans l'invite du plugin.

Si l'utilisateur a fourni une configuration personnalisée, celle-ci sera passée en argument au constructeur du plugin.

```javascript
class MyWatchPlugin {
  constructor({config}) {}
}
```

## Choisir une bonne clé

Jest permet à des plugins tiers de passer outre certaines de ses touches de fonction intégrées, mais pas toutes. Plus précisément, les touches suivantes sont **non écrasables** :

- `c` (efface les modèles de filtre)
- `i` (mise à jour interactives des instantanés non concordants)
- `q` (quitte)
- `u` (met à jour tous les instantanés non concordants)
- `w` (affiche l'utilisation du mode veille / les actions disponibles)

Les touches suivantes pour les fonctionnalités intégrées **peuvent être écrasées** :

- `p` (test du modèle de nom de fichier)
- `t` (nom du modèle de test)

Toute clé non utilisée par la fonctionnalité intégrée peut être réclamée, comme vous pouvez vous y attendre. Essayez d'éviter d'utiliser des touches qui sont difficiles à obtenir sur divers claviers (par exemple "é", "€"), ou qui ne sont pas visibles par défaut (par exemple, de nombreux claviers Mac n'ont pas d'indices visuels pour les caractères tels que "`|`, `\`, `[`, etc.

### Quand un conflit survient

Si votre plugin tente d'écraser une clé réservée, Jest fera une erreur en affichant un message descriptif, par exemple :

> Watch plugin YourFaultyPlugin a tenté d'enregistrer la clé "q", qui est réservée en interne pour quitter le mode surveillance. Veuillez changer la clé de configuration pour ce plugin.

Il est également interdit aux plugins tiers d'écraser une clé déjà réservée par un autre plugin tiers présent plus tôt dans la liste des plugins configurés (paramètre de tableau `watchPlugins`). Lorsque cela se produit, vous recevez également un message d'erreur qui tente de vous aider à corriger ce problème :

> Watch plugins YourFaultyPlugin et TheirFaultyPlugin ont tous deux tenté d'enregistrer la clé `x`. Veuillez modifier la configuration de la clé pour l'un des plugins en conflit afin d'éviter tout chevauchement.


# Migrer vers jest

Si vous souhaitez essayer Jest avec une base de code existante, il y a plusieurs façons de le convertir à Jest :

- Si vous utilisez Jasmine, ou une API similaire à Jasmine (par exemple [Mocha](https://mochajs.org)), Jest devrait être compatible dans la plupart des cas, ce qui rend la migration moins compliquée.
- Si vous utilisez AVA, Expect.js (par Automattic), Jasmine, Mocha, proxyquire, Should.js ou Tape, vous pouvez migrer automatiquement avec les codemods Jest (voir ci-dessous).
- Si vous aimez [chai](http://chaijs.com/), vous pouvez passer à Jest et continuer à utiliser chai. Cependant, nous vous recommandons d'essayer les affirmations de Jest et leurs messages d'échec. Les Codemods de Jest peuvent migrer depuis chai (voir ci-dessous).

## jest-codemods

Si vous utilisez [AVA](https://github.com/avajs/ava), [Chai](https://github.com/chaijs/chai), [Expect.js (by Automattic)](https://github.com/Automattic/expect.js), [Jasmine](https://github.com/jasmine/jasmine), [Mocha](https://github.com/mochajs/mocha), [proxyquire](https://github.com/thlorenz/proxyquire), [Should.js](https://github.com/shouldjs/should.js) ou [Tape](https://github.com/substack/tape), vous pouvez utiliser les [jest-codemods](https://github.com/skovhus/jest-codemods) tiers pour effectuer la plupart des travaux de migration. Il exécute une transformation de code sur votre base de code en utilisant [jscodeshift](https://github.com/facebook/jscodeshift).

Pour transformer vos tests existants, naviguez jusqu'au projet contenant les tests et exécutez :

# Troubleshooting

Euh oh, quelque chose a mal tourné ? Utilisez ce guide pour résoudre les problèmes avec Jest.

## Les tests échouent et vous ne savez pas pourquoi

Essayez d'utiliser le support de débogage intégré à Node. Note : Cela ne fonctionnera que dans Node.js 8+.

Placez une instruction `debugger;` dans l'un de vos tests, puis, dans le répertoire de votre projet, lancez :

```bash
node --inspect-brk node_modules/.bin/jest --runInBand [any other arguments here]
or on Windows
node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand [any other arguments here]
```

Jest fonctionnera ainsi dans un processus Node auquel un débogueur externe pourra se connecter. Notez que le processus s'arrêtera jusqu'à ce que le débogueur s'y connecte.

Pour déboguer dans Google Chrome (ou tout autre navigateur basé sur Chromium), ouvrez votre navigateur et allez dans `chrome://inspect` et cliquez sur "Open Dedicated DevTools for Node", ce qui vous donnera une liste des instances de nœuds disponibles auxquelles vous pouvez vous connecter. Cliquez sur l'adresse affichée dans le terminal (généralement quelque chose comme `localhost:9229`) après avoir exécuté la commande ci-dessus, et vous pourrez déboguer Jest en utilisant les DevTools de Chrome.

Les outils de développement Chrome seront affichés et un point d'arrêt sera fixé à la première ligne du script CLI de Jest (ceci est fait pour vous donner le temps d'ouvrir les outils de développement et pour empêcher que Jest ne s'exécute avant que vous n'ayez le temps de le faire). Cliquez sur le bouton qui ressemble à un bouton "play" en haut à droite de l'écran pour continuer l'exécution. Lorsque Jest exécute le test qui contient l'instruction `debugger`, l'exécution s'arrête et vous pouvez examiner la portée actuelle et la pile d'appels.

> Note : l'option `--runInBand` cli permet de s'assurer que Jest exécute le test dans le même processus plutôt que d'engendrer des processus pour des tests individuels. Normalement, Jest parallélise les tests entre les processus, mais il est difficile de déboguer plusieurs processus en même temps.

## Débugger dans VS Code

Il existe plusieurs façons de déboguer les tests Jest avec le [code de Visual Studio](https://code.visualstudio.com) intégré au [débogueur](https://code.visualstudio.com/docs/nodejs/nodejs-debugging).

Pour attacher le débogueur intégré, effectuez vos tests comme indiqué ci-dessus :

```bash
node --inspect-brk node_modules/.bin/jest --runInBand [any other arguments here]
or on Windows
node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand [any other arguments here]
```

Attachez ensuite le débogueur de VS Code en utilisant la configuration suivante `launch.json` :

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach",
      "port": 9229
    }
  ]
}
```

Pour lancer et joindre automatiquement un processus exécutant vos tests, utilisez la configuration suivante :

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Jest Tests",
      "type": "node",
      "request": "launch",
      "runtimeArgs": [
        "--inspect-brk",
        "${workspaceRoot}/node_modules/.bin/jest",
        "--runInBand"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "port": 9229
    }
  ]
}
```

ou le code suivant pour Windows :

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Jest Tests",
      "type": "node",
      "request": "launch",
      "runtimeArgs": [
        "--inspect-brk",
        "${workspaceRoot}/node_modules/jest/bin/jest.js",
        "--runInBand"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "port": 9229
    }
  ]
}
```

Si vous utilisez la [`create-react-app`](https://github.com/facebookincubator/create-react-app) de Facebook, vous pouvez déboguer vos tests Jest avec la configuration suivante :

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug CRA Tests",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/react-scripts",
      "args": ["test", "--runInBand", "--no-cache", "--env=jsdom"],
      "cwd": "${workspaceRoot}",
      "protocol": "inspector",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

Vous trouverez de plus amples informations sur le débogage des nœuds [ici](https://nodejs.org/api/debugger.html).

## Débugger dans WebStorm

La façon la plus simple de déboguer les tests Jest dans [WebStorm](https://www.jetbrains.com/webstorm/) est d'utiliser la configuration "Jest run/debug". Il lancera les tests et attachera automatiquement le débogueur.

Dans le menu WebStorm "Run", sélectionnez "Edit Configurations...". Ensuite, cliquez sur "+" et sélectionnez "Jest". Spécifiez éventuellement le fichier de configuration Jest, les options supplémentaires et les variables d'environnement. Sauvegardez la configuration, mettez les points d'arrêt dans le code, puis cliquez sur l'icône verte de débogage pour commencer le débogage.

Si vous utilisez la [`create-react-app`] (https://github.com/facebookincubator/create-react-app) de Facebook, dans la configuration de Jest run/debug, indiquez le chemin du paquet `react-scripts` dans le champ du paquet Jest et ajoutez `--env=jsdom` au champ des options de Jest.

## Question de mis en cache

Le script de transformation a été modifié ou Babel a été mis à jour et les changements ne sont pas reconnus par Jest ?

Réessayez avec [`--no-cache`](CLI.md#--cache). Jest caches a transformé les fichiers des modules pour accélérer l'exécution des tests. Si vous utilisez votre propre transformateur personnalisé, pensez à y ajouter une fonction `getCacheKey` : [getCacheKey in Relay](https://github.com/facebook/relay/blob/58cf36c73769690f0bbf90562707eadb062b029d/scripts/jest/preprocessor.js#L56-L61).

## Promesses non tenues

Si une promesse ne se concrétise pas du tout, cette erreur risque d'être rejetée :

```bash
- Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.`
```

Le plus souvent, cela est dû à des mises en œuvre contradictoires de la Promesse. Envisagez de remplacer la mise en œuvre globale de Promise par votre propre mise en œuvre, par exemple `global.Promise = jest.requireActual('promise');` et/ou consolidez les bibliothèques Promise utilisées en une seule.

Si votre test est long, vous pouvez envisager d'augmenter le délai d'attente en appelant "jest.setTimeout".

```js
jest.setTimeout(10000); // 10 second timeout
```

## Questions relatives aux gardiens

Essayez de lancer Jest avec [`--no-watchman`](CLI.md#--watchman) ou mettez l'option de configuration `watchman` à `false`.

Voir également [watchman troubleshooting](https://facebook.github.io/watchman/docs/troubleshooting).

## Les tests sont extrêmement lents sur le serveur Docker et/ou d'intégration continue (IC).

Bien que Jest soit la plupart du temps extrêmement rapide sur les ordinateurs modernes multicœurs dotés de SSD rapides, il peut être lent sur certaines configurations, comme l'ont découvert nos utilisateurs (https://github.com/facebook/jest/issues/1395) (https://github.com/facebook/jest/issues/1524#issuecomment-260246008).

Sur la base des [conclusions](https://github.com/facebook/jest/issues/1524#issuecomment-262366820), une façon d'atténuer ce problème et d'améliorer la vitesse de 50% est d'effectuer des tests de manière séquentielle.

Pour ce faire, vous pouvez effectuer des tests dans le même fil en utilisant [`--runInBand`](CLI.md#--runinband) :

```bash
# Utilisation de Jest CLI
jest --runInBand

# Utilisation du test yark (e.g. with create-react-app)
yarn test --runInBand
```

Une autre solution pour accélérer le temps d'exécution des tests sur les serveurs d'intégration continue tels que Travis-CI consiste à fixer le nombre maximum de travailleurs à ~_4_. Sur Travis-CI en particulier, cela peut réduire de moitié le temps d'exécution des tests. Note : Le plan Travis CI _libre_ disponible pour les projets open source ne comprend que 2 cœurs de processeur.

```bash
# Utilisation de Jest CLI
jest --maxWorkers=4

# Utilisation du test yarn (e.g. with create-react-app)
yarn test --maxWorkers=4
```

## `coveragePathIgnorePatterns` semble n'avoir aucun effet.

Assurez-vous que vous n'utilisez pas le plugin `babel-plugin-istanbul`. Jest enveloppe Istanbul, et donc dit aussi à Istanbul quels fichiers à instrumenter avec la collection de couverture. Lorsque vous utilisez le plugin `Babel-plugin-istanbul`, chaque fichier qui est traité par Babel aura un code de collecte de couverture, et ne sera donc pas ignoré par les `coveragePathIgnorePatterns`.

## Définir les tests

Les tests doivent être définis de manière synchrone pour que Jest puisse collecter vos tests.

À titre d'exemple pour montrer pourquoi c'est le cas, imaginez que nous écrivions un test comme ça :

```js
// Don't do this it will not work
setTimeout(() => {
  it('passes', () => expect(1).toBe(1));
}, 0);
```

Lorsque Jest exécute votre test pour collecter les `tests`, il n'en trouvera aucun parce que nous avons réglé la définition pour qu'elle se produise de manière asynchrone à la prochaine coche de la boucle d'événement.

Note : Cela signifie que lorsque vous utilisez `test.each`, vous ne pouvez pas définir la table de manière asynchrone dans un `beforeEach` / `beforeAll`.

## Toujours pas résolu ?

Voir [Aide](/help.html).

# Architecture

Si vous souhaitez en savoir plus sur le fonctionnement de Jest, sur l'architecture du cadre et sur la manière dont Jest est divisé en paquets individuels réutilisables, regardez cette vidéo :

<iframe width="560" height="315" src="https://www.youtube.com/embed/3YDiloj8_d0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
