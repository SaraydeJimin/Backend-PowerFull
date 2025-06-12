const Joi = require("joi");

// Esquema para crear un pago
const pagoForCreation = Joi.object({
  id_usuario: Joi.number().required(),
  fecha_pago: Joi.date().required(),
  metodo_pago: Joi.string().valid("tarjeta", "nequi", "efectivo").required(),
  nombre_tarjeta: Joi.string().when("metodo_pago", {
    is: "tarjeta",
    then: Joi.required(),
    otherwise: Joi.optional()
  }),
  numero_tarjeta: Joi.string().when("metodo_pago", {
    is: "tarjeta",
    then: Joi.required(),
    otherwise: Joi.optional()
  }),
  fecha_expedicion: Joi.date().iso().when("metodo_pago", {
    is: "tarjeta",
    then: Joi.required(),
    otherwise: Joi.optional()
  }).max('now') // opcional: no permitir fechas futuras
});

module.exports = {
  pagoForCreation
};
