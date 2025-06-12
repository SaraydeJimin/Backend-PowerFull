const {
  getCarritoByUserService,
  getActiveCarritoByUserService,
  createCarritoService,
} = require("../services/carritoService");

const {
  carritoForCreation,
  carritoForSearch,
} = require("../models/carrito");

// Obtener todos los carritos de un usuario
const getCarritoByUser = async (req, res) => {
  const { id_usuario } = req.params;
  const { error } = carritoForSearch.validate({ id_usuario });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const response = await getCarritoByUserService(id_usuario);
    if (response.length === 0) {
      return res.status(404).json({ message: "No se encontró carrito para este usuario" });
    }
    res.json({ response });
  } catch (err) {
    console.error("Error al obtener los carritos del usuario:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Obtener solo el carrito activo de un usuario
const getActiveCarritoByUser = async (req, res) => {
  const { id_usuario } = req.params;
  const { error } = carritoForSearch.validate({ id_usuario });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const carrito = await getActiveCarritoByUserService(id_usuario);
    if (!carrito) {
      return res.status(404).json({ message: "No hay carrito activo para este usuario" });
    }
    res.json({ carrito });
  } catch (err) {
    console.error("Error al obtener el carrito activo:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Crear un nuevo carrito para el usuario (si no tiene activo)
const createCarrito = async (req, res) => {
  const { error } = carritoForCreation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const response = await createCarritoService(req.body);

    if (!response.status) {
      // Ya existe un carrito activo, devuelvo ese carrito
      return res.status(400).json({
        message: response.message,
        carrito: response.carrito,
      });
    }

    res.status(201).json({ message: response.message });
  } catch (error) {
    console.error("Error en el controlador de carrito:", error.message);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  getCarritoByUser,
  getActiveCarritoByUser,
  createCarrito,
};
