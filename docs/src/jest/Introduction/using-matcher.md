---
id: using-matchers
title: Using Matchers
---

# Utiliser les Matchers

Jest utilise des "matchers" pour vous permettre de tester les valeurs de différentes manières. Le présent document présente quelques correspondants couramment utilisés. Pour la liste complète, voir la [``expect` API doc](ExpectAPI.md).

## Matchers communs

La façon la plus simple de tester une valeur est de la comparer à une valeur identique.

```js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```

Dans ce code, `expect(2 + 2)` renvoie un objet "expectation". Vous ne ferez généralement pas grand chose avec ces objets "expectation", sauf appeler des correspondants sur eux. Dans ce code, `.toBe(4)` est le matcher. Quand Jest s'exécute, il suit tous les matchers qui échouent afin de pouvoir imprimer de beaux messages d'erreur pour vous.

`toBe` utilise `Object.is` pour tester l'égalité exacte. Si vous voulez vérifier la valeur d'un objet, utilisez plutôt `toEqual` :

```js
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```

La fonction `toEqual` vérifie récursivement chaque champ d'un objet ou d'un tableau.

Vous pouvez également tester l'inverse d'un matcher :

```js
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
```

## Les vérités

Dans les tests, vous devez parfois faire la distinction entre "indéfini", "nul" et "faux", mais vous ne voulez parfois pas les traiter différemment. Jest contient des aides qui vous permettent d'être explicite sur ce que vous voulez.

- `toBeNull` ne correspond qu'à `null`
- `toBeUndefined` correspondent uniquement aux résultats  `undefined`
- `toBeDefined` est l'opposé de `toBeUndefined`
- `toBeTruthy` correspond à tout ce qu'une déclaration  `if` considère comme vrai
- `toBeFalsy` correspond à tout ce qu'une déclaration `if` considère comme faux

Par exemple :

```js
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
```

Vous devez utiliser l'appariement qui correspond le plus précisément à ce que vous voulez que votre code fasse.

## Les nombres

La plupart des façons de comparer les chiffres ont des équivalents correspondants.

```js
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe et toEqual sont équivalents pour les nombres
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```

Pour l'égalité en virgule flottante, utilisez `toBeCloseTo` au lieu de `toEqual`, parce que vous ne voulez pas qu'un test dépende d'une petite erreur d'arrondi.

```js
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});
```

## Les chaînes de caractères

Vous pouvez vérifier les chaînes de caractères par rapport aux expressions régulières avec `toMatch` :

```js
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```

## Les tableaux et itérables

Vous pouvez vérifier si un tableau ou un itérable contient un élément particulier en utilisant `to contain` :

```js
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
  expect(new Set(shoppingList)).toContain('beer');
});
```

## Les exceptions

Si vous voulez tester si une fonction particulière provoque une erreur lorsqu'elle est appelée, utilisez "to throw".

```js
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(Error);

  // Vous pouvez également utiliser le message d'erreur exact ou une regexp
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/);
});
```

## Et plus

Ce n'est qu'un avant-goût. Pour obtenir la liste complète des correspondants, consultez les [documents de référence] (ExpectAPI.md).

Une fois que vous avez pris connaissance des partenaires disponibles, l'étape suivante consiste à vérifier comment Jest vous permet de [tester le code asynchrone] (TestingAsyncCode.md).
