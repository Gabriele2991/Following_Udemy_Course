const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
    secret:'thisIsAShittySecret',
    resave:false,
    saveUninitialized:false
}));

app.get('/viewcount',(req,resizeBy)=>{
    if(req.session.count){
        req.session.count +=1;
    }else{
        req.session.count = 1;
    }
    resizeBy.send(`You have benn on this page for ${req.session.count} time/s` )
})

app.get('/register',(req,res)=>{
    const {username = 'Anonymous'}= req.query;
    req.session.username = username;
    res.redirect('/greet');
})

app.get('/greet',(req,res)=>{
    const {username} = req.session;
    res.send(`Welcome back,${username}`);
})

app.listen(3000,()=>{
    console.log('Server listening on port 3000');
});