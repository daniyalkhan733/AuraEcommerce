const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Simplest way to allow all origins temporarily for showcase
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://daniyal733khan_db_user:ICo9I9WUnDJ8jo9X@cluster0.dc0fyen.mongodb.net/aura-ecommerce?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully to:', mongoURI.split('@')[1]))
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');

app.get('/', (req, res) => {
  res.send('Aura E-commerce Backend');
});

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
