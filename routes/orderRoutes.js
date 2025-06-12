const express = require("express");
const protected = require("../middlewares/AuthMiddleware");

const {
  getAllOrder,
  getOrderByUser,
  createOrder,
  updateOrder,
  deleteOrder,
  updateOrderEstado
} = require("../controllers/orderController");

const router = express.Router();

// Puedes filtrar con query params: id_usuario, nombre, email
router.get("/all", protected, getAllOrder);
router.get("/user/:user", protected, getOrderByUser);
router.post("/", protected, createOrder);
router.put("/:id", protected, updateOrder);
router.put("/estado/:id", protected, updateOrderEstado);
router.delete("/:id", protected, deleteOrder);

module.exports = router;
