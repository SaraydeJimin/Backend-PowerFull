const connectDB = require("../config/database");

// Ver todos los pedidos
const getAllOrderService = async ({ id_usuario = null, nombre = null, email = null, estado = null }) => {
  try {
    const connection = await connectDB();
    let query = `
      SELECT p.id_pedido, p.id_usuario, p.total, p.fecha, p.estado, u.nombre, u.email 
      FROM pedido p 
      JOIN usuario u ON p.id_usuario = u.id_usuario`;
    
    const conditions = [];
    const params = [];

    if (id_usuario) {
      conditions.push(`p.id_usuario = $${params.length + 1}`);
      params.push(id_usuario);
    }
    if (nombre) {
      conditions.push(`u.nombre ILIKE $${params.length + 1}`);
      params.push(`%${nombre}%`);
    }
    if (email) {
      conditions.push(`u.email ILIKE $${params.length + 1}`);
      params.push(`%${email}%`);
    }
    if (estado) {
      conditions.push(`p.estado = $${params.length + 1}`);
      params.push(estado);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY p.fecha DESC";

    const { rows } = await connection.query(query, params);
    return rows;
  } catch (error) {
    console.error("Error al obtener los pedidos: ", error.message);
    throw error;
  }
};

// Ver pedidos de un usuario
const getOrderByUserService = async (id_usuario) => {
  let connection;
  try {
    connection = await connectDB();

    const userExist = await connection.query(
      "SELECT id_usuario FROM usuario WHERE id_usuario = $1",
      [id_usuario]
    );

    if (userExist.rows.length === 0) {
      console.error(`El usuario con ID ${id_usuario} no existe.`);
      return [];
    }

    const orders = await connection.query(
      `SELECT 
         p.id_pedido,
         p.total, 
         p.fecha, 
         p.estado, 
         u.nombre, 
         u.email,
         pa.metodo_pago
       FROM pedido p
       JOIN usuario u ON p.id_usuario = u.id_usuario
       LEFT JOIN pago pa ON pa.id_pago = p.id_pago  
       WHERE p.id_usuario = $1
       ORDER BY p.fecha DESC`,
      [id_usuario]
    );
    return orders.rows;
  } catch (error) {
    console.error("Error al obtener los pedidos por usuario: ", error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Crear pedido
const createOrderService = async (order) => {
  try {
    const connection = await connectDB();
    const result = await connection.query(
      `INSERT INTO pedido (id_usuario, total, fecha, estado, id_pago) 
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id_pedido`,
      [
        order.id_usuario,
        order.total,
        order.fecha,
        order.estado || 'pendiente',
        order.id_pago || null
      ]
    );
    return {
      status: true,
      message: "Pedido registrado exitosamente",
      id_pedido: result.rows[0].id_pedido
    };
  } catch (error) {
    console.error("Error en createOrderService:", error.message);
    throw error;
  }
};

// Actualizar total del pedido
const updateTotalPedidoService = async (id_pedido) => {
  try {
    const connection = await connectDB();

    const { rows } = await connection.query(
      `SELECT COALESCE(SUM(precio_total), 0) AS total 
       FROM detalle_pedido 
       WHERE id_pedido = $1`,
      [id_pedido]
    );
    const total = rows[0].total;

    await connection.query(
      `UPDATE pedido SET total = $1 WHERE id_pedido = $2`,
      [total, id_pedido]
    );

    return { status: true, total };
  } catch (error) {
    console.error("Error en updateTotalPedidoService:", error.message);
    throw error;
  }
};

// Eliminar pedido
const deleteOrderService = async (id_pedido) => {
  try {
    const connection = await connectDB();
    const result = await connection.query(
      `DELETE FROM pedido WHERE id_pedido = $1`,
      [id_pedido]
    );
    if (result.rowCount === 1) {
      return { status: true, message: "Pedido eliminado exitosamente" };
    } else {
      return { status: false, message: "No se encontró el pedido a eliminar" };
    }
  } catch (error) {
    console.error("Error en deleteOrderService:", error.message);
    throw error;
  }
};

// Actualizar pedido completo
const updateOrderService = async (id_pedido, order) => {
  try {
    const connection = await connectDB();
    const result = await connection.query(
      `UPDATE pedido SET id_usuario = $1, total = $2, fecha = $3 WHERE id_pedido = $4`,
      [
        order.id_usuario,
        order.total,
        order.fecha,
        id_pedido
      ]
    );
    if (result.rowCount === 1) {
      return { status: true, message: "Pedido actualizado exitosamente" };
    } else {
      return { status: false, message: "No se encontró el pedido a actualizar" };
    }
  } catch (error) {
    console.error("Error en updateOrderService:", error.message);
    throw error;
  }
};

// Actualizar solo el estado
const updateEstadoOrderService = async (id_pedido, estado) => {
  try {
    const connection = await connectDB();
    const result = await connection.query(
      `UPDATE pedido SET estado = $1 WHERE id_pedido = $2`,
      [estado, id_pedido]
    );
    if (result.rowCount === 1) {
      return { status: true, message: "Estado actualizado exitosamente" };
    } else {
      return { status: false, message: "No se encontró el pedido" };
    }
  } catch (error) {
    console.error("Error en updateEstadoOrderService:", error.message);
    throw error;
  }
};

module.exports = {
  getAllOrderService,
  getOrderByUserService,
  createOrderService,
  deleteOrderService,
  updateOrderService,
  updateEstadoOrderService,
  updateTotalPedidoService
};
