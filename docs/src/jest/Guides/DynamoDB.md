---
id: dynamodb
title: Using with DynamoDB
---
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
