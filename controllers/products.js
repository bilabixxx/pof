const mongoose = require('mongoose');
const Product = require('../models/products');

const addProduct = (req, res) => {
    const name = req.body.name;

    const product = new Product({ name });

    product.save()
        .then(() => res.status(201).json('Prodotto aggiunto!'))
        .catch(error => res.status(404).json('Errore: ' + error))
}


const getAllProducts = (req, res) => {
    Product.find({},{__v:0, updatedAt:0})
        .then(product => res.status(200).json(product))
        .catch(err => res.status(404).json(err))
}

const updateProduct = (req, res) => {
    const { id } = req.params;
    const data = { ...req.body }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json("Nessun prodotto da aggiornare trovato!")

    Product.findByIdAndUpdate(id, data, { new: true })
        .then(() => res.status(200).json("Prodotto aggiornato con successo!"))
        .catch(err => res.status(404).json("Errore: " + err))
}

const deleteProduct = (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json("Prodotto da elimare non trovato!")

    Product.findByIdAndDelete(id)
        .then(() => res.status(200).json("Prodotto eliminato con successo"))
        .catch(err => res.status(404).json("Errore: " + err));
}

const getProduct = (req, res) => {
    const { id } = req.params;
    Product.findById(id, {__v:0, updatedAt:0})
        .then(product => res.status(200).json(product))
        .catch(err => res.status(404).json("Errore: " + err))

}

module.exports = { addProduct, getAllProducts, updateProduct, deleteProduct, getProduct }