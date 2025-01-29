const express = require("express");
const router = express.Router();
const inventoryController = require("../controller/inventoryController.js");
const Middleware = require("../middleware/Middleware.js");

router.get("/", Middleware.authenticateToken, inventoryController.getFindAll);
router.get("/output", Middleware.authenticateToken, inventoryController.getFindAllOutput);
router.get("/input", Middleware.authenticateToken, inventoryController.getFindAllInput);
router.get("/product/:id", Middleware.authenticateToken, inventoryController.getFindByIdProduct);
router.get("/:id", Middleware.authenticateToken, inventoryController.getFindById);



module.exports = router;