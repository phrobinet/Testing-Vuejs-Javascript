---
id: es6-class-mocks
title: ES6 Class Mocks
---

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
