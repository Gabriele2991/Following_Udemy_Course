const express = require('express');
const morgan = require('morgan');
const app = express();

var requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
};
// var method = (req, res, next) => {
//     console.log(req.method.toUpperCase());
//     next();
// }
app.use(requestTime);

// app.use(morgan('common'));
// app.use(morgan('tiny'));
app.use(morgan('dev'));

// app.use(method);

// app.use((req, res, next) => {//senza next i meddleware bloccano tutto quello che viene dopo,il Next è come il continue
//     console.log('This is my first middleware');
//     return next();//tutto quello che sta scritto dopo return non viene letto(com'è giusto che sia)
//     console.log('This is my first middleware-aftercalling');
// })
// app.use((req, res, next) => {
//     console.log('This is my second middleware');
//     return next();
// })


app.get('/', (req, res) => {
    res.send('yohoooo');
});

app.get('/dogs', (req, res) => {
    res.send('woof woof');
});

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chicken nuggets') {
        next();
    } else {
        res.send('No good password you little runt');
    }
};

app.get('/cats', (req, res) => {
    res.send('miaow miaow');
});

app.get('/secret', verifyPassword, (req, res) => {
    res.send("My secret is: vaffanculo te e la tua curiosità. Mamma non te l'ha insegnato a non farti i cazzi degli altri?");
})


app.listen(3000, () => {
    console.log('Listening on port 3000');
});