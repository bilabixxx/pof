const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    products: [
        new Schema(
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        },  { _id : false }
    )]
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;