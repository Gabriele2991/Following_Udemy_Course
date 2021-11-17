const franc = require("franc");
const langs = require("langs");
const colors = require("colors");

const input = process.argv[2];

let langCode = franc(input);
if (langCode === 'und') {
    const sorry = "cannot figure out name and location of this particular language"
    const err = () => {
        console.log(sorry.red);
    }
    err();
} else {
    let language = langs.where('3', langCode);
    console.log(language.name.green, language.local.green);
}


