const express = require('express')
const app = express()

app.set('view-engine', 'ejs');
app.use(express.static('public'));

let database = new Map();

database.set("marco", "https://www.bestofcode.net");
database.set("ggl", "https://www.google.com");
database.set("hhu", "https://www.hhu.de");
database.set("twt", "https://www.twitter.com");


let data;

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});

app.get('/', (req, res) => {
    res.render('index.ejs', {data: database.entries()});
});

app.get('/delete/:link', (req, res) => {
    database.delete(req.params.link);
    res.redirect("/");   
});

app.get('/:route', (req, res) => {
    let destination = database.get(req.params.route);
    console.log(req.params.route);
    if(destination)
        res.redirect(destination);
});