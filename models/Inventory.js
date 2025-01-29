const mongoose = require("mongoose");
const Shopping = require("./Shopping");

const EnunS = {
    ENTRADA: 'entrada',
    SALIDA: 'salida'
};

const inventorySchema = new mongoose.Schema({
    Shopping: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shopping",
        required: false,
    },
    Products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: [EnunS.ENTRADA, EnunS.SALIDA],
    },
    quantity: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Inventory", inventorySchema);