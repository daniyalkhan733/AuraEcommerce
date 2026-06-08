const Product = require('../models/product.model');

const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      const products = [
        {
          name: 'Classic Leather Wallet',
          price: 1999,
          category: 'Accessories',
          description: 'A timeless leather wallet with a sleek design, multiple card slots, and a spacious bill compartment. Crafted from high-quality genuine leather for durability and a sophisticated look.',
          image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800'
        },
        {
          name: 'Minimalist Wristwatch',
          price: 9499,
          category: 'Watches',
          description: 'A stylish and elegant wristwatch with a minimalist design. Features a stainless steel case, a comfortable leather strap, and precise quartz movement for accurate timekeeping.',
          image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800'
        },
        {
          name: 'Canvas Backpack',
          price: 3899,
          category: 'Bags',
          description: 'A durable and spacious canvas backpack perfect for daily use or travel. It has multiple compartments, a padded laptop sleeve, and adjustable shoulder straps for comfort.',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
        },
        {
          name: 'Premium Wireless Headphones',
          price: 18999,
          category: 'Electronics',
          description: 'Immerse yourself in high-quality audio with these wireless Bluetooth headphones. They offer noise-cancellation, a long-lasting battery, and a comfortable over-ear design.',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'
        },
     
     
      
        {
          name: 'Smart Home Hub v2',
          price: 12499,
          category: 'Home Automation',
          description: 'Control your smart home devices with ease using this central smart home hub. It\'s compatible with a wide range of devices and supports voice commands.',
          image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800'
        }
      ];
      await Product.insertMany(products);
      console.log('Sample products have been added.');
    }
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

exports.getProducts = async (req, res) => {
  await Product.deleteMany({});
  await seedProducts();
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
