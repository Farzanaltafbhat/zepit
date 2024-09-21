const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    const { name, price, description, stock } = req.body;

    const product = new Product({ name, price, description, stock });

    try {
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(400).json({ error: 'Error saving product' });
    }
};
exports.getProduct = async (req, res) => {
    const { id } = req.params;

    console.log('Fetching product with ID:', id); // Log the ID

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(400).json({ error: 'Error fetching product' });
    }
};
