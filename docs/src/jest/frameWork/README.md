# Les différents frameWork

## Testing Web Frameworks

Jest est une plateforme de test universelle, capable de s'adapter à n'importe quelle bibliothèque ou framework JavaScript. Dans cette section, nous aimerions vous proposer des liens vers des messages et des articles de la communauté sur l'intégration de Jest dans les bibliothèques JS populaires.

### React

- [Tester les composants de ReactJS avec Jest](https://testing-library.com/docs/react-testing-library/example-intro) par Kent C. Dodds ([@kentcdodds](https://twitter.com/kentcdodds))

### Vue.js

- [Tester les composants de Vue.js avec Jest](https://alexjoverm.github.io/series/Unit-Testing-Vue-js-Components-with-the-Official-Vue-Testing-Tools-and-Jest/) par Alex Jover Morales ([@alexjoverm](https://twitter.com/alexjoverm))
- [Jest pour tous : Episode 1 - Vue.js](https://medium.com/@kentaromiura_the_js_guy/jest-for-all-episode-1-vue-js-d616bccbe186#.d573vrce2) par Cristian Carlesso ([@kentaromiura](https://twitter.com/kentaromiura))

### AngularJS

- [Test d'une application AngularJS avec Jest](https://medium.com/aya-experience/testing-an-angularjs-app-with-jest-3029a613251) par Matthieu Lux ([@Swiip](https://twitter.com/Swiip))
- [Exécution des tests AngularJS avec Jest](https://engineering.talentpair.com/running-angularjs-tests-with-jest-49d0cc9c6d26) par Ben Brandt ([@benjaminbrandt](https://twitter.com/benjaminbrandt))
- [Tests de l'unité AngularJS avec des actions de plaisanterie (chinois traditionnel)](https://dwatow.github.io/2019/08-14-angularjs/angular-jest/?fbclid=IwAR2SrqYg_o6uvCQ79FdNPeOxs86dUqB6pPKgd9BgnHt1kuIDRyRM-ch11xg) par Chris Wang ([@dwatow](https://github.com/dwatow))

### Angular

- [Test Angulaire plus rapide avec Jest](https://www.xfive.co/blog/testing-angular-faster-jest/) par Michał Pierzchała ([@thymikee](https://twitter.com/thymikee))

### MobX

- [Comment tester React et MobX avec Jest](https://semaphoreci.com/community/tutorials/how-to-test-react-and-mobx-with-jest) par Will Stern ([@willsterndev](https://twitter.com/willsterndev))

### Redux

- [Tests d'écriture](https://redux.js.org/recipes/writing-tests) par Redux docs

### Express.js

- [Comment tester Express.js avec Jest et Supertest](http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/) par Albert Gao ([@albertgao](https://twitter.com/albertgao))

### GatsparJS

- Test d'unité(https://www.gatsparjs.org/docs/unit-testing/) par GatsparJS docs

### Hapi.js

- [Test de Hapi.js avec Jest](http://niralar.com/testing-hapi-js-with-jest/) par Niralar ([Sivasankar](http://sivasankar.in/))

## Testing React Apps

Sur Facebook, nous utilisons Jest pour tester les applications [React](https://reactjs.org/).

### Configuration avec l'application Create React

Si vous n'avez jamais utilisé React, nous vous recommandons d'utiliser [Create React App] (https://create-react-app.dev/). Elle est prête à l'emploi et [livrée avec Jest] (https://create-react-app.dev/docs/running-tests/#docsNav) ! Vous n'aurez besoin que d'ajouter `react-test-renderer` pour le rendu des instantanés.

Run

```bash
yarn add --dev react-test-renderer
```

### Configuration sans créer d'application de réaction

Si vous avez une application existante, vous devrez installer quelques paquets pour que tout fonctionne bien ensemble. Nous utilisons le paquet `babel-jest` et le préréglage babel `react` pour transformer notre code dans l'environnement de test. Voir aussi [using babel](GettingStarted.md#using-babel).

Run

```bash
yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer
```

Votre `package.json` devrait ressembler à ceci (où `<current-version>` est le numéro de la dernière version du paquet). Veuillez ajouter les scripts et les entrées de configuration de jest :

```json
// package.json
  "dependencies": {
    "react": "<current-version>",
    "react-dom": "<current-version>"
  },
  "devDependencies": {
    "@babel/preset-env": "<current-version>",
    "@babel/preset-react": "<current-version>",
    "babel-jest": "<current-version>",
    "jest": "<current-version>",
    "react-test-renderer": "<current-version>"
  },
  "scripts": {
    "test": "jest"
  }
```

```js
// babel.config.js
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
};
```

**Et tu es prêt à partir!**

### Test d'instantanés

Créons un [test instantané] (SnapshotTesting.md) pour un composant de lien qui rend les hyperliens :

```javascript
// Link.react.js
import React from 'react';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

export default class Link extends React.Component {
  constructor(props) {
    super(props);

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this.state = {
      class: STATUS.NORMAL,
    };
  }

  _onMouseEnter() {
    this.setState({class: STATUS.HOVERED});
  }

  _onMouseLeave() {
    this.setState({class: STATUS.NORMAL});
  }

  render() {
    return (
      <a
        className={this.state.class}
        href={this.props.page || '#'}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >
        {this.props.children}
      </a>
    );
  }
}
```

Utilisons maintenant le moteur de rendu de test de React et la fonction d'instantané de Jest pour interagir avec le composant et capturer la sortie rendue et créer un fichier d'instantané :

```javascript
// Link.react.test.js
import React from 'react';
import Link from '../Link.react';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // déclencher manuellement le rappel
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // déclencher manuellement le rappel
  tree.props.onMouseLeave();
  // le re-rendu
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
```

Lorsque vous exécutez un `yarn test` ou `jest`, cela produit un fichier de sortie comme celui-ci :

```javascript
// __tests__/__snapshots__/Link.react.test.js.snap
exports[`Link changes the class when hovered 1`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}>
  Facebook
</a>
`;

exports[`Link changes the class when hovered 2`] = `
<a
  className="hovered"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}>
  Facebook
</a>
`;

exports[`Link changes the class when hovered 3`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}>
  Facebook
</a>
`;
```

La prochaine fois que vous effectuerez les tests, la sortie rendue sera comparée à l'instantané créé précédemment. L'instantané doit être validé en même temps que les changements de code. Lorsqu'un test d'instantané échoue, vous devez vérifier s'il s'agit d'une modification intentionnelle ou non. Si le changement est prévu, vous pouvez invoquer Jest avec `jest -u` pour écraser l'instantané existant.

Le code de cet exemple est disponible sur [exemples/snapshot] (https://github.com/facebook/jest/tree/master/examples/snapshot).

#### Test d'instantané avec Mocks, Enzyme et React 16

Il y a une mise en garde concernant les tests d'instantanés lors de l'utilisation d'Enzyme and React 16+. Si vous simulez un module en utilisant le style suivant :

```js
jest.mock('../SomeDirectory/SomeComponent', () => 'SomeComponent');
```

Ensuite, vous verrez des avertissements dans la console :

```bash
Warning: <SomeComponent /> is using uppercase HTML. Always use lowercase HTML tags in React.

# Or:
Warning: The tag <SomeComponent> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.
```

React 16 déclenche ces avertissements en raison de la façon dont il vérifie les types d'éléments, et le module simulé échoue ces vérifications. Vos options sont les suivantes:

1.  Rendu sous forme de texte. De cette façon, vous ne verrez pas les accessoires passés à l'élément de simulation dans l'instantané, mais c'est simple :
    ```js
    jest.mock('./SomeComponent', () => () => 'SomeComponent');
    ```
2.  Rendu en tant qu'élément personnalisé. Les "éléments personnalisés" de DOM ne sont pas vérifiés et ne doivent pas déclencher d'alertes. Ils sont en minuscules et ont un tiret dans le nom.
    ```js
    jest.mock('./Widget', () => () => <mock-widget />);
    ```
3.  Utilisez le `react-test-renderer`. Le moteur de rendu de test ne se soucie pas des types d'éléments et acceptera volontiers, par exemple, `SomeComponent`. Vous pouvez vérifier les instantanés en utilisant le moteur de rendu de test, et vérifier le comportement des composants séparément en utilisant Enzyme.
4.  Désactivez tous les avertissements (cela doit être fait dans votre fichier de configuration de jest) :
    ```js
    jest.mock('fbjs/lib/warning', () => require('fbjs/lib/emptyFunction'));
    ```
    Vous ne devriez normalement pas choisir cette option car des avertissements utiles pourraient être perdus. Cependant, dans certains cas, par exemple lors du test des composants de react-native, nous rendons les tags react-native dans le DOM et de nombreux avertissements ne sont pas pertinents. Une autre option consiste à faire swinguer la console.warn et à supprimer des avertissements spécifiques.

### Test DOM

Si vous souhaitez vous affirmer et manipuler vos composants rendus, vous pouvez utiliser [react-testing-library](https://github.com/kentcdodds/react-testing-library), [Enzyme](http://airbnb.io/enzyme/), ou React's [TestUtils](https://reactjs.org/docs/test-utils.html). Les deux exemples suivants utilisent la bibliothèque de tests de réaction et l'enzyme.

#### react-testing library

Vous devez lancer `yarn add --dev @testing-library/react` pour utiliser react-testing-library.

Mettons en place une case à cocher qui permette d'échanger entre deux étiquettes :

```javascript
// CheckboxWithLabel.js

import React from 'react';

export default class CheckboxWithLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isChecked: false};

    // se lient manuellement car les composants de la classe React ne se lient pas automatiquement
    // https://reactjs.org/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({isChecked: !this.state.isChecked});
  }

  render() {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
      </label>
    );
  }
}
```

```javascript
// __tests__/CheckboxWithLabel-test.js
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import CheckboxWithLabel from '../CheckboxWithLabel';

// Note : le nettoyage après chaque opération est effectué automatiquement pour vous sur @testing-library/react@9.0.0 ou plus
// démonter et nettoyer le DOM après la fin du test.
afterEach(cleanup);

it('CheckboxWithLabel changes the text after click', () => {
  const {queryByLabelText, getByLabelText} = render(
    <CheckboxWithLabel labelOn="On" labelOff="Off" />,
  );

  expect(queryByLabelText(/off/i)).toBeTruthy();

  fireEvent.click(getByLabelText(/off/i));

  expect(queryByLabelText(/on/i)).toBeTruthy();
});
```

Le code de cet exemple est disponible sur le site [examples/react-testing-library] (https://github.com/facebook/jest/tree/master/examples/react-testing-library).

#### Enzyme

Vous devez lancer `yarn add --dev enzyme` pour utiliser Enzyme. Si vous utilisez une version de React inférieure à 15.5.0, vous devrez également installer `react-addons-test-utils`.

Réécrivons le test par le haut en utilisant Enzyme au lieu de la bibliothèque de tests de réaction. Nous utilisons le [rendu superficiel] d'Enzyme (http://airbnb.io/enzyme/docs/api/shallow.html) dans cet exemple.

```javascript
// __tests__/CheckboxWithLabel-test.js

import React from 'react';
import {shallow} from 'enzyme';
import CheckboxWithLabel from '../CheckboxWithLabel';

test('CheckboxWithLabel changes the text after click', () => {
  // Cochez une case avec une étiquette dans le document
  const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

  expect(checkbox.text()).toEqual('Off');

  checkbox.find('input').simulate('change');

  expect(checkbox.text()).toEqual('On');
});
```

Le code de cet exemple est disponible sur [examples/enzyme](https://github.com/facebook/jest/tree/master/examples/enzyme).

### Transformateurs sur mesure

Si vous avez besoin de fonctionnalités plus avancées, vous pouvez également construire votre propre transformateur. Au lieu d'utiliser le babel-jest, voici un exemple d'utilisation du babel :

```javascript
// custom-transformer.js
'use strict';

const {transform} = require('@babel/core');
const jestPreset = require('babel-preset-jest');

module.exports = {
  process(src, filename) {
    const result = transform(src, {
      filename,
      presets: [jestPreset],
    });

    return result ? result.code : src;
  },
};
```

N'oubliez pas d'installer les paquets `@babel/core` et `babel-preset-jest` pour que cet exemple fonctionne.

Pour que cela fonctionne avec Jest, vous devez mettre à jour votre configuration Jest avec ceci : `"transform" : {"\\\".js$" : "path/to/custom-transformer.js"}`.

Si vous souhaitez construire un transformateur avec le support babel, vous pouvez également utiliser babel-jest pour en composer un et passer vos options de configuration personnalisée :

```javascript
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: ['my-custom-preset'],
});
```

## Testing React Native Apps

Sur Facebook, nous utilisons Jest pour tester les applications [React Native](https://reactnative.dev/).

Pour en savoir plus sur le test d'un exemple d'application React Native qui fonctionne, lisez la série suivante : (https://callstack.com/blog/testing-react-native-with-the-new-jest-part-1-snapshots-come-into-play/) et [Partie 2 : Jest - Redux Snapshots for your Actions and Reducers] (https://callstack.com/blog/testing-react-native-with-the-new-jest-part-2-redux-snapshots-for-your-actions-and-reducers/).

### Mise en place

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

### Test instantané

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

### Configuration prédéfinie

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

### *Conseils*

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
