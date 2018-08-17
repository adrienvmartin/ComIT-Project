/*

TO DO:

-Separate different opening bands by commas
-Have the date be shown in written format at some point
-Have the data organized by date *DONE*
-Figure out the structure - how best to interpret data (i.e. written date, having each year as a headline, having each band, venue, etc be selectable as its own thing and so on)
-Add number to each show *DONE*

-Split entered cities/venues/bands into their own database in addition to the general database, and then use those database entries to generate individual unique pages that are then linked up to the main listing

-NOTE: Make separate function that checks all the venues in the database against each other, makes a collection of all unique names, and passes those into a new database called "venues" - THAT is the database from which the venues pages will be generated. Same thing with bands and cities.


*/

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

        const newshow = { "headliner": req.query.headliner, "openers": req.query.openers, "city": req.query.city, "venue": req.query.venue, "date": req.query.date };

        const headliners = req.query.headliner;
        const openers = req.query.openers;

        const bandList = {"headliner": headliners, "openers": openers};

        function writtenDate(date) {

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

        };

        newshow["writtendate"] = writtenDate(req.query.date);

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

        bandCollection.find({}, {sort: { headliner: 1}}).toArray((error, documents) => {
            client.close();
            res.render('bands', {documents: documents});
        });
    });
});


app.listen(3000);