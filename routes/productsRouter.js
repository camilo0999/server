const express = require("express");
const router = express.Router();
const productsController = require("../controller/productsController.js");
const Middleware = require("../middleware/Middleware.js");

router.get("/",productsController.getAllProducts);
router.get("/:id",Middleware.authenticateToken, productsController.getProductById);
router.post("/", Middleware.authenticateToken, productsController.createProduct);
router.put("/:id",Middleware.authenticateToken, productsController.updateProduct);
router.delete("/:id",Middleware.authenticateToken, productsController.deleteProduct);

module.exports = router;
