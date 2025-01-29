const mongoose = require("mongoose");
require("dotenv").config(); // Asegúrate de que el archivo .env esté cargado

// Función para conectar a MongoDB
const connectDB = async () => {
  try {
    // URL de conexión a MongoDB Atlas (desde el archivo .env)
    const mongoURI = process.env.MONGO_URI;

    // Conectar a MongoDB Atlas
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,  // Opciones recomendadas para evitar advertencias
      useUnifiedTopology: true,
    });

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error al conectar a MongoDB: ${error.message}`);
    process.exit(1); // Termina el proceso si no se puede conectar
  }
};

module.exports = connectDB;
