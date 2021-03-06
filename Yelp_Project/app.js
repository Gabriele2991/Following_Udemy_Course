const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
const ExpressError = require("./utils/ExpressError")
const methodOverride = require('method-override');


const campgrounds = require('./routes/campgrounds')
const reviews = require('./routes/reviews')
const app = express();

//MONGOOSE CONNECTION
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});
//MIDDLEWARE

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret:"simplesecret",
    resave:false,
    saveUninitialized:true,
    //store:THIS SHOULD BECOME MONGODB STORE BUT NORMALLY WE WILL USE REDIS 
    cookie:{
        httpOnly:true,
        expires:Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/campgrounds',campgrounds);//need to utilize the router function in routes folder
app.use('/campgrounds/:id/reviews',reviews);//need to utilize the router function in routes folder

app.all("*",(req,res,next)=>{
    next(new ExpressError('Page not Found',404));
});

app.use((err,req,res,next)=>{
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Something went wrong';
    res.status(statusCode).render('error',{err});
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});
