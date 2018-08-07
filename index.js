const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { title: 'Concert Database', message: 'Concert database' });
});

app.get('/newshow', (req, res) => {
    res.render('newshow', { title: 'Add Concert', message: 'Add New Headliner Show'});
});

app.get('/concert', (req, res) => {
    const headliner = req.query.headliner;
    const city = req.query.city;
    const venue = req.query.venue;
    const date = req.query.date;
    // const openers = req.query.newForm;

    // After receiving the query from the first page, generate a new page with the appropriate number of fields for each band

    // use res.render, with the variables being used for the number of fields
    
    res.send(`We got the following values from the query string: ${headliner}, ${date} at ${venue}, ${city}`);
    
  });

app.get('/shows', (req, res) => {
    const headliner = req.query.headliner;
    const opener = req.query.opener;
    const city = req.query.city;
    const venue = req.query.venue;
    const date = req.query.date;


});

app.listen(3000);