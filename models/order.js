const Joi = require("joi");

// Esquema para crear un pedido
const orderForCreation = Joi.object({
  id_usuario: Joi.number().required(),
  total: Joi.number().required(),
  fecha: Joi.date().required(),
  id_pago: Joi.number().optional()
});

// Esquema para actualizar un pedido
const orderForUpdate = Joi.object({
  id_usuario: Joi.number().required(),
  total: Joi.number().required(),
  fecha: Joi.date().required(),
  id_pago: Joi.number().optional()
});

// Esquema para buscar pedidos por usuario
const orderForSearch = Joi.object({
  id_usuario: Joi.number().required()
});

const orderForDelete = Joi.object({
  id_pedido: Joi.number().required()
});

const orderEstadoUpdate = Joi.object({
  estado: Joi.string()
    .valid("pendiente", "procesando", "enviado") 
    .required()
});

module.exports = {
  orderForCreation,
  orderForUpdate,
  orderForSearch,
  orderForDelete,
  orderEstadoUpdate
};
