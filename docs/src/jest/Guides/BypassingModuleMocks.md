---
id: bypassing-module-mocks
title: Bypassing module mocks
---

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
