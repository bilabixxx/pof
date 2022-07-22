const mongoose = require('mongoose');
const Order = require('../models/orders');
const Product = require('../models/products');

const statusAdded = 201;
const statusError = 404;

const createdMessage = "Ordine creato con successo!"
const updatedMessage = "Ordine aggiornato con successo!"
const deletedMessage = "Ordine eliminato con successo!"
const error = {
    message: "Ordine non trovato!"
}

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
    const newOrder = new Order({ id_user, products });

    try {
        await newOrder.save()
        return res.success({ statusAdded, message: createdMessage });
    } catch (e) {
        return res.fail({
            error: {
                message: "Non è stato rispettato correttamente lo schema!"
            }
        })
    }
}

const getOrder = async (req, res) => {
    const id = req.params.id;


    try {
        await Order.findById(id, { __v: 0, updatedAt: 0 });
        try {
            const objId = mongoose.Types.ObjectId(id);
            const order = await Order.aggregate([
                {
                    $match: { _id: objId },
                },
                lookupUser,
                lookupProduct,
                unset
            ])
            return res.success({ data: order })
        } catch (e) {
            return res.fail({ status: statusError, error });
        }
    } catch (e) {
        return res.fail({ status: statusError, error });
    }
}

const updateOrder = async (req, res) => {
    const id = req.params.id;
    const data = { ...req.body }

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.fail({ status: statusError, error });
        await Order.findByIdAndUpdate(id, data, { new: true });
        return res.success({ statusAdded, message: updatedMessage })
    } catch (e) {
        return res.fail({ status: statusError, error })
    }
}

const deleteOrder = async (req, res) => {
    const id = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.fail({ status: statusError, error });
        await Order.findByIdAndDelete(id);
        return res.success({ message: deletedMessage })
    } catch (e) {
        return res.fail({ status: statusError, error })
    }
}

const getOrders = async (req, res) => {

    const date = req.query.date;
    const name = req.query.name;
    const start = new Date(date + "T00:00:00.000Z");
    const end = new Date(date + "T23:59:00.000Z")
    const regex = new RegExp(["^", name, "$"].join("").replace('-', ' '), "i");

    if (!req.query.date && !req.query.name) {
        try {
            const order = await Order.aggregate([
                lookupUser,
                lookupProduct,
                unset
            ])
            return res.success({ data: order })
        } catch (e) {
            return res.fail({ status: statusError, error })
        }
    } else {

        try {
            const products = await Product.find({ "name": regex });

            try {
                const filterOrder = await Order.aggregate([
                    {
                        $match: {
                            $and: [
                                { createdAt: { $gte: start, $lt: end } },
                                { "products.id_product": products[0]._id }
                            ]

                        },
                    },
                    lookupUser,
                    lookupProduct,
                    unset
                ]);

                if (filterOrder.length == 0) {
                    return res.fail({
                        status: statusError, error: {
                            message: "Nessun ordine trovato con il nome prodotto " + name + " o in data " + date
                        }
                    })
                } else {
                    return res.success({ data: filterOrder })
                }
            } catch (e) {
                return res.fail({
                    status: statusError, error: {
                        message: "Nessun ordine trovato con il nome prodotto " + name + " o in data " + date
                    }
                })
            }
        } catch (e) {
            return res.fail({
                status: statusError, error: {
                    message: "Nessun ordine trovato con il nome prodotto " + name + " o in data " + date
                }
            })
        }
    }

}

module.exports = { addOrder, updateOrder, deleteOrder, getOrder, getOrders }