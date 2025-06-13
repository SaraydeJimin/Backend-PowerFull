const connectDB = require("../config/database");

// Ver todos los productos de carrito
const getAllproductCarritoService = async () => {
  const connection = await connectDB();
  try {
    const result = await connection.query("SELECT * FROM producto_carrito");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener los productos, por carrito: ", error.message);
    throw error;
  } finally {
    await connection.end();
  }
};

// Ver el carrito, por producto de carrito
const getproductCarritoByCarritoService = async (id_carrito) => {
  const connection = await connectDB();
  try {
    const resultCarrito = await connection.query(
      "SELECT id_carrito FROM carrito WHERE id_carrito = $1",
      [id_carrito]
    );

    if (resultCarrito.rows.length === 0) {
      console.error(`El carrito con ID ${id_carrito} no existe.`);
      return [];
    }

    const result = await connection.query(
      `SELECT pc.id_carrito, pc.id_producto, pc.cantidad, p.nombre, p.precio, p.imagen
       FROM producto_carrito pc
       JOIN producto p ON pc.id_producto = p.id_producto
       WHERE pc.id_carrito = $1`,
      [id_carrito]
    );

    return result.rows;
  } catch (error) {
    console.error("Error al obtener los productos de carrito, por carrito: ", error.message);
    throw error;
  } finally {
    await connection.end();
  }
};

// Ver el producto, por producto de carrito
const getproductCarritoByProductService = async (id_producto) => {
  const connection = await connectDB();
  try {
    const resultProducto = await connection.query(
      "SELECT id_producto FROM producto WHERE id_producto = $1",
      [id_producto]
    );

    if (resultProducto.rows.length === 0) {
      console.error(`El producto con ID ${id_producto} no existe.`);
      return [];
    }

    const result = await connection.query(
      "SELECT * FROM producto_carrito WHERE id_producto = $1",
      [id_producto]
    );

    return result.rows;
  } catch (error) {
    console.error("Error al obtener los productos de carrito, por producto: ", error.message);
    throw error;
  } finally {
    await connection.end();
  }
};

// Crear un nuevo producto de carrito
const createproductCarritoService = async (productCarrito) => {
  const connection = await connectDB();
  try {
    const resultExists = await connection.query(
      `SELECT * FROM producto_carrito WHERE id_carrito = $1 AND id_producto = $2`,
      [productCarrito.id_carrito, productCarrito.id_producto]
    );

    if (resultExists.rows.length > 0) {
      return {
        status: false,
        message: "El producto ya está en el carrito. Puedes actualizar la cantidad si lo deseas.",
      };
    }

    const result = await connection.query(
      `INSERT INTO producto_carrito (id_carrito, id_producto, cantidad) VALUES ($1, $2, $3) RETURNING *`,
      [
        productCarrito.id_carrito,
        productCarrito.id_producto,
        productCarrito.cantidad,
      ]
    );

    if (result.rows.length === 1) {
      return { status: true, message: "Producto de carrito registrado exitosamente" };
    } else {
      return { status: false, message: "No se pudo registrar el producto de carrito" };
    }
  } catch (error) {
    console.error("Error en createproductCarritoService:", error.message);
    throw error;
  } finally {
    await connection.end();
  }
};

// Eliminar un producto del carrito
const deleteproductCarritoService = async (id_carrito, id_producto) => {
  const connection = await connectDB();
  try {
    const result = await connection.query(
      `DELETE FROM producto_carrito WHERE id_carrito = $1 AND id_producto = $2`,
      [id_carrito, id_producto]
    );

    if (result.rowCount === 1) {
      return { status: true, message: "Producto de carrito eliminado exitosamente" };
    } else {
      return { status: false, message: "No se encontró el producto de carrito a eliminar" };
    }
  } catch (error) {
    console.error("Error en deleteproductCarritoService:", error.message);
    throw error;
  } finally {
    await connection.end();
  }
};

// Actualizar un producto del carrito
const updateproductCarritoService = async (id_carrito, id_producto, updatedFields) => {
  const connection = await connectDB();
  try {
    const resultExists = await connection.query(
      `SELECT * FROM producto_carrito WHERE id_carrito = $1 AND id_producto = $2`,
      [id_carrito, id_producto]
    );

    if (resultExists.rows.length === 0) {
      return {
        status: false,
        message: "No se encontró el producto en ese carrito. No se puede actualizar.",
      };
    }

    const result = await connection.query(
      `UPDATE producto_carrito SET cantidad = $1 WHERE id_carrito = $2 AND id_producto = $3`,
      [updatedFields.cantidad, id_carrito, id_producto]
    );

    if (result.rowCount === 1) {
      return { status: true, message: "Producto de carrito actualizado exitosamente" };
    } else {
      return { status: false, message: "No se pudo actualizar el producto del carrito" };
    }
  } catch (error) {
    console.error("Error en updateproductCarritoService:", error.message);
    throw error;
  } finally {
    await connection.end();
  }
};

module.exports = {
  getAllproductCarritoService,
  getproductCarritoByCarritoService,
  getproductCarritoByProductService,
  createproductCarritoService,
  deleteproductCarritoService,
  updateproductCarritoService,
};
