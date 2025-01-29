const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Usa tu clave secreta desde las variables de entorno
        req.user = verified; // Adjunta los datos del token al objeto `req`.
        next(); // Pasa al siguiente middleware o controlador.
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token." });
    }
};

module.exports = {
    authenticateToken,
};
