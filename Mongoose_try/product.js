const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection open");
    })
    .catch(err => {
        console.log("Error in connecting");
        console.log(err);
    });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlegth: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive cabron']
    },
    onSale: {
        type: Boolean,
        default: false,
    },
    categories: {
        type: [String],
        default: ['cycling'],
    },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
})
//FUNCTION THAT DON?T WORK IF USED AS ARROW FUNCTION, so NORMAL

// productSchema.methods.greet = function () {
//     console.log('Hello biatch');
//     console.log(`-from ${this.name}`)
// }
productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}


productSchema.methods.addCategory = function (newCateg) {
    this.categories.push(newCateg);
    return this.save;
}

productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 })
}

const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({
        name: 'Mountain Bike'
    });
    // foundProduct.greet();
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory('Outdoors');
    console.log(foundProduct);
}


Product.fireSale().then((res) => console.log(res));

//findProduct();

// const bike = new Product({ name: 'Mountain Bike', price: 599, onSale: true, categories: ['Cicling', 'Safety', 123], qty: { online } });
// bike.save()
//     .then(data => {
//         console.log('It Worked');
//         console.log(data);
//     }).catch(err => {
//         console.log('Whoopsi');
//         console.log(err);
//     })

// const bike = new Product({ name: 'Cyclig jersey', price: 28.50, onSale: true, categories: ['Cycling'], qty: { online: 25, inStore: 15 }, size: 'XS' });
// bike.save()
//     .then(data => {
//         console.log('It Worked');
//         console.log(data);
//     }).catch(err => {
//         console.log('Whoopsi');
//         console.log(err);
//     })

// Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: -9.99 }, { new: true, runValidators: true })//WE STILL NEED VALIDATION OR THE PREVIOUS VALIDATION 
//     //WILL BE NULL
//     .then(data => {
//         console.log('It Worked');
//         console.log(data);
//     }).catch(err => {
//         console.log('Whoopsi');
//         console.log(err);
//     })
