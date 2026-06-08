const Cart = require('../models/cart.model');

// For simplicity, we'll work with a single cart.
// In a real multi-user app, you'd associate carts with users.
const getOrCreateCart = async () => {
  let cart = await Cart.findOne().populate('items.product');
  if (!cart) {
    cart = new Cart({ items: [] });
    await cart.save();
  } else {
    // Cleanup items where the product no longer exists (orphaned references)
    const originalLength = cart.items.length;
    cart.items = cart.items.filter(item => item.product !== null);
    if (cart.items.length !== originalLength) {
      await cart.save();
    }
  }
  return cart;
};

exports.getCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const cart = await getOrCreateCart();
    const existingItem = cart.items.find(item => item.product._id.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate('items.product');
    res.status(201).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart();
    cart.items = cart.items.filter(item => item._id.toString() !== req.params.id);
    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
    const { quantity } = req.body;
    try {
        const cart = await getOrCreateCart();
        const itemToUpdate = cart.items.find(item => item._id.toString() === req.params.id);

        if (itemToUpdate) {
            itemToUpdate.quantity = quantity;
            if (itemToUpdate.quantity <= 0) {
                cart.items = cart.items.filter(item => item._id.toString() !== req.params.id);
            }
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        await cart.save();
        const populatedCart = await Cart.findById(cart._id).populate('items.product');
        res.json(populatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
