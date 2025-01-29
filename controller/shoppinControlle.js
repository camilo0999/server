const Shopping = require("../models/Shopping.js");
const productService = require('../service/productsService.js');
const userService = require('../service/userService.js');
const inventoryService = require('../service/inventoryService.js');

const { discountStockForMultipleProducts } = require('../service/productsService.js'); // Asegúrate de ajustar la ruta

const createShopping = async (req, res) => {
    try {
        const user = await userService.getUserById(req.body.user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const products = await Promise.all(req.body.products.map(async (product) => {
            const productData = await productService.getProductById(product.product);
            if (!productData) {
                throw new Error(`Product not found: ${product.product}`);
            }
            return {
                product: productData,
                quantity: product.quantity,
            };
        }));

        // Verificar y descontar el stock de los productos
        const stockResult = await discountStockForMultipleProducts(req.body.products);
        if (stockResult.message === "Not enough stock") {
            return res.status(400).json({ message: "Not enough stock for one or more products." });
        }

        const inventoryResult = await inventoryService.registerExit(req.body.products);
        if (inventoryResult.message === "Error occurred while registering exits") {
            return res.status(500).json({ message: "Error occurred while registering exits" });
        }


        // Crear la compra solo si el usuario es encontrado y hay suficiente stock
        const shopping = await Shopping.create(req.body);
        shopping.products = products;
        shopping.total = stockResult.total;  // Ajusta esto según cómo calcules el total en discountStockForMultipleProducts
        shopping.status = "completado";
        shopping.date = new Date();

        // Guardar la fecha y hora actual como objeto Date
        await shopping.save();

        console.log(inventoryResult.inventoryIds);

        // Vincular la compra con el inventario
        for (const item of inventoryResult.inventoryIds) {
            await inventoryService.linkShoppingInventory(shopping._id, item._id);
        }

        res.status(201).json(shopping);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllShoppings = async (req, res) => {
    try {
        const shopping = await Shopping.find();
        res.status(200).json(shopping);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllShoppingsUser = async (req, res) => {
    try {
        const shopping = await Shopping.find({ user: req.body.user });

        res.status(200).json(shopping);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getShoppingById = async (req, res) => {
    try {
        const shopping = await Shopping.findById(req.params.id);
        res.status(200).json(shopping);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllByStatus = async (req, res) => {
    const statusToFind = req.params.status;
    try {
        const shoppings = await Shopping.find({ status: statusToFind });
        res.status(200).json({
            message: "Shoppings retrieved successfully",
            data: shoppings,
        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving shoppings", error: error.message });
    }
};

const deleteShopping = async (req, res) => {
    try {
        const shopping = await Shopping.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Shopping deleted successfully", shopping });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createShopping,
    getAllShoppings,
    getAllShoppingsUser,
    getShoppingById,
    getAllByStatus,
    deleteShopping
};
