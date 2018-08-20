/*

TO DO:
-Add sorting option for main listing page
-Add function that checks for duplicates for venues/bands/cities and then adds up the totals

DONE:
--Make separate pages for headliner gigs vs festivals
-Separate different opening bands by commas *DONE*
-Have the date be shown in written format at some point *DONE*
-Add number to each show *DONE*

*/

const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const functions = require('./projectfunctions.js');

app.set('view engine', 'pug');

app.get('/newshow', (req, res) => {
    res.render('newshow', { title: 'Concert Database', message: 'Add New Show' });
});

app.get('/newfestival', (req, res) => {
    res.render('newfestival', { title: 'Concert Database', message: 'Add New Show' });
});

app.get('/', (req, res) => {
    MongoClient.connect(url, function (err, client) {
        const db = client.db('showtest');
        const collection = db.collection('show1');

        collection.find({}, {sort: {date: 1}}).toArray((error, documents) => {
            client.close();
            res.render('index', { documents: documents});
        });
    });
});

app.get('/showsubmit', (req, res) => {
    MongoClient.connect(url, function (err, client) {

        const db = client.db('showtest');
        const collection = db.collection('show1');
        const bandCollection = db.collection('bands');

        // IMPORTANT: use data from field to display opening bands on page,but MAKE A FUNCTION HERE to separate opening bands into individual bands and enter those into their own database to be used later in the separate pages

        const newshow = { "headliner": req.query.headliner, "openers": req.query.openers, "city": req.query.city, "venue": req.query.venue, "date": req.query.date, "writtendate": functions.writtenDate(req.query.date), "showtype": req.query.showtype };

        const headliners = req.query.headliner;
        const openers = req.query.openers;

        let bandList = {"headliner": headliners, "openers": openers};

        collection.insertOne(newshow, (err, result) => {
        });

        bandCollection.insertOne(bandList, (err, result) => {
        });

        collection.find({}, {sort: {date: 1}}).toArray((error, documents) => {
            client.close();
            res.render('mainlisting', { documents: documents});
        });

    });

});


app.get('/festivalsubmit', (req, res) => {
    MongoClient.connect(url, function (err, client) {

        // Add a "showtype" function to ALL show submissions, use this on the listings page to differentiate between headliners and festivals

        const db = client.db('showtest');
        const collection = db.collection('show1');
        const bandCollection = db.collection('bands');

        // IMPORTANT: use data from field to display opening bands on page,but MAKE A FUNCTION HERE to separate opening bands into individual bands and enter those into their own database to be used later in the separate pages

        const newshow = { "headliner": req.query.headliner, "openers": req.query.openers, "city": req.query.city, "venue": req.query.venue, "date": req.query.date, "writtendate": functions.writtenDate(req.query.date), "showtype": req.query.showtype, "festival": req.query.festival };

        const headliners = req.query.headliner;
        const openers = req.query.openers;

        let bandList = {"headliner": headliners, "openers": openers};

        collection.insertOne(newshow, (err, result) => {
            // callback(result);
        });

        bandCollection.insertOne(bandList, (err, result) => {

        });

        collection.find({}, {sort: {date: 1}}).toArray((error, documents) => {
            client.close();
            res.render('mainlisting', { documents: documents});
        });

    });

});



app.get('/date', (req, res) => {
    MongoClient.connect(url, function (err, client) {
        // event.preventDefault();
        const db = client.db('showtest');
        const collection = db.collection('show1');

        collection.find({}, {sort: {date: 1}}).toArray((error, documents) => {
            client.close();
            res.render('layout', { documents: documents});

        });
    });
});



app.get('/name', (req, res) => {
    MongoClient.connect(url, function (err, client) {
        event.preventDefault();
        const db = client.db('showtest');
        const collection = db.collection('show1');

        collection.find({}, {sort: {date: 1}}).toArray((error, documents) => {
            client.close();
            res.render('layout', { documents: documents});

        });
    });
})


    // Use this to render the page using the values from the database
app.get('/mainlisting', (req, res) => {
    MongoClient.connect(url, function (err, client) {

        const db = client.db('showtest');
        const collection = db.collection('show1');

        collection.find({}, {sort: {date: 1}}).toArray((error, documents) => {
            client.close();
            res.render('mainlisting', { documents: documents});
        });
    });

});

app.get('/bands', (req, res) => {
    MongoClient.connect(url, function (err, client) {
        const db = client.db('showtest');
        const collection = db.collection('show1');
        const bandCollection = db.collection('bands');

        bandCollection.find({}).toArray((error, documents) => {
            client.close();
            res.render('bands', {documents: documents});
        });
    });
});

app.get('/venues', (req, res) => {
    MongoClient.connect(url, function (err, client) {
        const db = client.db('showtest');
        const collection = db.collection('show1');

        collection.find({}).toArray((error, documents) => {
            client.close();
            res.render('venues', {documents: documents});
        });
    });
});


app.listen(3000);