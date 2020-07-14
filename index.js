const express = require('express')
const app = express()

app.set('view-engine', 'ejs');
app.use(express.static('public'));
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

let database = new Map();

addLink("marco", "https://www.bestofcode.net");
addLink("ggl", "https://www.google.com");
addLink("hhu", "https://www.hhu.de");
addLink("twt", "https://www.twitter.com");


let data;

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

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

app.post('/add/', (req, res) => {
    if(req.body.link && req.body.destination) {
        database.set(req.body.link, req.body.destination);
    }
    res.redirect("/");   
});

app.get('/:route', (req, res) => {
    let destination = database.get(req.params.route);
    console.log(req.params.route);
    if(destination)
        res.redirect(destination);
});