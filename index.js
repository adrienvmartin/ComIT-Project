/*

TO DO:
-Add sorting option for main listing page
-Add Unit Tests***
-Add delete/update options for show listing

DONE:
--Make separate pages for headliner gigs vs festivals
-Separate different opening bands by commas *DONE*
-Have the date be shown in written format at some point *DONE*
-Add number to each show *DONE*
-Add function that checks for duplicates for venues/bands/cities and then adds up the totals *DONE*


POSSIBLE:
-Use the functions from the bands and venues pages in Node Express to generate that data straight into MongoDB

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

app.get('/newlocal', (req, res) => {
    res.render('newlocal', { title: 'Concert Database', message: 'Add New Show' });
});

app.get('/', (req, res) => {
    MongoClient.connect(url, function (err, client) {
        const db = client.db('showtest');
        const collection = db.collection('show1');

        useNewUrlParser: true;


        collection.find({}, {sort: {date: 1}}).toArray((error, documents) => {
            client.close();
            res.render('index', { documents: documents});
        });
    });
});

// Function for generating band pages: app.get - collection.find() - res.render ('variable') - insert in "/showsubmit" rather than rendering the mainlisting page? Perhaps: have one page for shows that dynamically enters the content, rather than generating a new page for each single show?

app.get('/showsubmit', (req, res) => {
    MongoClient.connect(url, function (err, client) {

        const db = client.db('showtest');
        const collection = db.collection('show1');
        const bandCollection = db.collection('bands');

        const newshow = { "headliner": req.query.headliner, "openers": req.query.openers, "city": req.query.city, "venue": req.query.venue, "date": req.query.date, "writtendate": functions.writtenDate(req.query.date), "showtype": req.query.showtype };

        const headliners = req.query.headliner;
        const openers = req.query.openers;

        let bandList = {"headliner": headliners, "openers": openers};

        bandCollection.insertOne(bandList, (err, result) => {
        });

        collection.insertOne(newshow, (err, result) => {
        });

        collection.find({}, {sort: {date: 1}}).toArray((error, documents) => {
            client.close();
            res.render(`mainlisting`, { documents: documents});
        });

    });

});


app.get('/sortyears', (req, res) => {
    MongoClient.connect(url, function (err, client) {

        const db = client.db('showtest');
        const collection = db.collection('show1');
        const bandCollection = db.collection('bands');

        collection.find({}).toArray((error, documents) => {
            documents.forEach(function (c) {
                let id = c._id;
                let displayYear = c.date.slice(0,4);
                // collection.updateOne({"_id": id}, { $set: {"year": displayYear}});
            });
    });
    });     


});


app.get('/festivalsubmit', (req, res) => {
    MongoClient.connect(url, function (err, client) {

        const db = client.db('showtest');
        const collection = db.collection('show1');
        const bandCollection = db.collection('bands');

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

app.get('/localsubmit', (req, res) => {
    MongoClient.connect(url, function (err, client) {

        const db = client.db('showtest');
        const collection = db.collection('localshows');
        const bandCollection = db.collection('bands');

        const newshow = { "bands": req.query.bands, "city": req.query.city, "venue": req.query.venue, "date": req.query.date, "writtendate": functions.writtenDate(req.query.date), "showtype": req.query.showtype, "festival": req.query.festival };

        let bandList = { "bands": req.query.bands };

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

app.get('/summary', (req, res) => {
    MongoClient.connect(url, function (err, client) {
        const db = client.db('showtest');
        const collection = db.collection('show1');

        collection.find({}).toArray((error, documents) => {
            client.close();
            res.render('summary', {documents: documents});
        });
    });
});

app.listen(3000);