const express = require("express");
const app = express();

// console.dir(app);
// app.use(() => {//anythime there's a request this app.use will run
//     console.log("we get a request")
// })

//use USATO SOLO ALLA FINE PERCHé CHIUDE LA RICHIESTA(cioe quello che ci sta dentro può essere chiesto una volta sola)

// app.use((req, res) => {
//     console.log("We got a request");
//     console.log(req);
//     res.send({ color: 'red' });
// })
app.get('/', (req, res) => {
    res.send("Welcome to the homepage XD");
});

app.post('/cats', (req, res) => {
    res.send("Post request!!!");
});

app.get('/cats', (req, res) => {
    // console.log("Cat request")
    res.send('Miao');
});

app.get('/dog', (req, res) => {
    res.send('Bau');
});
//GENERIC PATH

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`browsing ${subreddit} subreddit`);
});

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`View the Post Id : ${postId} on the ${subreddit} subreddit`);
});

app.get('/search', (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.send('Nothing Found if nothing is searched')
    } else {
        res.send(`<h1>Search result for ${q}</h1>`);
    }
})

//server connection
app.listen(3000, () => {
    console.log("port 3000 listening");
})



