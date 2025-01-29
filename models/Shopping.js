const mongoose = require("mongoose");
const Products = require("./Products");
const User = require("./User");
const Inventory = require("./Inventory");

const shoppingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    total: {
        type: Number,
        required: false,
    },
    date: {
        type: Date,
        required: false,
    },
    status: {
        type: String,
        enum: ["pendiente", "completado", "cancelado"],
        default: "pendiente",
    },
    inventory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventory",
        required: false,
    },
});

module.exports = mongoose.model("Shopping", shoppingSchema);