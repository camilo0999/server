const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

// Rutas de autenticación
try {
    router.post("/register", authController.register);
    router.post("/login", authController.login);
} catch (error) {
    console.error("Error al registrar las rutas de autenticación:", error.message);
}

// Exportar el enrutador
module.exports = router;
