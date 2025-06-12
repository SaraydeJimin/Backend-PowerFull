const {
  getAllorderDetailService,
  getOrderDetailByOrderService,
  getOrderDetailByProductService,
  createOrderDetailService,
  deleteOrderDetailService,
  updateOrderDetailService,
} = require("../services/orderDetailService");

const {updateTotalPedidoService} = require("../services/orderService");
const {updateProductStockService, verificarStockService} = require("../services/productService");

const {
  orderDetailForCreation,
  orderDetailForUpdate,
  orderDetailForSearch,
  orderDetailForDelete
} = require("../models/orderDetail");

// Obtener todos los detalles de pedido
const getAllorderDetail = async (req, res) => {
  try {
    const response = await getAllorderDetailService();
    res.json({ response });
  } catch (error) {
    console.error("Error trying to get the order Detail:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Obtener detalles de pedido por ID de pedido
const getorderDetailByOrder = async (req, res) => {
  const { id_pedido } = req.params;
  const { error } = orderDetailForSearch.validate({ id_pedido });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const response = await  getOrderDetailByOrderService(id_pedido);
    return res.status(200).json({ response });
  } catch (err) {
    console.error("Error al obtener los detalles de pedido:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Obtener detalles de pedido por ID de producto
const getorderDetailByProduct = async (req, res) => {
  const { id_producto } = req.params;
  const { error } = orderDetailForSearch.validate({ id_producto });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const response = await getOrderDetailByProductService(id_producto);
    if (response.length === 0) {
      return res.status(404).json({ message: "No se encontraron detalles de pedido para este producto" });
    }
    res.json({ response });
  } catch (err) {
    console.error("Error al obtener los detalles de pedido por producto:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Crear detalle de pedido y actualizar stock
const createorderDetail = async (req, res) => {
  try {
    const { error, value } = orderDetailForCreation.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "Datos inválidos",
        errors: error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    const { id_pedido, detalles } = value;

    if (!Array.isArray(detalles) || detalles.length === 0) {
      return res.status(400).json({
        message: "Debes enviar al menos un detalle de producto",
      });
    }
    await verificarStockService(detalles);
    // Crear detalles de pedido
    const response = await createOrderDetailService(id_pedido, detalles);
    if (!response.status) {
      return res.status(400).json({
        status: false,
        message: response.message,
      });
    }
    // Actualizar stock
    for (const item of detalles) {
      await updateProductStockService(item.id_producto, item.cantidad);
    }

    // Actualizar total
    const totalActualizado = await updateTotalPedidoService(id_pedido);

    return res.status(201).json({
      status: true,
      message: "Detalle del pedido creado correctamente",
      total: totalActualizado,
    });
  } catch (error) {
    console.error("Error creando detalle del pedido:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

// Actualizar detalle de pedido
const updateorderDetail = async (req, res) => {
  const { id_pedido } = req.params;
  const { detalles } = req.body;
  const payload = { id_pedido, detalles };

  const { error } = orderDetailForUpdate.validate(payload);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const response = await updateOrderDetailService(id_pedido, detalles);
    res.status(200).json(response);
  } catch (err) {
    console.error("Error en controlador updateorderDetail:", err.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar detalle de pedido
const deleteorderDetail = async (req, res) => {
  const { id_pedido, id_producto } = req.params;
  const { error } = orderDetailForDelete.validate({ id_pedido, id_producto });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const response = await deleteOrderDetailService(id_pedido, id_producto);
    res.status(201).json({ message: "orderDetail deleted succesfully", response });
  } catch (error) {
    console.error("Error en el controlador de detalle de pedido:", error.message);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

const verificarStockController = async (req, res) => {
  try {
    const detalles = req.body.detalles;
    console.log('Detalles recibidos:', detalles, 'Es array:', Array.isArray(detalles));

    if (!Array.isArray(detalles)) {
      return res.status(400).json({ message: 'El campo detalles debe ser un arreglo' });
    }

    await verificarStockService(detalles);

    return res.status(200).json({
      status: true,
      message: 'Stock suficiente para todos los productos',
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllorderDetail,
  getorderDetailByOrder,
  getorderDetailByProduct,
  createorderDetail,
  updateorderDetail,
  deleteorderDetail,
  verificarStockController
};
