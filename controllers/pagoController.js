const { createPagoService } = require("../services/pagoService");
const { pagoForCreation } = require("../models/pago");

const createPago = async (req, res) => {
  try {
    // Validar datos con el esquema pagoForCreation
    const { error } = pagoForCreation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Si la validación pasa, crear el pago
    const resultado = await createPagoService(req.body);
    if (resultado.status) {
      return res.status(201).json(resultado);
    }
    return res.status(400).json({ message: resultado.message });
  } catch (error) {
    console.error("Error en el controlador de pago:", error.message);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = { createPago };
