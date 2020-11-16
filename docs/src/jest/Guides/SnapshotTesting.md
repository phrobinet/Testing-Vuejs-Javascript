---
id: snapshot-testing
title: Tests instantanés
---

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

Les composants [React](TutorialReact.md) et [React Native](TutorialReactNative.md) sont un bon cas d'utilisation pour les tests d'instantanés. Cependant, les instantanés peuvent capturer n'importe quelle valeur sérialisable et doivent être utilisés chaque fois que l'objectif est de tester si la sortie est correcte. Le dépôt Jest contient de nombreux exemples de test de la sortie de Jest lui-même, de la sortie de la bibliothèque d'assertions de Jest ainsi que des messages de log de diverses parties de la base de code de Jest. Voir un exemple de [snapshotting CLI output](https://github.com/facebook/jest/blob/master/e2e/__tests__/console.test.ts) dans le dépôt Jest.

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
