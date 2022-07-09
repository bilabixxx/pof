const mongoose = require('mongoose');
const Order = require('../models/orders');
const Product = require('../models/products');

const lookupUser = {
    $lookup:
    {
        from: "users",
        localField: "id_user",
        foreignField: "_id",
        as: "user"
    }
};
const lookupProduct = {
    $lookup:
    {
        from: "products",
        localField: "products.id_product",
        foreignField: "_id",
        as: "products"
    }
};
const unset = {
    $unset: ["id_user", "__v", "user.createdAt", "user.updatedAt", "user.__v", "products.createdAt", "products.updatedAt", "products.__v"]
};

const addOrder = async (req, res) => {
    const id_user = req.body.id_user;
    const products = req.body.products;

    const order = new Order({ id_user, products });
    order.save()
        .then((order) => res.status(201).json(order))
        .catch((err) => res.status(404).send("Error: " + err))
}


const getAllOrders = (req, res) => {
    Order.aggregate([
        lookupUser,
        lookupProduct,
        unset
    ])
        .then(orders => { res.status(200).json(orders.reverse()) })
        .catch(() => res.status(404).send("Nessun prodotto trovato!"))
}

const getFilter = (req, res) => {
    const date = req.params.date;
    const name = req.params.name;
    const start = new Date(date);
    const end = new Date(date + "T23:59:00.000Z")
    const regex = new RegExp(["^", name, "$"].join("").replace('-', ' '), "i");

        Product.find({ "name": regex })
        .then(product => {
            Order.aggregate([
                {
                    $match: {
                        $and: [ 
                            {createdAt: { $gte: start, $lt: end }},
                            {"products.id_product" : product[0]._id}
                        ]
                         
                        },
                },
                lookupUser,
                lookupProduct,
                unset
            ])
                .then((filterOrder) =>  res.status(200).json(filterOrder))
                .catch(() => res.status(404).json("Errore: Nessun ordine trovato con il nome del seguente prodotto: " + name))

        })
        .catch(err => res.status(404).json("Name Error: Nessun ordine trovato con la data " + date))

}


const updateOrder = (req, res) => {
    const { id } = req.params;
    const data = { ...req.body }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json("Ordine non trovato")

    Order.findByIdAndUpdate(id, data, { new: true })
        .then(order => res.status(200).json("Ordine aggiornato con successo!"))
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

module.exports = { addOrder, getAllOrders, updateOrder, deleteOrder, getOrder, getFilter }