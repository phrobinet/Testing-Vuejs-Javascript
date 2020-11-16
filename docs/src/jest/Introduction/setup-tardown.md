---
id: setup-teardown
title: Setup and Teardown
---

# Montage et démontage

Souvent, lors de la rédaction des tests, vous devez effectuer un certain travail de préparation avant les tests, et un travail de finition après les tests. Jest fournit des fonctions d'aide pour gérer cela.

## Répétition de la mise en place pour de nombreux tests

Si vous avez un travail à faire de manière répétitive pour de nombreux tests, vous pouvez utiliser les fonctions `beforeEach` et `afterEach`.

Par exemple, disons que plusieurs tests interagissent avec une base de données de villes. Vous avez une méthode `initializeCityDatabase()` qui doit être appelée avant chacun de ces tests, et une méthode `clearCityDatabase()` qui doit être appelée après chacun de ces tests. Vous pouvez faire cela avec :

```js
beforeEach(() => {
  initializeCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```

Les fonctions `beforeEach` et `afterEach` peuvent traiter le code asynchrone de la même manière que [les tests peuvent traiter le code asynchrone] (TestingAsyncCode.md) - ils peuvent soit prendre un paramètre `done`, soit renvoyer une promesse. Par exemple, si `initializeCityDatabase()` renvoie une promesse qui s'est résolue lors de l'initialisation de la base de données, nous voudrions renvoyer cette promesse :

```js
beforeEach(() => {
  return initializeCityDatabase();
});
```

## Configuration unique

Dans certains cas, vous ne devez effectuer la configuration qu'une seule fois, au début d'un fichier. Cela peut être particulièrement gênant lorsque la configuration est asynchrone, et que vous ne pouvez donc pas la faire en ligne. Jest fournit des fonctions `beforeAll` et `afterAll` pour gérer cette situation.

Par exemple, si `initializeCityDatabase` et `clearCityDatabase` nous ont tous deux fait des promesses, et que la base de données des villes peut être réutilisée entre les tests, nous pourrions changer notre code de test en :

```js
beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```

## Champ d'application

Par défaut, les blocs `before` and `after` s'appliquent à tous les tests d'un fichier. Vous pouvez également regrouper les tests en utilisant un bloc "description". Lorsqu'ils sont à l'intérieur d'un bloc `describe`, les blocs `before` et `after` s'appliquent uniquement aux tests à l'intérieur de ce bloc `describe`.

Par exemple, disons que nous n'avons pas seulement une base de données de villes, mais aussi une base de données d'aliments. Nous pourrions faire différentes configurations pour différents tests :

```js
// S'applique à tous les tests de ce dossier
beforeEach(() => {
  return initializeCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});

describe('matching cities to foods', () => {
  // Ne s'applique qu'aux tests de ce bloc de description
  beforeEach(() => {
    return initializeFoodDatabase();
  });

  test('Vienna <3 sausage', () => {
    expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
  });

  test('San Juan <3 plantains', () => {
    expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
  });
});
```

_Notez que le niveau supérieur `beforeEach` est exécuté avant le `beforeEach` à l'intérieur du bloc `describe`. Cela peut aider à illustrer l'ordre d'exécution de tous les crochets._

```js
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```

## Ordre d'exécution des blocs de description et de test

Jest exécute tous les gestionnaires de description dans un fichier de test _before_ qu'il n'exécute un des tests réels. C'est une autre raison de faire la configuration et le démontage à l'intérieur des gestionnaires  `before*` et `after*` plutôt qu'à l'intérieur des blocs de description. Une fois que les blocs de description sont complets, par défaut Jest exécute tous les tests en série dans l'ordre où ils ont été rencontrés lors de la phase de collecte, en attendant que chacun d'entre eux soit terminé et mis en ordre avant de continuer.

Considérez le fichier de test et la sortie illustrés ci-dessous :

```js
describe('outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');
    test('test 1', () => {
      console.log('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  console.log('describe outer-b');

  test('test 1', () => {
    console.log('test for describe outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    console.log('describe inner 2');
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2');
      expect(false).toEqual(false);
    });
  });

  console.log('describe outer-c');
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2
```

## Conseils généraux

Si un test échoue, l'une des premières choses à vérifier est de savoir si le test échoue alors que c'est le seul qui fonctionne. Pour exécuter un seul test avec Jest, changez temporairement la commande "test" en "test.only" :

```js
test.only('this will be the only test that runs', () => {
  expect(true).toBe(false);
});

test('this test will not run', () => {
  expect('A').toBe('A');
});
```

Si vous avez un test qui échoue souvent lorsqu'il est exécuté dans le cadre d'une suite plus large, mais qui n'échoue pas lorsque vous l'exécutez seul, il y a fort à parier que quelque chose d'un autre test interfère avec celui-ci. Vous pouvez souvent résoudre ce problème en effaçant un état partagé avec `beforeEach`. Si vous n'êtes pas sûr qu'un état partagé est modifié, vous pouvez aussi essayer un `beforeEach` qui enregistre les données.
