const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

app.use(cookieParser('thisismysecret'));

app.get('/greet',(req,res)=>{
    const {name = "No-Name"} = req.cookies;
    res.send(`Hello there ${name}`);
});

app.get('/setname',(req,res)=>{
    res.cookie('name','luca');
    res.cookie('animal','metal-shrimp');
    res.send('Send cookie');
});

app.get('/getsignedcookie',(req,res)=>{
    res.cookie('fruit',"grape",{signed:true});
    res.send('Ok signed your fruit cookie');        
})

app.get('/verifyfruit',(req,res)=>{
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send(req.signedCookies);
})
app.listen(3000,()=>{
    console.log("Server listening on port 3000");
});