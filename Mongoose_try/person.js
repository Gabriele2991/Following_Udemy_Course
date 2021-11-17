const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection open");
    })
    .catch(err => {
        console.log("Error in connecting");
        console.log(err);
    });

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`;
})

personSchema.pre('save', async function () {//this function runs just before save
    this.first = 'yo';
    this.last = 'Mama';
    console.log("About to save");
})
personSchema.post('save', async function () {//this function runs just after saving
    console.log(`${this.first} ${this.last}`);
    console.log('Just saved');
})

const Person = mongoose.model('Person', personSchema);
