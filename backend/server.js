const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:4200', 'https://auraecommerce.vercel.app', 'https://auraecommerce.netlify.app'], // Add your live frontend URLs here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://daniyal733khan_db_user:ICo9I9WUnDJ8jo9X@cluster0.dc0fyen.mongodb.net/?appName=Cluster0';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

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
