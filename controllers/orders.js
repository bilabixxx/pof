const mongoose = require('mongoose');
const Order = require('../models/orders');
const User = require('../models/users');

const addOrder = async (req, res) => {
    const id_user = req.body.id_user;
    const products = req.body.products;


    const checkData = async (userID, productsReq) => {
        User.findById({ _id: userID }).then(() => {
            const order = new Order({ id_user: userID, products: productsReq });
            order.save()
                .then((order) => res.status(201).json(order))
                .catch(() => res.status(404).send("Prodotto o utente non trovato!"))
        })
            .catch(() => res.status(404).send("Prodotto o utente non trovato!"))
    }

    checkData(id_user, products)

}


const getAllOrders = (req, res) => {
    Order.aggregate([
        {
            $lookup:
            {
                from: "users",
                localField: "id_user",
                foreignField: "_id",
                as: "users"
            }      
        },
        {
            $unset: [ "__v","users._id", "users.createdAt", "users.updatedAt", "users.__v" ]
        }
    ]).then(orders => { res.status(200).json(orders.reverse()) })
}

const getOrderDate = (req, res) => {
    const date = req.params.date;
    const start = new Date(date);
    const end = new Date(date + "T23:59:00.000Z")
    Order.find({ createdAt: { $gte: start, $lt: end } })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(404).json("Errore: " + err))

}

const getOrderName = (req, res) => {
    const name = req.params.name;
    const regex = new RegExp(["^", name, "$"].join("").replace('-', ' '), "i");

    Order.find({ "products.name": regex })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(404).json("Name Error: " + err))
}

const getFullFilter = (req, res) => {
    const date = req.params.date;
    const name = req.params.name;
    const start = new Date(date);
    const end = new Date(date + "T23:59:00.000Z")
    const regex = new RegExp(["^", name, "$"].join("").replace('-', ' '), "i");


    Order.find({ createdAt: { $gte: start, $lt: end }, "products.name": regex })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(404).json("Errore: " + err))

}


const updateOrder = (req, res) => {
    const { id } = req.params;
    const data = { ...req.body }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json("Ordine non trovato")

    Order.findByIdAndUpdate(id, data, { new: true })
        .then(order => res.status(200).json(order))
        .catch(err => res.status(404).json("Errore: " + err))
}

const deleteOrder = (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json("Ordine da elimare non trovato!")

    Order.findByIdAndDelete(id)
        .then(() => res.status(200).json("Ordine eliminato con successo"))
        .catch(err => res.status(404).json("Errore: " + err));
}

const getOrder = (req, res) => {
    const { id } = req.params;

    Order.findById(id)
        .then(order => res.status(200).json(order))
        .catch(err => res.status(404).json("Errore: " + err))

}

module.exports = { addOrder, getAllOrders, updateOrder, deleteOrder, getOrder, getOrderDate, getOrderName, getFullFilter }