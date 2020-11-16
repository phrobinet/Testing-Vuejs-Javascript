---
id: migration-guide
title: Migrating to Jest
---

Si vous souhaitez essayer Jest avec une base de code existante, il y a plusieurs façons de le convertir à Jest :

- Si vous utilisez Jasmine, ou une API similaire à Jasmine (par exemple [Mocha](https://mochajs.org)), Jest devrait être compatible dans la plupart des cas, ce qui rend la migration moins compliquée.
- Si vous utilisez AVA, Expect.js (par Automattic), Jasmine, Mocha, proxyquire, Should.js ou Tape, vous pouvez migrer automatiquement avec les codemods Jest (voir ci-dessous).
- Si vous aimez [chai](http://chaijs.com/), vous pouvez passer à Jest et continuer à utiliser chai. Cependant, nous vous recommandons d'essayer les assertions de Jest et leurs messages d'échec. Les Codemods de Jest peuvent migrer depuis chai (voir ci-dessous).

## jest-codemods

Si vous utilisez [AVA](https://github.com/avajs/ava), [Chai](https://github.com/chaijs/chai), [Expect.js (by Automattic)](https://github.com/Automattic/expect.js), [Jasmine](https://github.com/jasmine/jasmine), [Mocha](https://github.com/mochajs/mocha), [proxyquire](https://github.com/thlorenz/proxyquire), [Should.js](https://github.com/shouldjs/should.js) ou [Tape](https://github.com/substack/tape), vous pouvez utiliser les [jest-codemods](https://github.com/skovhus/jest-codemods) tiers pour effectuer la plupart des travaux de migration. Il exécute une transformation de code sur votre base de code en utilisant [jscodeshift](https://github.com/facebook/jscodeshift).

Pour transformer vos tests existants, naviguez jusqu'au projet contenant les tests et exécutez :

```bash
npx jest-codemods
```

Pour plus d'informations, consultez le site [https://github.com/skovhus/jest-codemods](https://github.com/skovhus/jest-codemods).
