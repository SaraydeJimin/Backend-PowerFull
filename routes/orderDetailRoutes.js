const express = require("express");
const protected = require("../middlewares/AuthMiddleware");

const {
  getAllorderDetail,
  getorderDetailByOrder,
  getorderDetailByProduct,
  createorderDetail,
  updateorderDetail,
  deleteorderDetail,
  verificarStockController
} = require("../controllers/orderDetailController");

const router = express.Router();

router.get("/all", protected, getAllorderDetail);
router.get("/pedido/:id_pedido", protected, getorderDetailByOrder);
router.get("/product/:id_producto", protected, getorderDetailByProduct);
router.post("/", protected, createorderDetail);
router.put("/:id_pedido", protected, updateorderDetail);
router.delete("/:id_pedido/:id_producto", protected, deleteorderDetail);
router.post('/verificar-stock', verificarStockController);

module.exports = router;
