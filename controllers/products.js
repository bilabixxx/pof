const mongoose = require('mongoose');
const Product = require('../models/products');

const statusAdded = 201;
const statusError = 404;

const createdMessage = "Prodotto creato con successo!";
const updatedMessage = "Prodotto aggiornato con successo!";
const deletedMessage = "Prodotto eliminato con successo!";
const error = {
    message: "Prodotto non trovato!"
};

const addProduct = async (req, res) => {
    const name = req.body.name;

    try {
        const product = new Product({ name });
        await product.save();
        return res.success({ statusAdded, message: createdMessage });
    } catch (e) {
        return res.fail({
            error: {
                message: "Non è stato rispettato correttamente lo schema!"
            }
        })
    }
}


const getAllProducts = async (req, res) => {

    try {
        const products = await Product.find({}, { __v: 0, updatedAt: 0 })
        return res.success({ data: products })
    } catch (e) {
        return res.fail({ status: statusError, error })
    }
}

const getProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id, { __v: 0, updatedAt: 0 });
        return res.success({ data: product });
    } catch (e) {
        return res.fail({ status: statusError, error });
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const data = { ...req.body };

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.fail({ status: statusError, error });
        await Product.findByIdAndUpdate(id, data, { new: true });
        return res.success({ statusAdded, message: updatedMessage })
    } catch (e) {
        return res.fail({ status: statusError, error })
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.fail({ status: statusError, error });
        await Product.findByIdAndDelete(id);
        return res.success({ message: deletedMessage })
    } catch (e) {
        return res.fail({ status: statusError, error })
    }
}

module.exports = { addProduct, getAllProducts, updateProduct, deleteProduct, getProduct }