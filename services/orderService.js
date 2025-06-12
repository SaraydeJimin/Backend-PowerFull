const connectDB = require("../config/database");

//ver todos los pedidos
const getAllOrderService = async ({ id_usuario = null, nombre = null, email = null, estado = null }) => {
  try {
    const connection = await connectDB();
    let query = `SELECT p.ID_PEDIDO, p.ID_USUARIO, p.TOTAL, p.FECHA, p.ESTADO, u.NOMBRE, u.EMAIL FROM pedido p JOIN usuario u ON p.ID_USUARIO = u.ID_USUARIO`;
    const conditions = [];
    const params = [];

    if (id_usuario) {
      conditions.push("p.ID_USUARIO = ?");
      params.push(id_usuario);
    }
    if (nombre) {
      conditions.push("u.NOMBRE LIKE ?");
      params.push(`%${nombre}%`);
    }
    if (email) {
      conditions.push("u.EMAIL LIKE ?");
      params.push(`%${email}%`);
    }
    if (estado) {
      conditions.push("p.ESTADO = ?");
      params.push(estado);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY p.FECHA DESC";

    const [orders] = await connection.execute(query, params);
    return orders;
  } catch (error) {
    console.error("Error al obtener los pedidos: ", error.message);
    throw error;
  }
};

//ver los pedidos de los usuarios
const getOrderByUserService = async (id_usuario) => {
  let connection;
  try {
    connection = await connectDB();

    const [userExist] = await connection.execute(
      "SELECT ID_USUARIO FROM usuario WHERE ID_USUARIO = ?",
      [id_usuario]
    );

    if (userExist.length === 0) {
      console.error(`El usuario con ID ${id_usuario} no existe.`);
      return [];
    }

    const [orders] = await connection.execute(
      `SELECT 
         p.ID_PEDIDO,
         p.TOTAL, 
         p.FECHA, 
         p.ESTADO, 
         u.NOMBRE, 
         u.EMAIL,
         pa.METODO_PAGO
       FROM pedido p
       JOIN usuario u ON p.ID_USUARIO = u.ID_USUARIO
       LEFT JOIN pago pa ON pa.ID_PAGO = p.ID_PAGO  
       WHERE p.ID_USUARIO = ?
       ORDER BY p.FECHA DESC`,
      [id_usuario]
    );
    return orders;
  } catch (error) {
    console.error("Error al obtener los pedidos por usuario: ", error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

//crear pedido
const createOrderService = async (order) => {
  try {
    const connection = await connectDB();
    const [result] = await connection.execute(
      `INSERT INTO pedido (ID_USUARIO, TOTAL, FECHA, ESTADO, ID_PAGO) VALUES (?, ?, ?, ?, ?)`,
      [
        order.id_usuario,
        order.total,
        order.fecha,
        order.estado || 'pendiente',
        order.id_pago || null
      ]
    );
    if (result.affectedRows === 1) {
      return { 
        status: true, 
        message: "Pedido registrado exitosamente",
        id_pedido: result.insertId
      };
    } else {
      return { status: false, message: "No se pudo registrar el pedido" };
    }
  } catch (error) {
    console.error("Error en createOrderService:", error.message);
    throw error;
  }
};

//actualizar total del pedido
const updateTotalPedidoService = async (id_pedido) => {
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute(
      `SELECT IFNULL(SUM(PRECIO_TOTAL), 0) AS total FROM detalle_pedido WHERE ID_PEDIDO = ?`,
      [id_pedido]
    );
    const total = rows[0].total;
    await connection.execute(
      `UPDATE pedido SET TOTAL = ? WHERE ID_PEDIDO = ?`,
      [total, id_pedido]
    );
    return { status: true, total };
  } catch (error) {
    console.error("Error en updateTotalPedidoService:", error.message);
    throw error;
  }
};

//elimina el pedido
const deleteOrderService = async (id_pedido) => {
  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `DELETE FROM pedido WHERE ID_PEDIDO = ?`,
      [id_pedido]
    );
    if (result[0].affectedRows === 1) {
      return { status: true, message: "Pedido eliminado exitosamente" };
    } else {
      return { status: false, message: "No se encontró el pedido a eliminar" };
    }
  } catch (error) {
    console.error("Error en deleteOrderService:", error.message);
    throw error;
  }
};

//actualiza el pedido
const updateOrderService = async (id_pedido, order) => {
  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `UPDATE pedido SET ID_USUARIO = ?, TOTAL = ?, FECHA = ? WHERE ID_PEDIDO = ?`,
      [
        order.id_usuario,
        order.total,
        order.fecha,
        id_pedido
      ]
    );
    if (result[0].affectedRows === 1) {
      return { status: true, message: "Pedido actualizado exitosamente" };
    } else {
      return { status: false, message: "No se encontró el pedido a actualizar" };
    }
  } catch (error) {
    console.error("Error en updateOrderService:", error.message);
    throw error;
  }
};

//función de admin para actualizar solo el estado del pedido
const updateEstadoOrderService = async (id_pedido, estado) => {
  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `UPDATE pedido SET ESTADO = ? WHERE ID_PEDIDO = ?`,
      [estado, id_pedido]
    );
    if (result[0].affectedRows === 1) {
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
