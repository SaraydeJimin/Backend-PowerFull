// Importamos la librería express para gestionar las rutas y solicitudes HTTP
const express = require("express");

// Importamos el middleware 'protected' que verifica si el usuario tiene acceso autorizado
const protected = require("../middlewares/AuthMiddleware");

// Importamos los controladores para manejar las solicitudes de login y registro
const {
  postLog,
  registerUser,
  getAllLogin,
  getLoginById,
  UpdateLogin,
  deleteLogin,
} = require("../controllers/loginController");

// Creamos una instancia del enrutador de express
const router = express.Router();

/**
 * Ruta protegida para obtener todos los usuarios
 * Solo usuarios con token válido pueden acceder
 */
router.get("/all", protected, getAllLogin); // Obtener todos los usuarios (ej. con ID_ROL = 2)

/**
 * Ruta pública para realizar login
 * No requiere autenticación
 */
router.post("/", postLog);

/**
 * Ruta pública para registrar un nuevo usuario
 * No requiere autenticación
 */
router.post("/register", registerUser);

/**
 * Ruta protegida para ver un login por ID de usuario
 * Requiere autenticación
 */
router.get("/:id_usuario", protected,getLoginById);

/**
 * Ruta protegida para actualizar un login por ID de usuario
 * Requiere autenticación
 */
router.put("/:id_usuario", protected, UpdateLogin);

/**
 * Ruta protegida para eliminar un login por ID de usuario
 * Requiere autenticación
 */
router.delete("/:id_usuario", protected, deleteLogin);

// Exportamos el enrutador para que pueda ser utilizado en otras partes de la aplicación
module.exports = router;
