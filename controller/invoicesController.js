const { generarFacturaPDF } = require('../service/invoicesService.js');
const Shopping = require('../models/Shopping');
const Product = require('../models/Products.js');
const User = require('../models/User');

/**
 * Controlador para manejar la generación de facturas.
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 */
const obtenerFactura = async (req, res) => {
    try {
        const shoppingId = req.params.id; // Asume que el ID de la compra se pasa como parámetro en la URL
        const shopping = await getShopping(shoppingId);
        const user = await getUser(shopping.user);
        const products = await getProducts(shopping.products.map(p => p.product));

        const facturaData = {
            cliente: user ? `${user.name}` : 'Cliente desconocido',
            fecha: new Date(shopping.date).toLocaleDateString(),
            productos: products.map((product, index) => ({
                nombre: product.name,
                precio: product.price,
                cantidad: shopping.products[index].quantity,
                subtotal: product.price * shopping.products[index].quantity,
            })),
            total: shopping.total,
        };

        console.log(facturaData);

        // Configurar encabezados para descargar el archivo PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=factura.pdf');

        // Generar y enviar la factura
        generarFacturaPDF(facturaData, res);
    } catch (error) {
        res.status(500).json({ message: 'Error al generar la factura', error: error.message });
    }
};

const getShopping = async (id) => {
    try {
        const shopping = await Shopping.findById(id);
        return shopping;
    } catch (error) {
        throw new Error('Error al obtener la compra');
    }
};

const getProducts = async (productIds) => { // Cambio de nombre del parámetro para evitar conflicto
    try {
        const products = await Product.find({ _id: { $in: productIds } });
        return products;
    } catch (error) {
        throw new Error('Error al obtener los productos');
    }
};

const getUser = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw new Error('Error al obtener el usuario');
    }
};

module.exports = { obtenerFactura };
