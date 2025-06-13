const connectDB = require("../config/database");

// helper para manejo de conexiones
const withConnection = async (callback) => {
  let connection;
  try {
    connection = await connectDB();
    return await callback(connection);
  } finally {
    if (connection) await connection.end();
  }
};

// obtener todos los detalles de pedido
const getAllorderDetailService = async () => {
  return withConnection(async (connection) => {
    const result = await connection.query(`
      SELECT 
        dp.id_pedido, 
        dp.id_producto, 
        dp.cantidad, 
        dp.precio_total,
        p.fecha,
        u.nombre AS nombre_usuario, 
        u.email AS email_usuario,
        prod.precio AS precio_unitario,
        prod.nombre AS nombre_producto
      FROM detalle_pedido dp
      JOIN pedido p ON dp.id_pedido = p.id_pedido
      JOIN producto prod ON dp.id_producto = prod.id_producto
      JOIN usuario u ON p.id_usuario = u.id_usuario
    `);
    return result.rows;
  });
};

// obtener detalles por id_pedido
const getOrderDetailByOrderService = async (id_pedido) => {
  return withConnection(async (connection) => {
    const result = await connection.query(
      "SELECT id_pedido FROM pedido WHERE id_pedido = $1",
      [id_pedido]
    );

    if (result.rows.length === 0) return [];

    const orderDetails = await connection.query(`
      SELECT 
        dp.id_pedido, 
        dp.id_producto, 
        dp.cantidad, 
        dp.precio_total,
        p.fecha,
        prod.nombre AS nombre_producto,
        prod.precio AS precio_unitario,
        (dp.cantidad * prod.precio) AS subtotal
      FROM detalle_pedido dp
      JOIN pedido p ON dp.id_pedido = p.id_pedido
      JOIN producto prod ON dp.id_producto = prod.id_producto
      WHERE dp.id_pedido = $1
    `, [id_pedido]);

    return orderDetails.rows;
  });
};

// obtener detalles por id_producto
const getOrderDetailByProductService = async (id_producto) => {
  return withConnection(async (connection) => {
    const result = await connection.query(
      "SELECT id_producto FROM producto WHERE id_producto = $1",
      [id_producto]
    );

    if (result.rows.length === 0) return [];

    const orderDetails = await connection.query(`
      SELECT 
        dp.id_pedido, 
        dp.id_producto, 
        dp.cantidad, 
        dp.precio_total,
        p.fecha,
        u.nombre AS nombre_cliente,
        u.email AS email_cliente
      FROM detalle_pedido dp
      JOIN pedido p ON dp.id_pedido = p.id_pedido
      JOIN usuario u ON p.id_usuario = u.id_usuario
      WHERE dp.id_producto = $1
    `, [id_producto]);

    return orderDetails.rows;
  });
};

// crear detalles de pedido
const createOrderDetailService = async (id_pedido, detalles) => {
  return withConnection(async (connection) => {
    const result = await connection.query(
      "SELECT id_pedido FROM pedido WHERE id_pedido = $1", [id_pedido]
    );
    if (result.rows.length === 0) {
      throw new Error(`el pedido con id ${id_pedido} no existe`);
    }

    for (const detalle of detalles) {
      const { id_producto, cantidad, precio_total } = detalle;

      if (id_producto === undefined || cantidad === undefined || precio_total === undefined) {
        throw new Error("algún campo del detalle está undefined");
      }
      if (!Number.isInteger(cantidad) || cantidad <= 0) {
        throw new Error("cantidad debe ser un número entero positivo");
      }
      if (typeof precio_total !== "number" || precio_total < 0) {
        throw new Error("precio total debe ser un número >= 0");
      }

      const producto = await connection.query(
        "SELECT 1 FROM producto WHERE id_producto = $1", [id_producto]
      );
      if (producto.rows.length === 0) {
        throw new Error(`producto con id ${id_producto} no encontrado`);
      }

      const detalleExist = await connection.query(
        "SELECT 1 FROM detalle_pedido WHERE id_pedido = $1 AND id_producto = $2",
        [id_pedido, id_producto]
      );
      if (detalleExist.rows.length > 0) {
        throw new Error(`detalle para pedido ${id_pedido} y producto ${id_producto} ya existe`);
      }

      await connection.query(
        "INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_total) VALUES ($1, $2, $3, $4)",
        [id_pedido, id_producto, cantidad, precio_total]
      );
    }

    return { status: true, message: "detalles registrados exitosamente" };
  });
};

// eliminar detalle de pedido
const deleteOrderDetailService = async (id_pedido, id_producto) => {
  return withConnection(async (connection) => {
    try {
      await connection.query("BEGIN");

      const detail = await connection.query(
        "SELECT cantidad, precio_total FROM detalle_pedido WHERE id_pedido = $1 AND id_producto = $2",
        [id_pedido, id_producto]
      );
      if (detail.rows.length === 0) {
        return { status: false, message: "no se encontró el detalle de pedido" };
      }

      const { cantidad, precio_total } = detail.rows[0];

      const result = await connection.query(
        "DELETE FROM detalle_pedido WHERE id_pedido = $1 AND id_producto = $2",
        [id_pedido, id_producto]
      );

      await connection.query(
        "UPDATE producto SET stock = stock + $1 WHERE id_producto = $2",
        [cantidad, id_producto]
      );

      await connection.query(
        "UPDATE pedido SET total = COALESCE(total, 0) - $1 WHERE id_pedido = $2",
        [precio_total, id_pedido]
      );

      await connection.query("COMMIT");

      return {
        status: result.rowCount === 1,
        message: result.rowCount === 1
          ? "detalle de pedido eliminado exitosamente"
          : "no se encontró el detalle de pedido"
      };
    } catch (error) {
      await connection.query("ROLLBACK");
      console.error("error en deleteOrderDetailService:", error.message);
      return {
        status: false,
        message: "error al eliminar detalle",
        error: error.message
      };
    }
  });
};

// actualizar detalles de pedido
const updateOrderDetailService = async (id_pedido, newDetails) => {
  return withConnection(async (connection) => {
    const result = await connection.query(
      "SELECT id_pedido FROM pedido WHERE id_pedido = $1", [id_pedido]
    );
    if (result.rows.length === 0) {
      throw new Error(`el pedido con id ${id_pedido} no existe`);
    }

    if (!Array.isArray(newDetails)) {
      throw new Error("los nuevos detalles deben ser un array");
    }

    const productosSet = new Set();
    for (const detalle of newDetails) {
      const { id_producto, cantidad, precio_total } = detalle;
      if (id_producto === undefined || cantidad === undefined || precio_total === undefined) {
        throw new Error("algún campo del detalle está undefined");
      }
      if (!Number.isInteger(cantidad) || cantidad <= 0) {
        throw new Error("cantidad debe ser un número entero positivo");
      }
      if (typeof precio_total !== "number" || precio_total < 0) {
        throw new Error("precio total debe ser un número >= 0");
      }
      if (productosSet.has(id_producto)) {
        throw new Error(`producto ${id_producto} repetido en detalles`);
      }
      productosSet.add(id_producto);

      const producto = await connection.query(
        "SELECT 1 FROM producto WHERE id_producto = $1", [id_producto]
      );
      if (producto.rows.length === 0) {
        throw new Error(`producto con id ${id_producto} no encontrado`);
      }
    }

    await connection.query("BEGIN");
    try {
      await connection.query("DELETE FROM detalle_pedido WHERE id_pedido = $1", [id_pedido]);

      for (const detalle of newDetails) {
        await connection.query(
          "INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_total) VALUES ($1, $2, $3, $4)",
          [id_pedido, detalle.id_producto, detalle.cantidad, detalle.precio_total]
        );
      }

      await connection.query("COMMIT");
      return { status: true, message: "detalles de pedido actualizados con éxito" };
    } catch (error) {
      await connection.query("ROLLBACK");
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
