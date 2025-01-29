const Inventory = require("../models/Inventory");


// Funcion para obtener la lista de inventario
const getFindAll = async (req, res) => {

    try {
        const inventory = await Inventory.find();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
};

//Funcion para obtener un registro de inventario por id
const getFindById = async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id);
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Funcion para listar invenarios de tipo salida
const getFindAllOutput = async (req, res) => {
    try {
        const inventory = await Inventory.find({ type: "salida" });
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Funcion para listar invenarios de tipo entrada
const getFindAllInput = async (req, res) => {
    try {
        const inventory = await Inventory.find({ type: "entrada" });
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Funcion para listar por Id de producto
const getFindByIdProduct = async (req, res) => {
    try {
        const inventory = await Inventory.find({ Products: req.params.id });
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { getFindAll, getFindById, getFindAllOutput, getFindAllInput, getFindByIdProduct};

