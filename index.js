const express = require('express')
const app = express()

app.set('view-engine', 'ejs');
app.use(express.static('public'));

let database = new Map();

addLink("marco", "https://www.bestofcode.net");
addLink("ggl", "https://www.google.com");
addLink("hhu", "https://www.hhu.de");
addLink("twt", "https://www.twitter.com");


let data;

function addLink(abbreviation, destination) {
    database.set(abbreviation, destination);
}

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

app.post('/add/:link', (req, res) => {
    database.delete(req.params.link);
    res.redirect("/");   
});

app.get('/:route', (req, res) => {
    let destination = database.get(req.params.route);
    console.log(req.params.route);
    if(destination)
        res.redirect(destination);
});