const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const dns = require("dns")
dns.setServers(["1.1.1.1","8.8.8.8"])
const Product = require('./models/Product');
const Order = require('./models/Order');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const users = [
  { name: 'Admin User', email: 'admin@example.com', password: '123', isAdmin: true },
];

const products = [
  { name: 'Airpods Wireless Bluetooth Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', brand: 'Apple', category: 'Electronics', description: 'Bluetooth technology lets you connect it with compatible devices wirelessly', price: 89.99, countInStock: 10 },
  { name: 'iPhone 13 Pro 256GB Memory', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80', brand: 'Apple', category: 'Electronics', description: 'Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity.', price: 599.99, countInStock: 7 },
  { name: 'Cannon EOS 80D DSLR Camera', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80', brand: 'Cannon', category: 'Electronics', description: 'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design', price: 929.99, countInStock: 5 },
  { name: 'Sony Playstation 5', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&q=80', brand: 'Sony', category: 'Electronics', description: 'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music', price: 399.99, countInStock: 11 },
  { name: 'Logitech G-Series Gaming Mouse', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb9c551c?w=600&q=80', brand: 'Logitech', category: 'Electronics', description: 'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse.', price: 49.99, countInStock: 7 },
  { name: 'Amazon Echo Dot 3rd Gen', image: 'https://images.unsplash.com/photo-1589003071595-51228171d1fb?w=600&q=80', brand: 'Amazon', category: 'Electronics', description: 'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space', price: 29.99, countInStock: 0 },
  { name: 'Apple Watch Series 6', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80', brand: 'Apple', category: 'Electronics', description: 'Apple Watch Series 6 lets you measure your blood oxygen level with a revolutionary new sensor and app.', price: 399.99, countInStock: 15 },
  { name: 'Dell XPS 15 Laptop', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80', brand: 'Dell', category: 'Electronics', description: '15.6-inch 4K UHD+ touchscreen display with 10th Gen Intel Core i7 processor.', price: 1499.99, countInStock: 3 },
  { name: 'Mechanical Keyboard (Keychron K2)', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&q=80', brand: 'Keychron', category: 'Electronics', description: 'A 75% layout (84-key) RGB backlight compact Bluetooth mechanical keyboard.', price: 79.99, countInStock: 25 }
];

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.find({});
    // Default to the first user if present, or create a mock ID just for seed purposes
    const adminUser = createdUsers.length > 0 ? createdUsers[0]._id : new mongoose.Types.ObjectId();

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
