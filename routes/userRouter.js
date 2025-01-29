const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/Middleware.js");
const userController = require("../controller/userController.js");

router.get("/", Middleware.authenticateToken, userController.getAllUsers);
router.post("/", Middleware.authenticateToken, userController.createUser);
router.get("/:id", Middleware.authenticateToken, userController.getUserById);
router.put("/:id", Middleware.authenticateToken, userController.updateUser);
router.delete("/:id", Middleware.authenticateToken, userController.deleteUser);

module.exports = router;