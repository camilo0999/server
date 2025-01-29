const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Función para registrar usuarios
const register = async (req, res) => {
    const { name, email, password, address, phone } = req.body;

    // Validar campos requeridos
    if (!name || !email || !password || !address || !phone) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email is already registered" });
        }

        // Hash de la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear un nuevo usuario
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "user",
            address,
            phone,
        });

        const user = await newUser.save();
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
                phone: user.phone,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// Función para iniciar sesión
const login = async (req, res) => {
    const { email, password } = req.body;

    // Validar campos requeridos
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // Buscar al usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generar un token JWT
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Expira en 1 hora
        });

        const currentDate = new Date();
        const expirationDate = new Date(currentDate.getTime() + 3600000); // 1 hora después

        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        };

        res.status(200).json({
            message: "Login successful",
            token: token,
            currentDate: formatDate(currentDate), // Fecha actual en formato dd/mm/yyyy hh:mm:ss
            expirationDate: formatDate(expirationDate), // Fecha de expiración en formato dd/mm/yyyy hh:mm:ss
            status: "success",
        });

    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};


module.exports = { register, login };
