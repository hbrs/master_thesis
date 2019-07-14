const express = require ('express');
const mongo = require ('mongodb');

const app = express();

const config = {
    mongo_host: '172.17.0.3',
    mongo_port: 27017,
    mongo_db: 'mongo_connector',
    server_port: 3000
};

let db, hrtime_start, hrtime_end;

mongo.MongoClient.connect (
    `mongodb://${config.mongo_host}:${config.mongo_port}`,
    { useNewUrlParser: true },
    (err, client) => {

        if (!err)
            db = client.db ('ccm');
        else
            console.log (err);
});


app.use ((req, res, next) => {
    res.header ('Content-Type', 'application/json');
    next();
});

app.get ('/time/:id', (req, res) => {

    hrtime_start = process.hrtime();

    db.collection ('rmuel12s_components').findOne ({_id: req.params.id}, (err, result) => {

        if (err) throw err;

        hrtime_end = process.hrtime (hrtime_start);

        res.send ({
            data: result,
            time: hrtime_end
        });
    });
});

app.listen (config.server_port, () => console.log (`Example app listening on port ${config.server_port}.`));