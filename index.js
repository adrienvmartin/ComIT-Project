/*

TO DO:

-Separate different opening bands by commas
-Make separate pages for headliner gigs vs festivals
-Add sorting option for main listing page

DONE:
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

        const newshow = { "headliner": req.query.headliner, "openers": req.query.openers, "city": req.query.city, "venue": req.query.venue, "date": req.query.date, "type": req.query.showtype };

        const headliners = req.query.headliner;
        const openers = req.query.openers;

        let bandList = {"headliner": headliners, "openers": openers};

        /* function writtenDate(date) {

            let string = date.toString();

            let year = string.slice(0, 4);
            let month = string.slice(5, 7);
            let day = string.slice(8, 10);

            let writtenMonth;
            let writtenDay;

            if (month == 01) {
                writtenMonth = "January";
            }

            else if (month == 02) {
                writtenMonth = "February";
            }

            else if (month == 03) {
                writtenMonth = "March";
            }

            else if (month == 04) {
                writtenMonth = "April";
            }

            else if (month == 05) {
                writtenMonth = "May";
            }

            else if (month == 06) {
                writtenMonth = "June";
            }

            else if (month == 07) {
                writtenMonth = "July";
            }

            else if (month == 08) {
                writtenMonth = "August";
            }

            else if (month == 09) {
                writtenMonth = "September";
            }

            else if (month == 10) {
                writtenMonth = "October";
            }

            else if (month == 11) {
                writtenMonth = "November";
            }

            else if (month == 12) {
                writtenMonth = "December";
            }


            if (day.charAt(0) == 1) {
                writtenDay = `${day}th`;
            }

            else if (day.charAt(1) == 1) {
                writtenDay = `${day}st`;
            }

            else if (day.charAt(1) == 2) {
                writtenDay = `${day}nd`;
            }

            else if (day.charAt(1) == 3) {
                writtenDay = `${day}rd`;
            }

            else {
                writtenDay = `${day}th`;
            }

            let finalDate = `${writtenMonth} ${writtenDay}, ${year}`;
            return finalDate;

        }; */

        newshow["writtendate"] = functions.writtenDate(req.query.date);

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


app.get('/festivalsubmit', (req, res) => {
    MongoClient.connect(url, function (err, client) {

        // Add a "showtype" function to ALL show submissions, use this on the listings page to differentiate between headliners and festivals

        const db = client.db('showtest');
        const collection = db.collection('show1');
        const bandCollection = db.collection('bands');

        // IMPORTANT: use data from field to display opening bands on page,but MAKE A FUNCTION HERE to separate opening bands into individual bands and enter those into their own database to be used later in the separate pages

        const newshow = { "festival": req.query.festival, "bands": req.query.bands, "city": req.query.city, "venue": req.query.venue, "date": req.query.date, "type": req.query.showtype };

        const bands = req.query.bands;

        let bandList = {"bands": bands};

        newshow["writtendate"] = functions.writtenDate(req.query.date);

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

        let bandList = [];

        collection.find({}, {sort: { headliner: 1}}).toArray((error, documents) => {
            client.close();
            /*
            let bandList = [];
            let newBandList = [];
            for (i=0; i < documents.length; i++) {
                bandList[i] = documents[i].openers.split(",");
                let headliner = documents[i].headliner;
                bandList.push(headliner);
                bandList.forEach(function (b) {
                    bandCollection.insertOne({"name": `${b}`});
                });
            
            } */
            // console.log(bandList);
            // console.log(`The length of bandList array is: ${bandList.length}`);
            res.render('bands', {documents: documents});
        });
    });
});


app.listen(3000);