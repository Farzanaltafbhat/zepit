const Order = require('../models/Order');
const Product = require('../models/Product');
exports.createOrder = async (req, res) => {
    const { userId, products, totalPrice } = req.body;

    try {
        // Validate that each product in the order exists
        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(400).json({ error: `Product with id ${item.productId} not found` });
            }
        }

        // If all products are valid, create the order
        const order = new Order({
            userId,
            products,
            totalPrice
        });

        // Save the order
        const savedOrder = await order.save();
        return res.status(201).json(savedOrder); // Return the saved order
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error saving order' });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('products.productId');
        console.log('Fetched order:', order); // Debug log

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error fetching order' });
    }
};


exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('products.productId');
        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error fetching orders' });
    }
};
