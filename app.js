// Cargar variables de entorno desde un archivo .env
require("dotenv").config();

// Importar dependencias necesarias
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/database");
const productRoutes = require("./routes/productRoutes");
const loginRoutes = require("./routes/loginRoutes");
const orderRoutes = require("./routes/orderRoutes");
const carritoRoutes = require("./routes/carritoRoutes");
const productCarritoRoutes = require("./routes/productCarritoRoutes");
const catalogRoutes = require("./routes/catalogRoutes");
const orderDetailRoutes = require("./routes/orderDetailRoutes");
const pagoRoutes = require("./routes/pagoRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');


// Crear una instancia de la aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB()
  .then(() => console.log("Conexión exitosa a la base de datos"))
  .catch((error) => {
    console.error("Error al conectar con la base de datos:", error.message);
    process.exit(1);
  });

const corsOptions = {
  origin: ['https://frontend-final-1-elw1.onrender.com'], // tu frontend en Render
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/', 
}));

// Rutas principales
app.use("/products", productRoutes);
app.use("/login", loginRoutes);
app.use("/order", orderRoutes);
app.use("/carrito", carritoRoutes);
app.use("/productCarrito", productCarritoRoutes);
app.use("/catalog", catalogRoutes);
app.use("/orderDetail", orderDetailRoutes);
app.use("/pago", pagoRoutes);

// Ruta simple para verificar el estado del servidor
app.get("/isAlive", (req, res) => {
  res.send(`Servidor corriendo en la dirección http://localhost:${port}`);
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware de errores
app.use((err, req, res, next) => {
  console.error("Error en el servidor:", err.message || err);
  res.status(err.status || 500).json({
    error: err.message || "Error interno del servidor",
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

