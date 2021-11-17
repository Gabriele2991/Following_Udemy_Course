const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError');

app.use(morgan('tiny'));

var requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
};

app.use(requestTime);

app.use('/dogs', (req, res, next) => {
    console.log('Doggos');
    console.log(req.method, req.path);
    next();
});

// app.get('/error', (req, res) => {
//     chicken.fly();
// })

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennuggets') {
        next()
    };
    // res.send('password NEEDED');
    res.status(401);
    throw new Error('Password required');
};

app.get('/dogs', (req, res) => {
    console.log(`Request date: ${requestTime}`);
    res.send('Woff,woff');
})
app.get('/secret', verifyPassword, (req, res) => {
    res.send('my secret is:bulabulabula');
})

app.use((req, res) => {
    res.status(404).send('Not found');
})

app.use((err, req, res, next) => {
    // console.log('************************************');
    // console.log('*************ERROR******************');
    // console.log('************************************');
    // next(err);
    // res.status(500).send('oh boy we got an error');
    const { status } = err;
    res.status(status).send('error');
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})