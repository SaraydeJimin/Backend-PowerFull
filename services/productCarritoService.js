const connectDB = require("../config/database");

//ver todos los productos de carrito
const getAllproductCarritoService = async () => {
  try {
    const connection = await connectDB();
    const [productCarrito] = await connection.execute("SELECT * FROM producto_carrito");
    return productCarrito;
  } catch (error) {
    console.error("Error al obtener los productos, por carrito: ", error.message);
    throw error;
  }
};

//ver el carrito, por producto de carrito
const getproductCarritoByCarritoService = async (id_carrito) => {
  let connection;
  try {
    connection = await connectDB();
    const [carritoExist] = await connection.execute(
      "SELECT ID_CARRITO FROM carrito WHERE ID_CARRITO = ?",
      [id_carrito]
    );
    if (carritoExist.length === 0) {
      console.error(`El carrito con ID ${id_carrito} no existe.`);
      return [];
    }
    const [productCarrito] = await connection.execute(
      `SELECT pc.ID_CARRITO, pc.ID_PRODUCTO, pc.CANTIDAD, p.NOMBRE, p.PRECIO, p.IMAGEN
       FROM producto_carrito pc
       JOIN producto p ON pc.ID_PRODUCTO = p.ID_PRODUCTO
       WHERE pc.ID_CARRITO = ?`,
      [id_carrito]
    );
    return productCarrito;
  } catch (error) {
    console.error("Error al obtener los productos de carrito, por carrito: ", error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

//ver el producto, por producto de carrito
const getproductCarritoByProductService = async (id_producto) => {
    let connection;
    try {
      connection = await connectDB();
      const [productExist] = await connection.execute(
        "SELECT ID_PRODUCTO FROM producto WHERE ID_PRODUCTO = ?",
        [id_producto]
      );
      if (productExist.length === 0) {
        console.error(`El producto con ID ${id_producto} no existe.`);
        return [];
      }
      const [productCarrito] = await connection.execute(
        "SELECT * FROM producto_carrito WHERE ID_PRODUCTO = ?",
        [id_producto]
      );
      return productCarrito;
    } catch (error) {
      console.error("Error al obtener los productos de carrito, por producto: ", error.message);
      throw error;
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  };

// Servicio para crear un nuevo producto de carrito
const createproductCarritoService = async (productCarrito) => {
  try {
    const connection = await connectDB();
    // Verificar si ya existe ese producto en ese carrito
    const [exists] = await connection.execute(
      `SELECT * FROM producto_carrito WHERE ID_CARRITO = ? AND ID_PRODUCTO = ?`,
      [productCarrito.id_carrito, productCarrito.id_producto]
    );
    if (exists.length > 0) {
      return {
        status: false,
        message: "El producto ya está en el carrito. Puedes actualizar la cantidad si lo deseas.",
      };
    }
    const result = await connection.execute(
      `INSERT INTO producto_carrito (ID_CARRITO, ID_PRODUCTO, CANTIDAD) VALUES (?, ?, ?)`,
      [
        productCarrito.id_carrito,
        productCarrito.id_producto,
        productCarrito.cantidad,
      ]
    );
    if (result[0].affectedRows === 1) {
      return { status: true, message: "Producto de carrito registrado exitosamente" };
    } else {
      return { status: false, message: "No se pudo registrar el producto de carrito" };
    }
  } catch (error) {
    console.error("Error en createproductCarritoService:", error.message);
    throw error;
  }
};

//elimimnar el producto del carrito
const deleteproductCarritoService = async (id_carrito, id_producto) => {
  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `DELETE FROM producto_carrito WHERE ID_CARRITO = ? AND ID_PRODUCTO = ?`,
      [id_carrito, id_producto]
    );

    if (result[0].affectedRows === 1) {
      return { status: true, message: "Producto de carrito eliminado exitosamente" };
    } else {
      return { status: false, message: "No se encontró el Producto de carrito a eliminar" };
    }
  } catch (error) {
    console.error("Error en deleteproductCarritoService:", error.message);
    throw error;
  }
  await connection.end();
};

//actualizar el producto de carrito
const updateproductCarritoService = async (id_carrito, id_producto, updatedFields) => {
  try {
    const connection = await connectDB();
    // Validamos que el producto exista en ese carrito
    const [exists] = await connection.execute(
      `SELECT * FROM producto_carrito WHERE ID_CARRITO = ? AND ID_PRODUCTO = ?`,
      [id_carrito, id_producto]
    );
    if (exists.length === 0) {
      return {
        status: false,
        message: "No se encontró el producto en ese carrito. No se puede actualizar.",
      };
    }
    const result = await connection.execute(
      `UPDATE producto_carrito SET CANTIDAD = ? WHERE ID_CARRITO = ? AND ID_PRODUCTO = ?`,
      [
        updatedFields.cantidad,
        id_carrito,
        id_producto
      ]
    );
    if (result[0].affectedRows === 1) {
      return { status: true, message: "Producto de carrito actualizado exitosamente" };
    } else {
      return { status: false, message: "No se pudo actualizar el producto del carrito" };
    }
  } catch (error) {
    console.error("Error en updateproductCarritoService:", error.message);
    throw error;
  }
};

module.exports = { getAllproductCarritoService, getproductCarritoByCarritoService, getproductCarritoByProductService, createproductCarritoService, deleteproductCarritoService, updateproductCarritoService };
