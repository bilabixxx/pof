const express = require('express');
const router = express.Router();
const { addOrder, getOrders, updateOrder, deleteOrder, getOrder } = require('../controllers/orders');


router.get('/', getOrders);
router.get('/:id', getOrder);
router.post('/', addOrder);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);


module.exports = router;