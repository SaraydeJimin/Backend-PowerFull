const express = require("express");
const protected = require("../middlewares/AuthMiddleware");

const {
    getAllproductCarrito, 
    getproductCarritoByCarrito, 
    getproductCarritoByProduct, 
    createproductCarrito,
    updateproductCarrito,
    deleteproductCarrito
} = require("../controllers/productCarritoController");
const router = express.Router();
router.get("/all", protected, getAllproductCarrito);
router.get("/carrito/:id_carrito", protected, getproductCarritoByCarrito);
router.get("/product/:id_producto", protected, getproductCarritoByProduct);
router.post("/", protected, createproductCarrito);
router.put("/:id_carrito/:id_producto", protected, updateproductCarrito);
router.delete("/:id_carrito/:id_producto", protected, deleteproductCarrito);

module.exports = router;
