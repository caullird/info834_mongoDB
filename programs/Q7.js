
(async () => {
    const { MongoClient } = require('mongodb');
    const moment = require('moment')
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('France');
    const communes = db.collection('communes');
    
    const nom_communes = (await communes.find().toArray()).map(c => c.nom_commune);

    const startTime = moment();

    for (let i = 0; i < 10000; i++) {
        await communes.findOne({ "nom_commune": nom_communes[i]})
        if ((i+1)%1000 === 0) {
            let tmpTime = moment();
            console.log((i+1) + " elements: " + tmpTime.diff(startTime) + "ms")
        }
    }

    let tmpTime = moment();
    console.log("Total:" + tmpTime.diff(startTime) + "ms")

    process.exit()
})();
