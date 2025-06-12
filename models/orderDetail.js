const Joi = require("joi");


// Esquema corregido para creación
const orderDetailForCreation = Joi.object({
  id_pedido: Joi.number().integer().required(),
  detalles: Joi.array().items(
    Joi.object({
      id_producto: Joi.number().integer().required(),
      cantidad: Joi.number().integer().min(1).required(),
      precio_total: Joi.number().min(0).optional() // Cambiado a optional
    })
  ).min(1).required()
}).options({ abortEarly: false, convert: true }); // Mejora en opciones

// Esquema para actualización (también corregido)
const orderDetailForUpdate = Joi.object({
  id_pedido: Joi.number().integer().required(),
  detalles: Joi.array().items(
    Joi.object({
      id_producto: Joi.number().integer().required(),
      cantidad: Joi.number().integer().min(1).required(),
      precio_total: Joi.number().min(0).optional() // Cambiado a optional
    })
  ).min(1).required()
});


const orderDetailForSearch = Joi.object({
    id_pedido: Joi.number().optional(),  
    id_producto: Joi.number().optional(),  
}).or('id_pedido', 'id_producto');  


const orderDetailForDelete = Joi.object({
    id_pedido: Joi.number().required(),
    id_producto: Joi.number().required(),
    cantidad: Joi.number().optional(),
    precio_total: Joi.number().optional(),
});

module.exports = {
    orderDetailForCreation,
    orderDetailForUpdate,
    orderDetailForSearch,
    orderDetailForDelete
};