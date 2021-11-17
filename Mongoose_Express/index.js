const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const Product = require('./models/product');
const { urlencoded } = require('express');
const methodOverride = require('method-override');


//CONNECTION TO DATABASE
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo connection Open");
    })
    .catch(err => {
        console.log("Error in connecting Mongo");
        console.log(err);
    });

//MIDDLEWARE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//SITE SHOWING INFORMATION
const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, category });
    } else {
        const products = await Product.find({});
        res.render('products/index', { products, category: 'All' });
    }
})

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    // console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`);
    // res.send('making products');
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    // console.log(product);
    res.render('products/show', { product })
})
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories });
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.redirect(`/products/${product._id}`);
    // res.send('PUT');
})
app.delete('/products/:id', async (req, res) => {
    // res.send('you made it')
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

//CONNECTION TO PORT
app.listen(3000, () => {
    console.log("Connection opened,i'm listening on port 3000");
})

