const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const functions = require('./javascript/projectfunctions.js');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'pug');

app.get('output.css',function(req,res){
    res.sendFile(path.join(__dirname + 'output.css')); 
  });

app.use('/images', express.static('images')); 

app.get('/newshow', (req, res) => {
    res.render('newshow', { title: 'Concert Database', message: 'Add Headlining Tour' });
});

app.get('/newfestival', (req, res) => {
    res.render('newfestival', { title: 'Concert Database', message: 'Add Music Festival' });
});

app.get('/newlocal', (req, res) => {
    res.render('newlocal', { title: 'Concert Database', message: 'Add Local Gig' });
});

app.get('/', (req, res) => {
    MongoClient.connect(url, function (err, client) {
        const db = client.db('showtest');
        const collection = db.collection('example');

        useNewUrlParser: true;


        collection.find({}, {sort: {date: 1}}).toArray((error, documents) => {
            client.close();
            res.render('index', { documents: documents});
        });
    });
});

app.post('/showsubmit', (req, res) => {
    MongoClient.connect(url, function (err, client) {

        const db = client.db('showtest');
        const collection = db.collection('example');

        const newshow = { "headliner": req.body.headliner, "openers": req.body.openers, "city": req.body.city, "venue": req.body.venue, "date": req.body.date, "writtendate": functions.writtenDate(req.body.date), "showtype": req.body.showtype };

        collection.insertOne(newshow, (err, result) => {
        });

        collection.find({}, {sort: {date: 1}}).toArray((error, documents) => {
            client.close();
            res.render(`mainlisting`, { documents: documents});
        });

    });

});


app.post('/festivalsubmit', (req, res) => {
    MongoClient.connect(url, function (err, client) {

        const db = client.db('showtest');
        const collection = db.collection('example');

        const newshow = { "headliner": req.body.headliner, "openers": req.body.openers, "city": req.body.city, "venue": req.body.venue, "date": req.body.date, "writtendate": functions.writtenDate(req.body.date), "showtype": req.body.showtype, "festival": req.body.festival };

        collection.insertOne(newshow, (err, result) => {
            // callback(result);
        });

        collection.find({}, {sort: {date: 1}}).toArray((error, documents) => {
            client.close();
            res.render('mainlisting', { documents: documents});
        });

    });

});

app.post('/localsubmit', (req, res) => {
    MongoClient.connect(url, function (err, client) {

        const db = client.db('showtest');
        const collection = db.collection('example');

        const newshow = { "openers": req.body.openers, "city": req.body.city, "venue": req.body.venue, "date": req.body.date, "writtendate": functions.writtenDate(req.body.date), "showtype": req.body.showtype };

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
        const collection = db.collection('example');

        collection.find({}, {sort: {date: 1}}).toArray((error, documents) => {
            client.close();
            res.render('mainlisting', { documents: documents});
        });
    });

});

app.get('/bands', (req, res) => {
    MongoClient.connect(url, function (err, client) {
        const db = client.db('showtest');
        const collection = db.collection('example');

        collection.find({}).toArray((error, documents) => {
            client.close();
            res.render('bands', {documents: documents});
        });
    });
});

app.get('/venues', (req, res) => {
    MongoClient.connect(url, function (err, client) {
        const db = client.db('showtest');
        const collection = db.collection('example');

        collection.find({}).toArray((error, documents) => {
            client.close();
            res.render('venues', {documents: documents});
        });
    });
});

app.get('/cities', (req, res) => {
    MongoClient.connect(url, function (err, client) {
        const db = client.db('showtest');
        const collection = db.collection('example');

        collection.find({}).toArray((error, documents) => {
            client.close();
            res.render('cities', {documents: documents});
        });
    });
});


app.get('/summary', (req, res) => {
    MongoClient.connect(url, function (err, client) {
        const db = client.db('showtest');
        const collection = db.collection('example');

        collection.find({}).toArray((error, documents) => {
            client.close();
            res.render('summary', {documents: documents});
        });
    });
});

app.listen(3000);