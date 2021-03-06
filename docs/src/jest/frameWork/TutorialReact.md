---
id: tutorial-react
title: Testing React Apps
---

# Tester les Apps React

Sur Facebook, nous utilisons Jest pour tester les applications [React](https://reactjs.org/).

## Mise en place

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
