const express = require("express");
const protected = require("../middlewares/AuthMiddleware");

const {
  getCarritoByUser,
  getActiveCarritoByUser,
  createCarrito,
} = require("../controllers/carritoController");

const router = express.Router();

// Obtener todos los carritos del usuario
router.get("/user/:id_usuario", protected, getCarritoByUser);

// Obtener carrito activo del usuario
router.get("/user/:id_usuario/active", protected, getActiveCarritoByUser);

// Crear carrito (solo si no existe uno activo)
router.post("/", createCarrito);

module.exports = router;
