const Inventory = require("../models/Inventory");

// Funcion de registro de entradas
const registerEntry = async (idProduct, quantity) => {
    try {
        const inventory = new Inventory({ 
            Products: idProduct,
            type: "entrada",
            quantity: quantity,
            date: Date.now()
         });
        await inventory.save();

        return {
            message: "Entry registered successfully",
        }
    } catch (error) {
        console.log(error);
    }
};

// Funcion de registro de salidas
const registerExit = async (products) => {
    try {
        const inventoryIds = [];
        for (const item of products) {
            const inventory = new Inventory({ 
                Products: item.product,
                type: "salida",
                quantity: item.quantity,
                date: Date.now()
            });
            const savedInventory = await inventory.save();
            inventoryIds.push(savedInventory._id);
        }
        return {
            message: "Exit registered successfully",
            inventoryIds: inventoryIds,
        };
    } catch (error) {
        console.log(error);
        return {
            message: "Error occurred while registering exits",
            error,
        };
    }
};

// Funcion para vincular la compra con el inventario
const linkShoppingInventory = async (shoppingId, inventoryId) => {
    try {
        const inventory = await Inventory.findById(inventoryId);
        if (!inventory) {
            throw new Error('Inventory not found');
        }
        inventory.Shopping = shoppingId;
        await inventory.save();
        return inventory;
    } catch (error) {
        throw error;
    }
}


module.exports = { registerEntry, registerExit, linkShoppingInventory };