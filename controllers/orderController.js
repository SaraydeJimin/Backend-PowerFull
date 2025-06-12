const {
  getAllOrderService, 
  getOrderByUserService, 
  createOrderService,
  updateOrderService,
  deleteOrderService,
  updateEstadoOrderService
} = require("../services/orderService");

const {
  orderForCreation, 
  orderForUpdate, 
  orderForSearch, 
  orderForDelete,
  orderEstadoUpdate
} = require("../models/order");

const getAllOrder = async (req, res) => {
  const { id_usuario, nombre, email, estado } = req.query;

  // Validación opcional del parámetro id_usuario (si se envía)
  if (id_usuario && isNaN(id_usuario)) {
    return res.status(400).json({ error: "El ID de usuario debe ser un número" });
  }
  try {
    const filters = {
      id_usuario: id_usuario ? Number(id_usuario) : null,
      nombre: nombre || null,
      email: email || null,
      estado: estado || null
    };
    const response = await getAllOrderService(filters);
    res.json({ response });
  } catch (error) {
    console.error("Error trying to get the order:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getOrderByUser = async (req, res) => {
  const { error } = orderForSearch.validate({
    id_usuario: req.params.user,
  });
  if (error) {
    return res.status(400).json({ error: "Parametros invalidos" });
  }
  try {
    const response = await getOrderByUserService(req.params.user);
    res.json({ response });
  } catch (err) {
    console.error("Error trying to get order:", err);
    res.status(500).json({ error: err.message });
  }
};

const createOrder = async (req, res) => {
  const { error, value } = orderForCreation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { id_usuario, id_pago } = value; // <-- AQUÍ el fix

  const orderToCreate = {
    id_usuario,
    total: 0,
    fecha: new Date(),
    estado: 'pendiente',
    id_pago: id_pago || null // <-- Ahora sí está definido
  };

  try {
    const response = await createOrderService(orderToCreate);
    if (!response.status) {
      return res.status(400).json({ error: response.message });
    }
    return res.status(201).json({
      message: "Pedido registrado exitosamente",
      id_pedido: response.id_pedido
    });
  } catch (err) {
    console.error("Error en el controlador de pedido:", err.message);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

const updateOrder = async (req, res) => {
  const { error } = orderForUpdate.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const id_pedido = req.params.id;

  if (isNaN(id_pedido)) {
    return res.status(400).json({ error: "ID de pedido inválido" });
  }

  try {
    const response = await updateOrderService(id_pedido, req.body);
    res
      .status(200)
      .json({ message: "Order updated successfully", response });
  } catch (error) {
    console.error("Error en el controlador de pedido:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const { error } = orderForDelete.validate({ id_pedido: req.params.id });
  if (error) {
    return res.status(400).json({ error: error });
  }
  try {
    const response = await deleteOrderService(req.params.id);
    res.status(200).json({ message: "Order deleted successfully", response });
  } catch (error) {
    console.error("Error en el controlador de pedido:", error.message);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

const updateOrderEstado = async (req, res) => {
  const id_pedido = req.params.id;

  // Validación del ID
  if (isNaN(id_pedido)) {
    return res.status(400).json({ error: "ID de pedido inválido" });
  }

  // Validación del estado enviado
  const { error } = orderEstadoUpdate.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const response = await updateEstadoOrderService(id_pedido, req.body.estado);
    res.status(200).json({ message: "Estado del pedido actualizado correctamente", response });
  } catch (error) {
    console.error("Error al actualizar estado del pedido:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = { getAllOrder, getOrderByUser, createOrder, updateOrder, deleteOrder, updateOrderEstado };
