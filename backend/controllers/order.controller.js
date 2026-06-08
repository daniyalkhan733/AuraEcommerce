const Order = require('../models/order.model');
const Cart = require('../models/cart.model');

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  const { customerName, address, mobile } = req.body;

  try {
    const cart = await Cart.findOne().populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const order = new Order({
      customerName,
      address,
      mobile,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      total
    });

    await order.save();

    // Clear the cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
