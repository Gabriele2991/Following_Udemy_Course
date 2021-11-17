const express = require("express");
const app = express();
const path = require('path');
const redditData = require('./data.json');
// console.log(redditData);

app.use(express.static(path.join(__dirname, '/public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));//serve per poter eseguire ejs anche da una directory diversa da quella in cui si trova views
//si pone ora il problema che se eseguo da un path diverso(tipo template invece che index.js direttamente)non legge il css


app.get('/', (req, res) => {//RENDER
    res.render('home');
})

app.get('/cats', (req, res) => {
    const cats = [//pretending to use a DATABASE
        'Blue', 'rocket', 'Monty', 'Stefanie', 'Winston'
    ]
    res.render('cats', { cats });
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit });
    }
    // console.log(data);
})

app.get('/rand', (req, res) => {//RENDER
    const random = Math.floor(Math.random() * 10) + 1;
    res.render('random', { random });
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})