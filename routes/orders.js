const express = require('express');
const router = express.Router();
const { addOrder, getAllOrders, updateOrder, deleteOrder, getOrder, getOrderDate, getOrderName, getFullFilter } = require('../controllers/orders');


router.get('/', getAllOrders);
router.get('/date=:date&name=:name', getFullFilter);
router.get('/name=:name', getOrderName)
router.get('/date=:date', getOrderDate);
router.get('/:id', getOrder);

router.post('/', addOrder);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);


module.exports = router;