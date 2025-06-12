const connectDB = require("../config/database");

// Helper para manejo de conexiones
const withConnection = async (callback) => {
  let connection;
  try {
    connection = await connectDB();
    return await callback(connection);
  } finally {
    if (connection) await connection.end();
  }
};

// Obtener todos los detalles de pedido
const getAllorderDetailService = async () => {
  return withConnection(async (connection) => {
    const [orderDetails] = await connection.execute(`
      SELECT 
        dp.ID_PEDIDO, 
        dp.ID_PRODUCTO, 
        dp.CANTIDAD, 
        dp.PRECIO_TOTAL,
        p.FECHA,
        u.NOMBRE AS NOMBRE_USUARIO, 
        u.EMAIL AS EMAIL_USUARIO,
        prod.PRECIO AS PRECIO_UNITARIO,
        prod.NOMBRE AS NOMBRE_PRODUCTO
      FROM detalle_pedido dp
      JOIN pedido p ON dp.ID_PEDIDO = p.ID_PEDIDO
      JOIN producto prod ON dp.ID_PRODUCTO = prod.ID_PRODUCTO
      JOIN usuario u ON p.ID_USUARIO = u.ID_USUARIO
    `);
    return orderDetails;
  });
};

// Obtener detalles por ID_PEDIDO
const getOrderDetailByOrderService = async (id_pedido) => {
  return withConnection(async (connection) => {
    const [orderExist] = await connection.execute(
      "SELECT ID_PEDIDO FROM pedido WHERE ID_PEDIDO = ?",
      [id_pedido]
    );
    
    if (orderExist.length === 0) return [];
    const [orderDetails] = await connection.execute(`
      SELECT 
        dp.ID_PEDIDO, 
        dp.ID_PRODUCTO, 
        dp.CANTIDAD, 
        dp.PRECIO_TOTAL,
        p.FECHA,
        prod.NOMBRE AS NOMBRE_PRODUCTO,
        prod.PRECIO AS PRECIO_UNITARIO,
        (dp.CANTIDAD * prod.PRECIO) AS SUBTOTAL
      FROM detalle_pedido dp
      JOIN pedido p ON dp.ID_PEDIDO = p.ID_PEDIDO
      JOIN producto prod ON dp.ID_PRODUCTO = prod.ID_PRODUCTO
      WHERE dp.ID_PEDIDO = ?
    `, [id_pedido]);
    return orderDetails;
  });
};

// Obtener detalles por ID_PRODUCTO
const getOrderDetailByProductService = async (id_producto) => {
  return withConnection(async (connection) => {
    const [productExist] = await connection.execute(
      "SELECT ID_PRODUCTO FROM producto WHERE ID_PRODUCTO = ?",
      [id_producto]
    );
    
    if (productExist.length === 0) return [];
    const [orderDetails] = await connection.execute(`
      SELECT 
        dp.ID_PEDIDO, 
        dp.ID_PRODUCTO, 
        dp.CANTIDAD, 
        dp.PRECIO_TOTAL,
        p.FECHA,
        u.NOMBRE AS NOMBRE_CLIENTE,
        u.EMAIL AS EMAIL_CLIENTE
      FROM detalle_pedido dp
      JOIN pedido p ON dp.ID_PEDIDO = p.ID_PEDIDO
      JOIN usuario u ON p.ID_USUARIO = u.ID_USUARIO
      WHERE dp.ID_PRODUCTO = ?
    `, [id_producto]);
    return orderDetails;
  });
};

// Crear detalles de pedido
const createOrderDetailService = async (id_pedido, detalles) => {
  return withConnection(async (connection) => {
    // Validar que el pedido exista
    const [pedidoExists] = await connection.execute(
      "SELECT ID_PEDIDO FROM pedido WHERE ID_PEDIDO = ?", [id_pedido]
    );
    if (pedidoExists.length === 0) {
      throw new Error(`El pedido con ID ${id_pedido} no existe`);
    }
    for (const detalle of detalles) {
      const { id_producto, cantidad, precio_total } = detalle;
      // Validaciones básicas de datos
      if (id_producto === undefined || cantidad === undefined || precio_total === undefined) {
        throw new Error("Algún campo del detalle está undefined");
      }
      if (!Number.isInteger(cantidad) || cantidad <= 0) {
        throw new Error("Cantidad debe ser un número entero positivo");
      }
      if (typeof precio_total !== "number" || precio_total < 0) {
        throw new Error("Precio total debe ser un número >= 0");
      }
      // Validar que el producto exista
      const [productoRows] = await connection.execute(
        "SELECT 1 FROM producto WHERE ID_PRODUCTO = ?", [id_producto]
      );
      if (productoRows.length === 0) {
        throw new Error(`Producto con ID ${id_producto} no encontrado`);
      }
      // Validar que no exista ya un detalle con ese pedido y producto
      const [detalleExist] = await connection.execute(
        `SELECT 1 FROM detalle_pedido WHERE ID_PEDIDO = ? AND ID_PRODUCTO = ?`,
        [id_pedido, id_producto]
      );
      if (detalleExist.length > 0) {
        throw new Error(`Detalle para pedido ${id_pedido} y producto ${id_producto} ya existe`);
      }
      // Insertar el detalle
      await connection.execute(
        `INSERT INTO detalle_pedido (ID_PEDIDO, ID_PRODUCTO, CANTIDAD, PRECIO_TOTAL) VALUES (?, ?, ?, ?)`,
        [id_pedido, id_producto, cantidad, precio_total]
      );
    }
    return { status: true, message: "Detalles registrados exitosamente" };
  });
};

// Eliminar detalle de pedido
const deleteOrderDetailService = async (id_pedido, id_producto) => {
  return withConnection(async (connection) => {
    try {
      await connection.beginTransaction();
      // 1. Obtener cantidad y precio_total del detalle
      const [detailRows] = await connection.execute(
        `SELECT CANTIDAD, PRECIO_TOTAL FROM detalle_pedido 
         WHERE ID_PEDIDO = ? AND ID_PRODUCTO = ?`,
        [id_pedido, id_producto]
      );
      if (detailRows.length === 0) {
        return { 
          status: false, 
          message: "No se encontró el detalle de pedido" 
        };
      }
      const { CANTIDAD, PRECIO_TOTAL } = detailRows[0];
      // 2. Eliminar el detalle
      const [result] = await connection.execute(
        `DELETE FROM detalle_pedido 
         WHERE ID_PEDIDO = ? AND ID_PRODUCTO = ?`,
        [id_pedido, id_producto]
      );
      // 3. Restablecer stock
      await connection.execute(
        `UPDATE producto SET STOCK = STOCK + ? 
         WHERE ID_PRODUCTO = ?`,
        [CANTIDAD, id_producto]
      );
      // 4. Actualizar el total del pedido
      await connection.execute(
        `UPDATE pedido SET TOTAL = IFNULL(TOTAL, 0) - ? 
         WHERE ID_PEDIDO = ?`,
        [PRECIO_TOTAL, id_pedido]
      );
      await connection.commit();
      return {
        status: result.affectedRows === 1,
        message: result.affectedRows === 1 
          ? "Detalle de pedido eliminado exitosamente" 
          : "No se encontró el detalle de pedido"
      };
    } catch (error) {
      await connection.rollback();
      console.error("Error en deleteOrderDetailService:", error.message);
      return { 
        status: false, 
        message: "Error al eliminar detalle",
        error: error.message 
      };
    }
  });
};

// Actualizar detalles de pedido
const updateOrderDetailService = async (id_pedido, newDetails) => {
  return withConnection(async (connection) => {
    // Validar que el pedido exista
    const [pedidoExists] = await connection.execute(
      "SELECT ID_PEDIDO FROM pedido WHERE ID_PEDIDO = ?", [id_pedido]
    );
    if (pedidoExists.length === 0) {
      throw new Error(`El pedido con ID ${id_pedido} no existe`);
    }
    // Validar newDetails como array
    if (!Array.isArray(newDetails)) {
      throw new Error('Los nuevos detalles deben ser un array');
    }
    // Opcional: validar que no haya productos repetidos en newDetails
    const productosSet = new Set();
    for (const detalle of newDetails) {
      const { id_producto, cantidad, precio_total } = detalle;
      if (id_producto === undefined || cantidad === undefined || precio_total === undefined) {
        throw new Error("Algún campo del detalle está undefined");
      }
      if (!Number.isInteger(cantidad) || cantidad <= 0) {
        throw new Error("Cantidad debe ser un número entero positivo");
      }
      if (typeof precio_total !== "number" || precio_total < 0) {
        throw new Error("Precio total debe ser un número >= 0");
      }
      if (productosSet.has(id_producto)) {
        throw new Error(`Producto ${id_producto} repetido en detalles`);
      }
      productosSet.add(id_producto);
      // Validar que producto exista
      const [productoRows] = await connection.execute(
        "SELECT 1 FROM producto WHERE ID_PRODUCTO = ?", [id_producto]
      );
      if (productoRows.length === 0) {
        throw new Error(`Producto con ID ${id_producto} no encontrado`);
      }
    }
    // Empezar transacción para update
    await connection.beginTransaction();
    try {
      // 1. Eliminar todos los detalles antiguos del pedido
      await connection.execute("DELETE FROM detalle_pedido WHERE ID_PEDIDO = ?", [id_pedido]);
      // 2. Insertar nuevos detalles
      for (const detalle of newDetails) {
        await connection.execute(
          `INSERT INTO detalle_pedido (ID_PEDIDO, ID_PRODUCTO, CANTIDAD, PRECIO_TOTAL) VALUES (?, ?, ?, ?)`,
          [id_pedido, detalle.id_producto, detalle.cantidad, detalle.precio_total]
        );
      }
      await connection.commit();
      return { status: true, message: "Detalles de pedido actualizados con éxito" };
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  });
};

module.exports = {
  getAllorderDetailService,
  getOrderDetailByOrderService,
  getOrderDetailByProductService,
  createOrderDetailService,
  deleteOrderDetailService,
  updateOrderDetailService,
};