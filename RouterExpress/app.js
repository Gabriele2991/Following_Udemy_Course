const express = require('express');
const app = express();
const shelterRoutes = require('./routes/shelters');
const dogRoutes = require('./routes/dogs');
const adminRoutes = require('./routes/admin');

app.use('/admin',adminRoutes);
app.use('/shelters',shelterRoutes);//se lo aggiungo qui posso rimuoverlo da tutte quelle nella pagina routes
app.use('/dogs',dogRoutes)

app.listen(3000,()=>{
    console.log('Server listening on port 3000');
})