const PDFDocument = require('pdfkit');

/**
 * Genera un PDF de factura y lo devuelve como un stream.
 * @param {Object} facturaData - Datos para generar la factura.
 * @param {Object} stream - Stream donde se escribirá el PDF (e.g., res en Express).
 */
const generarFacturaPDF = (facturaData, stream) => {
    const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
    });

    doc.pipe(stream);

    doc.font('Helvetica');

    // Encabezado
    doc
        .fontSize(26)
        .fillColor('#0073e6')
        .text('FACTURA DE COMPRA', { align: 'center', underline: true })
        .moveDown(1.5);

    // Información del cliente
    doc
        .fontSize(14)
        .fillColor('#000')
        .text(`Cliente: ${facturaData.cliente}`)
        .text(`Fecha: ${facturaData.fecha}`)
        .moveDown(1);

    // Línea separadora
    doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke('#cccccc')
        .moveDown(1);

    // Configuración de tabla de productos
    const tableTop = doc.y + 5;
    const columnWidths = { item: 180, quantity: 80, price: 100, subtotal: 100 };
    const startX = 50;

    // Encabezados de la tabla
    doc
        .rect(startX, tableTop - 5, 500, 22)
        .fill('#f0f0f0');

    doc
        .fontSize(12)
        .fillColor('#333333')
        .font('Helvetica-Bold')
        .text('Producto', startX + 5, tableTop)
        .text('Cantidad', startX + columnWidths.item + 5, tableTop)
        .text('V. Unitario', startX + columnWidths.item + columnWidths.quantity + 5, tableTop)
        .text('Subtotal', startX + columnWidths.item + columnWidths.quantity + columnWidths.price + 5, tableTop);

    doc
        .moveTo(startX, tableTop + 18)
        .lineTo(550, tableTop + 18)
        .stroke('#cccccc');

    let y = tableTop + 25;

    // Agregar productos a la tabla
    doc.font('Helvetica');
    facturaData.productos.forEach((producto, index) => {
        if (y + 25 > doc.page.height - 100) {
            doc.addPage();
            y = 50;
        }

        const isEvenRow = index % 2 === 0;
        const fillColor = isEvenRow ? '#f9f9f9' : '#ffffff';

        doc.rect(startX, y - 5, 500, 22).fill(fillColor);

        doc
            .fontSize(11)
            .fillColor('#000')
            .text(producto.nombre, startX + 5, y)
            .text(producto.cantidad.toString(), startX + columnWidths.item + 5, y)
            .text(`$${producto.precio.toFixed(2)}`, startX + columnWidths.item + columnWidths.quantity + 5, y)
            .text(`$${producto.subtotal.toFixed(2)}`, startX + columnWidths.item + columnWidths.quantity + columnWidths.price + 5, y);

        y += 22;
    });

    // Espacio reservado antes del footer
    if (y + 40 > doc.page.height - 100) {
        doc.addPage();
        y = 50;
    }

    // Línea separadora antes del total
    doc
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke('#cccccc')
        .moveDown(1);

    // Total
    doc
        .fontSize(14)
        .fillColor('#FF0000')
        .font('Helvetica-Bold')
        .text(`TOTAL: $${facturaData.total.toFixed(2)}`, { align: 'right' });

    // Footer bien posicionado
    const footerY = doc.page.height - 50;
    doc
        .fontSize(11)
        .fillColor('#aaaaaa')
        .font('Helvetica')
        .text('Gracias por su compra', 50, footerY, { align: 'center' });

    doc.end();
};

module.exports = { generarFacturaPDF };
