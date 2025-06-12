const express = require("express");
const protected = require("../middlewares/AuthMiddleware");

const {
  getAllCatalog,
  getCatalogByName,
  createCatalog,
  updateCatalog,
  deleteCatalog
} = require("../controllers/catalogController");

const router = express.Router();

// Rutas que pueden ser accesibles por cualquier usuario autenticado (clientes incluidos)
router.get("/all", protected, getAllCatalog);  // Obtener todos los productos del catálogo
router.get("/search/:nombre", protected, getCatalogByName);  // Buscar productos por nombre
router.post("/", protected, createCatalog);  
router.put("/catalog/:id", protected, updateCatalog);  
router.delete("/:id", protected, deleteCatalog);  

module.exports = router;
