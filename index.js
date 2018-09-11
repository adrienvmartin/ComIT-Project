const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const functions = require('./projectfunctions.js');

app.set('view engine', 'pug');

app.get('style.css',function(req,res){
    res.sendFile(path.join(__dirname + 'output.css')); 
  });

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

        const newshow = { "headliner": req.query.headliner, "openers": req.query.openers, "city": req.query.city, "venue": req.query.venue, "date": req.query.date, "writtendate": functions.writtenDate(req.query.date), "showtype": req.query.showtype };

        collection.insertOne(newshow, (err, result) => {
        });

        collection.find({}, {sort: {date: 1}}).toArray((error, documents) => {
            client.close();
            res.render(`mainlisting`, { documents: documents});
        });

    });

});


app.get('/festivalsubmit', (req, res) => {
    MongoClient.connect(url, function (err, client) {

        const db = client.db('showtest');
        const collection = db.collection('show1');

        const newshow = { "headliner": req.query.headliner, "openers": req.query.openers, "city": req.query.city, "venue": req.query.venue, "date": req.query.date, "writtendate": functions.writtenDate(req.query.date), "showtype": req.query.showtype, "festival": req.query.festival };

        collection.insertOne(newshow, (err, result) => {
            // callback(result);
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
        const collection = db.collection('show1');

        const newshow = { "openers": req.query.openers, "city": req.query.city, "venue": req.query.venue, "date": req.query.date, "writtendate": functions.writtenDate(req.query.date), "showtype": req.query.showtype };

        collection.insertOne(newshow, (err, result) => {
            // callback(result);
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

        collection.find({}).toArray((error, documents) => {
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

app.get('/cities', (req, res) => {
    MongoClient.connect(url, function (err, client) {
        const db = client.db('showtest');
        const collection = db.collection('show1');

        collection.find({}).toArray((error, documents) => {
            client.close();
            res.render('cities', {documents: documents});
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