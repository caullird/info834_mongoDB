
(async () => {
    const { MongoClient } = require('mongodb');
    const moment = require('moment')
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('Mailing');
    db.collection('users').watch().
        on('change', data => console.log(new Date(), data));

})();
