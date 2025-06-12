const express = require("express");
const protected = require("../middlewares/AuthMiddleware");
const { createPago } = require("../controllers/pagoController");

const router = express.Router();
router.post("/", protected, createPago);

module.exports = router;