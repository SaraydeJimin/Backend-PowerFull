const Joi = require("joi");

// Esquema para crear un solo producto en el carrito
const productCarritoForCreation = Joi.object({
    id_carrito: Joi.number().required(),
    id_producto: Joi.number().required(),
    cantidad: Joi.number().required(),
});

// Esquema para actualizar un producto en el carrito
const productCarritoForUpdate = Joi.object({
    cantidad: Joi.number().integer().positive().required()
});

// Esquema para buscar por ID_CARRITO o ID_PRODUCTO
const productCarritoForSearch = Joi.object({
    id_carrito: Joi.number().optional(),
    id_producto: Joi.number().optional(),
}).or('id_carrito', 'id_producto');

// Esquema para eliminar
const productCarritoForDelete = Joi.object({
    id_carrito: Joi.number().required(),
    id_producto: Joi.number().required(),
    cantidad: Joi.number().optional(),
});

// para agregar múltiples productos
const productCarritoForBulkCreation = Joi.object({
    id_carrito: Joi.number().required(),
    productos: Joi.array().items(
        Joi.object({
            id_producto: Joi.number().required(),
            cantidad: Joi.number().integer().positive().required()
        })
    ).min(1).required()
});

module.exports = {
    productCarritoForCreation,
    productCarritoForUpdate,
    productCarritoForSearch,
    productCarritoForDelete,
    productCarritoForBulkCreation 
};
