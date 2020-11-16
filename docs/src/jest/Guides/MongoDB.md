---
id: mongodb
title: L'utilisation avec MongoDB
---

# L'utilisation avec MongoDB

Avec les API [Global Setup/Teardown](Configuration.md#globalsetup-string) et [Async Test Environment](Configuration.md#testenvironment-string), Jest peut fonctionner sans problème avec [MongoDB](https://www.mongodb.com/).

## Utiliser le préréglage jest-mongodb

[Jest MongoDB](https://github.com/shelfio/jest-mongodb) fournit toute la configuration requise pour exécuter vos tests en utilisant MongoDB.

1.  Premièrement installer `@shelf/jest-mongodb`

```
yarn add @shelf/jest-mongodb --dev
```

2.   Précisez le préréglage dans votre configuration Jest :

```json
{
  "preset": "@shelf/jest-mongodb"
}
```

3.  Ecrire votre test

```js
const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});
```

Il n'est pas nécessaire de charger des dépendances.

Voir la [documentation](https://github.com/shelfio/jest-mongodb) pour plus de details (configuring MongoDB version, etc).
