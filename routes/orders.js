const express = require('express');
const router = express.Router();
const { addOrder, getAllOrders, updateOrder, deleteOrder, getOrder, getFilter } = require('../controllers/orders');


router.get('/', getAllOrders);
router.get('/date=:date&name=:name', getFilter);
router.get('/:id', getOrder);

router.post('/', addOrder);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);


module.exports = router;