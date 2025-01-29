const express = require("express");
const router = express.Router();
const shoppingController = require("../controller/shoppinControlle.js");
const Middleware = require("../middleware/Middleware.js");

router.post("", Middleware.authenticateToken, shoppingController.createShopping);
router.get("", Middleware.authenticateToken, shoppingController.getAllShoppings);
router.get("/:id", Middleware.authenticateToken, shoppingController.getShoppingById);
router.get("/search/:status", Middleware.authenticateToken, shoppingController.getAllByStatus);
router.get("/user/:id", Middleware.authenticateToken, shoppingController.getAllShoppingsUser);
router.delete("/:id", Middleware.authenticateToken, shoppingController.deleteShopping);



module.exports = router;