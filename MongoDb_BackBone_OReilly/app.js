var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var MemoryStore = require('connect').session.MemoryStore;

//Import data Layer
var mongoose = require('mongoose');
var config = {
    mail:require('./config/mail')
};

//Import the accounts
var Account = require('./models/Account')(config,mongoose,nodemailer);

app.configure(function(){
    app.set('view engine', 'jade');
    app.use(express.static(__dirname + '/public'));
    app.use(express.limit('1mb'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
        session:"SocialNet secret key",
        store:new MemoryStore()
    }));
    mongoose.connect('mongodb://localhost/nodebackbone');
});

app.get('/',function(req,res){
    res.render('index.jade');
});

app.post('/login', function (req, res) {
    var email = req.params('email', null);
    var password = req.params('password', null);
    if (null == email || email.length < 1 || null == password || password.length < 1) {
        res.send(400);
        return;
    }

    Account.login(email, password, function (success) {
        if (!success) {
            res.send(401);
            return;
        }
        console.log("Login Successful");
       req.session.loggedIn = true;
       res.send(200);
    });
});

app.post('/register', function (req, res) {
    var firstName = req.params('firstName', '');
    var lastName = req.params('lastName', '');
    var email = req.params('email', null);
    var password = req.params('password', null);

    if (null == email || email.length < 1 || null == password || password.length < 1) {
        res.send(400);
        return;
    }

    Account.register(email, password, firstName, lastName);
    res.send(200);
});

app.get('/account/authenticated',function(req,res){
    if(req.session.loggedIn){
        res.send(200);
    }else{
        res.send(401);
    }
});

app.post('/forgotpassword',function(req,res){
    var hostname = req.headers.host;
    var resetPasswordUrl = 'http://'+ hostname +'/resetPassword';
    var email = req.params('email',null);
    if(null == email ||email.length < 1){
        res.send(400);
        return;
    };

    Account.forgotPassword(email,resetPasswordUrl,function(success){
        if(!success){
            res.send(200);
        }else{
            res,send(404);
        }
    });
});

app.get('/resetPassword',function(req,res){
    var accountId = req.params('accountId',null);
    res.render('resetPassword.jade',{
        locals:{
            accountId:accountId
        }
    });
});

app.post('/resetPassword',function(req,res){
    var accountId = req.params('accountId',null);
    var password = req.params('password',null);
    if(null != accountId && null != password){
        Account.changePassword(accountId,password);
    }
    res.render('resetPasswordSuccess.jade');
})

app.listen(8080);