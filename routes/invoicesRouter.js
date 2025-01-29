const express = require('express');
const { obtenerFactura } = require('../controller/invoicesController');

const router = express.Router();

// Ruta para descargar la factura
router.get('/:id', obtenerFactura);

module.exports = router;
