var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var MemoryStore = require('connect').session.MemoryStore;
var dbPath = 'mongodb://localhost/nodebackbone';

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
    app.use(session({
        session:"SocialNet secret key",
        store:new MemoryStore(),
    }));

    mongoose.connect(dbPath,function onMongooseError(err){
        if(err)
            throw err;
    });
});

app.get('/',function(req,res){
    res.render('index.jade');
});

app.post('/login', function (req, res) {
    var email = req.query.email;
    var password = req.query.password;
    if (null == email || email.length < 1 || null == password || password.length < 1) {
        res.send(400);
        return;
    }

    models.Account.login(email, password, function (account) {
        if (!account) {
            res.send(401);
            return;
        }
        console.log("Login Successful");
       req.session.loggedIn = true;
       req.session.accountId = account._id;
       res.send(200);
    });
});

app.post('/register', function (req, res) {
    var firstName = req.query.firstName
    var lastName = req.query.lastName;
    var email = req.query.email;
    var password = req.query.password;

    if (null == email || email.length < 1 || null == password || password.length < 1) {
        res.send(400);
        return;
    }

    models.Account.register(email, password, firstName, lastName);
    res.send(200);
});

app.get('/account/authenticated',function(req,res){
    if(req.session.loggedIn){
        res.send(200);
    }else{
        res.send(401);
    }
});

app.get('/accounts/:id/activity', function (req, res) {
    var accountId = req.params.id == 'me' ? req.session.accountId : req.params.id;
    models.Account.findById(accountId, function (account) {
        res.send(account.activity);
    })
});

app.get('/accounts/:id/status', function (req, res) {
    var accountId = req.params.id == 'me' ? req.session.accountId : req.params.id;
    models.Account.findById(accountId, function (account) {
        res.send(account.status);
    });
});

app.post('/accounts/:id/status', function (req, res) {
    var accountId = req.params.id == 'me' ? req.session.accountId : req.params.id;
    models.Account.findById(accountId, function (account) {
        status = {
            name: account.name,
            status: req.query.status
        };
        account.status.push(status);

        //Push the status to all friends
        account.activity.push(status);
        account.save(function (err) {
            if (err) {
                console.log("Error saving account: " + err);
            }
        });
    });
    res.send(200);
});

app.get('/accounts/:id', function (req, res) {
    var accountId = req.params.id == 'me' ? req.session.accountId : req.params.id;

    models.Account.findOne({ _id: accountId }, function (account) {
        res.send(account);
    })
});

app.get('/accounts/:id/contacts',function(req,res){
    var accountId = req.params.id == 'me' ? req.session.accountId : req.params.id;
    models.Account.findById(accountId,function(account){
        res.send(account.contacts);
    });
});

app.post('/contacts/find',function(req,res){
    var searchStr = req.query.searchStr;
    if(null == searchStr){
        res.send(400);
        return;
    }

    models.Account.findByString(searchStr,function onSearchDone(err,accounts){
        if(err||accounts.length == 0){
            res.send(400);
        }else{
            res.send(accounts);
        }
    });
});

app.post('/forgotpassword',function(req,res){
    var hostname = req.headers.host;
    var resetPasswordUrl = 'http://'+ hostname +'/resetPassword';
    var email = req.query.email;
    if(null == email ||email.length < 1){
        res.send(400);
        return;
    };

    models.Account.forgotPassword(email,resetPasswordUrl,function(success){
        if(!success){
            res.send(200);
        }else{
            res,send(404);
        }
    });
});

app.get('/resetPassword',function(req,res){
    var accountId = req.body.accountId;
    res.render('resetPassword.jade',{
        locals:{
            accountId:accountId
        }
    });
});

app.post('/resetPassword',function(req,res){
    var accountId = req.query.accountId;
    var password = req.query.password;
    if(null != accountId && null != password){
        models.Account.changePassword(accountId,password);
    }
    res.render('resetPasswordSuccess.jade');
})

app.listen(8080);