const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { title: 'Concert Database', message: 'Concert database' });
});

app.get('/newshow', (req, res) => {
    res.render('newshow', { title: 'Add Concert', message: 'Add New Headliner Show'});
});

app.get('/showfield1', (req, res) => {
    const numOfBands = req.query.numofbands;
    const city = req.query.city;
    const venue = req.query.venue;
    const date = req.query.date;

    // After receiving the query from the first page, generate a new page with the appropriate number of fields for each band

    // use res.render, with the variables being used for the number of fields

    res.render('newshow2', { fields: numOfBands, title: "Add Concert", message: "Add New Headliner Show", city: `${city}`, venue: `${venue}`, date: `${date}`});
    
    res.send(`We got the following values from the query string: ${headliner} w/ ${opener}, ${date} at ${venue}, ${city}`);
  });

app.get('/shows', (req, res) => {
    const headliner = req.query.headliner;
    const opener = req.query.opener;
    const city = req.query.city;
    const venue = req.query.venue;
    const date = req.query.date;

    res.send(`We got the following values: ${headliner} w/ ${opener}, ${date} at ${venue} in ${city}`);
})

app.listen(3000);