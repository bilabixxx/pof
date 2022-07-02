const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, updateProduct, deleteProduct, getProduct } = require('../controllers/products')

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/', addProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;