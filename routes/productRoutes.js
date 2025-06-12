// Importamos la librería express para gestionar las rutas y solicitudes HTTP
const express = require("express");

// Importamos el middleware 'protected' que asegura que el usuario esté autenticado antes de acceder a las rutas
const protected = require("../middlewares/AuthMiddleware");

// Importamos los controladores para manejar las solicitudes relacionadas con los productos
const {
  getAllProducts,
  getProductsByCatalog,
  getProductsWithFilters,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

// Creamos una instancia del enrutador de express
const router = express.Router();

// Definimos la ruta GET /all para obtener todos los productos, esta ruta requiere autenticación
router.get("/all", protected, getAllProducts);

// Definimos la ruta GET /catalog/:catalog para obtener productos por catálogo, esta ruta también requiere autenticación
router.get("/catalog/:catalog", protected, getProductsByCatalog);

// Nueva ruta para filtros
router.get("/filter", protected, getProductsWithFilters);

// Definimos la ruta POST / para crear un nuevo producto, también requiere autenticación
router.post("/", protected, createProduct);

// Actualizar producto
router.put("/:id", protected, updateProduct);

// Eliminar producto
router.delete("/:id", protected, deleteProduct);

// Exportamos el enrutador para que pueda ser utilizado en otras partes de la aplicación
module.exports = router;
