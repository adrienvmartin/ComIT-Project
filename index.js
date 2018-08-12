const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

app.set('view engine', 'pug');

app.get('/newshow', (req, res) => {
    res.render('newshow', { title: 'Concert Database', message: 'Add New Show' });
});

app.get('/', (req, res) => {
    MongoClient.connect(url, function (err, client) {
        const db = client.db('showtest');
        const collection = db.collection('show1');

        collection.find({}).toArray((error, documents) => {
            client.close();
            res.render('layout', { documents: documents });
        });
    });
});

app.get('/showsubmit', (req, res) => {
    MongoClient.connect(url, function (err, client) {

        const db = client.db('showtest');
        const collection = db.collection('show1');

        const newshow = { "headliner": req.query.headliner, "openers": req.query.openers, "city": req.query.city, "venue": req.query.venue, "date": req.query.date };

        // NOTE: Separate all bands, venues, etc. into their individual objects as well as being part of the full show listing

        collection.insertOne(newshow, (err, result) => {
            callback(result);
        });

        let results = collection.find().value;

        let headliner = collection.find().headliner;
        let opener = collection.find().openers;

        res.send(`We got the following values from the query string: ${newshow.headliner} w/ ${newshow.openers} - ${newshow.date} @ ${newshow.venue}, ${newshow.city}`);

    });


    // Use this to render the page using the values from the database
    app.get('/mainlisting', (req, res) => {
        MongoClient.connect(url, function (err, client) {

            const db = client.db('showtest');
            const collection = db.collection('show1');

            const shows = collection.find();

            res.render('mainlisting', { title: "Full Listings", headliner: shows.headliner });
        });

    });

    // After receiving the query from the first page, generate a new page with the appropriate number of fields for each band

    // use res.render, with the variables being used for the number of fields



});

app.listen(3000);