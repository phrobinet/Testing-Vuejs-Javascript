---
id: tutorial-react-native
title: Testing React Native Apps
---

# Tester les Apps React Native

Sur Facebook, nous utilisons Jest pour tester les applications [React Native](https://reactnative.dev/).

Pour en savoir plus sur le test d'un exemple d'application React Native qui fonctionne, lisez la série suivante : (https://callstack.com/blog/testing-react-native-with-the-new-jest-part-1-snapshots-come-into-play/) et [Partie 2 : Jest - Redux Snapshots for your Actions and Reducers] (https://callstack.com/blog/testing-react-native-with-the-new-jest-part-2-redux-snapshots-for-your-actions-and-reducers/).

## Mise en place

A partir de la version 0.38 de react-native, une configuration de Jest est incluse par défaut lors de l'exécution de `react-native init`. La configuration suivante devrait être automatiquement ajoutée à votre fichier package.json :

```json
// package.json
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "preset": "react-native"
  }
```

_Note : Si vous mettez à jour votre application react-native et que vous utilisiez auparavant le preset `jest-react-native`, supprimez la dépendance de votre fichier `package.json` et changez le preset en `react-native` à la place._

Faites un `yarn test` pour faire des tests avec Jest.

## Test instantané

Créons un [snapshot test] (SnapshotTesting.md) pour un petit composant d'introduction avec quelques vues et composants de texte et quelques styles :

```javascript
// Intro.js
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center',
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
});

export default class Intro extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>
          This is a React Native snapshot test.
        </Text>
      </View>
    );
  }
}
```

Utilisons maintenant le moteur de rendu de test de React et la fonction d'instantané de Jest pour interagir avec le composant et capturer la sortie rendue et créer un fichier d'instantané :

```javascript
// __tests__/Intro-test.js
import React from 'react';
import Intro from '../Intro';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Intro />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

Lorsque vous exécutez un `yarn test` ou une `jest`, cela produit un fichier de sortie comme celui-ci :

```javascript
// __tests__/__snapshots__/Intro-test.js.snap
exports[`Intro renders correctly 1`] = `
<View
  style={
    Object {
      "alignItems": "center",
      "backgroundColor": "#F5FCFF",
      "flex": 1,
      "justifyContent": "center",
    }
  }>
  <Text
    style={
      Object {
        "fontSize": 20,
        "margin": 10,
        "textAlign": "center",
      }
    }>
    Welcome to React Native!
  </Text>
  <Text
    style={
      Object {
        "color": "#333333",
        "marginBottom": 5,
        "textAlign": "center",
      }
    }>
    This is a React Native snapshot test.
  </Text>
</View>
`;
```

La prochaine fois que vous effectuerez les tests, la sortie rendue sera comparée à l'instantané créé précédemment. L'instantané doit être validé en même temps que les changements de code. Lorsqu'un test d'instantané échoue, vous devez vérifier s'il s'agit d'une modification intentionnelle ou non. Si le changement est prévu, vous pouvez invoquer Jest avec `jest -u` pour écraser l'instantané existant.

Le code de cet exemple est disponible sur [examples/react-native](https://github.com/facebook/jest/tree/master/examples/react-native).

## Configuration prédéfinie

Le préréglage met en place l'environnement et il est très orienté et basé sur ce que nous avons trouvé utile sur Facebook. Toutes les options de configuration peuvent être écrasées, tout comme elles peuvent être personnalisées lorsqu'aucun préréglage n'est utilisé.

### Environnement

`react-native` est un vaisseau avec un préréglage Jest, donc le champ `jest.preset` de votre `paquet.json` devrait pointer sur `react-native`. Le preset est un environnement de noeud qui imite l'environnement d'une application React Native. Comme il ne charge aucun DOM ou API de navigateur, il améliore grandement le temps de démarrage de Jest.

### personnalisation de transformIgnorePatterns

L'option [`transformIgnorePatterns`] (configuration.html#transformignorepatterns-arraystring) peut être utilisée pour spécifier quels fichiers doivent être transformés par Babel. De nombreux modules npm réactifs ne précompilent malheureusement pas leur code source avant de le publier.

Par défaut, le préréglage jest-react-native ne traite que les fichiers sources propres au projet et react-native. Si vous avez des dépendances npm qui doivent être transformées, vous pouvez personnaliser cette option de configuration en incluant des modules autres que react-native :

```json
"transformIgnorePatterns": [
  "node_modules/(?!(react-native|my-project|react-native-button)/)"
]
```

### setupFiles

Si vous souhaitez fournir une configuration supplémentaire pour chaque fichier de test, l'option de configuration [`setupFiles` configuration option](configuration.html#setupfiles-array) peut être utilisée pour spécifier les scripts de configuration.

### moduleNameMapper

Le [`moduleNameMapper`] (configuration.html#modulenamemapper-objectstring-string--arraystring) peut être utilisé pour faire correspondre le chemin d'un module à un autre module. Par défaut, le préréglage fait correspondre toutes les images à un module de talon d'image, mais si un module ne peut être trouvé, cette option de configuration peut aider :

```json
"moduleNameMapper": {
  "my-module.js": "<rootDir>/path/to/my-module.js"
}
```

## Conseils

### Modules natifs fictifs à l'aide de jest.mock

Le préréglage Jest intégré dans `react-native` est fourni avec quelques modèles par défaut qui sont appliqués sur un dépôt `react-native`. Cependant, certains composants de react-native ou de tiers s'appuient sur le code natif pour être rendus. Dans de tels cas, le système de simulation manuelle de Jest peut aider à simuler l'implémentation sous-jacente.

Par exemple, si votre code dépend d'un composant vidéo natif tiers appelé `react-native-video`, vous pouvez le compléter avec une maquette manuelle comme celle-ci :

```js
jest.mock('react-native-video', () => 'Video');
```

Cela rendra le composant `<Video {...props} />` avec tous ses accessoires dans la sortie de l'instantané. Voir aussi [avertissements concernant l'enzyme et la réaction 16] (tutorial-react.html#snapshot-testing-with-mocks-enzyme-and-react-16).

Parfois, vous devez fournir une simulation manuelle plus complexe. Par exemple, si vous souhaitez transmettre les types d'accessoires ou les champs statiques d'un composant natif à une simulation, vous pouvez renvoyer un composant React différent d'une simulation par le biais de cette aide de jest-react-native :

```js
jest.mock('path/to/MyNativeComponent', () => {
  const mockComponent = require('react-native/jest/mockComponent');
  return mockComponent('path/to/MyNativeComponent');
});
```

Ou si vous souhaitez créer votre propre simulation manuelle, vous pouvez faire quelque chose comme cela :

```js
jest.mock('Text', () => {
  const RealComponent = jest.requireActual('Text');
  const React = require('React');
  class Text extends React.Component {
    render() {
      return React.createElement('Text', this.props, this.props.children);
    }
  }
  Text.propTypes = RealComponent.propTypes;
  return Text;
});
```

Dans d'autres cas, vous pouvez vouloir simuler un module natif qui n'est pas un composant React. La même technique peut être appliquée. Nous vous recommandons d'inspecter le code source du module natif et d'enregistrer le module lors de l'exécution d'une application native React sur un appareil réel, puis de modéliser une maquette manuelle d'après le module réel.

Si vous vous retrouvez à modéliser les mêmes modules à plusieurs reprises, il est recommandé de définir ces maquettes dans un fichier séparé et de l'ajouter à la liste des `SetupFiles`.
