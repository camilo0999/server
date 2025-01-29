const Products = require('../models/Products.js');

const getProductById = async (productId) => {
    try {
        const product = await Products.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw error;
    }
};

// Funcion de descontar stock para varios productos
const discountStockForMultipleProducts = async (products) => {
    try {
        let quantity = 0;
        let total = 0;
        for (const item of products) {
            const product = await Products.findById(item.product);

            if (!product) {
                return { message: `Product not found: ${item.product}` };
            }

            if (product.stock < item.quantity) {
                return { message: "Not enough stock" };
            }
            quantity += item.quantity;
            total += item.quantity * product.price;
            const newStock = product.stock - item.quantity;
            product.stock = newStock;
            await product.save();
        }
        return { message: "Stock discounted successfully", quantity, total };
    } catch (error) {
        console.log(error);
        return { message: "Error occurred while discounting stock", error };
    }
};



module.exports = {
    discountStockForMultipleProducts,
    getProductById,
};
