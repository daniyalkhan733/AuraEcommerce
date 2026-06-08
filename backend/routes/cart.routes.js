const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.delete('/:id', cartController.removeFromCart);
router.put('/:id', cartController.updateCartItem);


module.exports = router;
