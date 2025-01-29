const Product = require('../models/Products.js');
const inventoryService = require('../service/inventoryService.js');


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        const responseInventory = await inventoryService.registerEntry(product._id, req.body.stock);
        res.status(201).json({
            message: "Product created successfully",
            responseInventory,
            product
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            message: "Product updated successfully",
            product});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
