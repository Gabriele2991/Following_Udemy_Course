const jokes = require('give-me-a-joke');
// console.dir(jokes);
const colors = require('colors');
// console.dir(colors);

jokes.getRandomDadJoke(function (joke) {
    console.log(joke.rainbow);
});

//IMPORTANTISSIMO da TERMINAL SE VOGLIO LINKARE A UNO SCRIPT UN GLOBAL PACKAGE DEVO,DALLO SCRIPT(IN TERMINAL) FAR PARTIRE  
//NPM LINK "NOME DEL PACKAGE" e così lo posso usare
