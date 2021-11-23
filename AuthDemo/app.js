const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

mongoose.connect('mongodb://localhost:27017/login-Demo', {
    useNewUrlParser: true
})
.then(()=>{
    console.log("Mongo connection Open");
})
.catch(err=>{
    console.log("Mongo is not connected");
    console.log(err);
})

app.set('view engine','ejs');
app.set('views','views');
app.use(express.urlencoded({extended:true}));
app.use({secret:'notagoodsecret'})

const requireLogin = (req,res,next)=>{
    if(!req.session.user_id){
        return res.redirect('/login');
    }
    next();
}

app.get('/',(req,res)=>{
    res.send("This is the homepage")
})

app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/register',async (req,res)=>{
    const { password, username } = req.body;
    const user = new User({username,password});
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/');
})

app.get('/login',(req,res)=>{
    res.render('login');
});

app.post('/login',async (req,res)=>{
    const { password, username } = req.body;
    const foundUser = User.findOneAndValidate(username,password);
    if(foundUser){
        req.session.user_id = foundUser._id;
        res.redirect('/secret');
    }else{
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    //req.session.user_id = null;
    req.session.destroy();
    res.redirect('/login');
});

app.get('/secret',requireLogin,(req,res)=>{
    // if(!req.session.user_id){
    //     return res.redirect('/login');
    // }
    res.render('secret');
})

app.listen(3000,()=>{
    console.log('Server listening on port 3000');
})