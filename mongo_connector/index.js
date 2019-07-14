const express = require ('express');
const mongo = require ('mongodb');

const app = express();

const config = {
    mongo_host: '172.17.0.3',
    mongo_port: 27017,
    mongo_db: 'ccm',
    mongo_collection: 'rmuel12s_components',
    server_port: 3000
};

let db, hrtime_start, hrtime_end;

mongo.MongoClient.connect (
    `mongodb://${config.mongo_host}:${config.mongo_port}`,
    { useNewUrlParser: true },
    (err, client) => {

        if (!err)
            db = client.db (config.mongo_db);
        else
            console.log (err);
});

app.get ('/time/:id', (req, res) => {

    hrtime_start = process.hrtime();

    db.collection (config.mongo_collection).findOne ({_id: req.params.id}, (err, result) => {

        if (err) throw err;

        hrtime_end = process.hrtime (hrtime_start);

        res.json ({
            data: result,
            time: hrtime_end
        });
    });
});

app.listen (config.server_port, () => console.log (`Example app listening on port ${config.server_port}.`));