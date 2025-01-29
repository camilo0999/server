const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRouter = require("./routes/authRouter");
const productsRouter = require("./routes/productsRouter");
const inventoryRouter = require("./routes/inventoryRoutes");
const shoppingRouter = require("./routes/shoppinRouter");
const invoicesRouter = require("./routes/invoicesRouter");
const userRouter = require("./routes/userRouter");



// Configuración de variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

// Inicializar Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor y MongoDB funcionando correctamente");
});

// Rutas
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/shopping", shoppingRouter);
app.use("/api/invoices", invoicesRouter);
app.use("/api/users", userRouter);

// Puerto
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});