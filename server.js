const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders')


require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri)
    .then(() => {
        app.listen(5000);
        console.log("Connessione al DB avvenuta con successo...")
    })
    .catch(err => console.log(err.json()))
