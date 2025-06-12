const {
  getAllproductCarritoService, 
  getproductCarritoByCarritoService, 
  getproductCarritoByProductService, 
  createproductCarritoService,
  deleteproductCarritoService,
  updateproductCarritoService
} = require("../services/productCarritoService");

const {
  productCarritoForCreation,
  productCarritoForUpdate,
  productCarritoForSearch,
  productCarritoForDelete,
  productCarritoForBulkCreation
} = require("../models/productCarrito");

// Obtener todos los productos de todos los carritos
const getAllproductCarrito = async (req, res) => {
  try {
    const response = await getAllproductCarritoService();
    res.json({ response });
  } catch (error) {
    console.error("Error trying to get the product Carrito:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Obtener productos por carrito
const getproductCarritoByCarrito = async (req, res) => {
  const { id_carrito } = req.params;
  const { error } = productCarritoForSearch.validate({ id_carrito });
  if (error) {
    return res.status(400).json({ error: "Parámetros inválidos" });
  }

  try {
    const response = await getproductCarritoByCarritoService(id_carrito);
    if (response.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos para este carrito" });
    }
    res.json({ response });
  } catch (err) {
    console.error("Error al obtener los productos por carrito:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const getproductCarritoByProduct = async (req, res) => {
  const { id_producto } = req.params;
  const { error } = productCarritoForSearch.validate({ id_producto });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const response = await getproductCarritoByProductService(id_producto);
    if (response.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos para este producto" });
    }
    res.json({ response });
  } catch (err) {
    console.error("Error al obtener los productos por producto", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const createproductCarrito = async (req, res) => {
  // Validar al principio
  const { error } = productCarritoForBulkCreation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Ahora sí desestructuramos sabiendo que el cuerpo es válido
  const { id_carrito, productos } = req.body;

  try {
    const resultados = [];
    for (const item of productos) {
      const { id_producto, cantidad } = item;
      const existingProduct = await getproductCarritoByProductService(id_producto);
      const yaExisteEnCarrito = existingProduct.find(p => p.ID_CARRITO == id_carrito);

      if (yaExisteEnCarrito) {
        const updatedProduct = await updateproductCarritoService(id_carrito, id_producto, {
          cantidad: yaExisteEnCarrito.CANTIDAD + cantidad
        });
        resultados.push({
          id_producto,
          status: "actualizado",
          mensaje: updatedProduct.message
        });
      } else {
        const nuevoProducto = await createproductCarritoService({
          id_carrito,
          id_producto,
          cantidad
        });
        resultados.push({
          id_producto,
          status: "creado",
          mensaje: nuevoProducto.message
        });
      }
    }

    return res.status(201).json({
      message: "Productos procesados correctamente",
      resultados
    });
  } catch (error) {
    console.error("Error al agregar múltiples productos:", error.message);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

// Actualizar cantidad de producto en el carrito
const updateproductCarrito = async (req, res) => {
  const { id_carrito, id_producto } = req.params;

  const { error } = productCarritoForUpdate.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const response = await updateproductCarritoService(id_carrito, id_producto, req.body);
    if (!response) {
      return res.status(404).json({ message: "No se encontró el producto en el carrito para actualizar" });
    }

    res.status(200).json({ message: "Producto actualizado exitosamente", response });
  } catch (error) {
    console.error("Error en el controlador de producto de carrito:", error.message);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

// Eliminar producto del carrito
const deleteproductCarrito = async (req, res) => {
  const { id_carrito, id_producto } = req.params;

  const { error } = productCarritoForDelete.validate({ id_carrito, id_producto });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const response = await deleteproductCarritoService(id_carrito, id_producto);

    if (!response || response.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado en el carrito" });
    }

    res.status(200).json({ message: "Producto eliminado exitosamente del carrito", response });
  } catch (error) {
    console.error("Error en el controlador de producto de carrito:", error.message);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  getAllproductCarrito,
  getproductCarritoByCarrito,
  getproductCarritoByProduct,
  createproductCarrito,
  updateproductCarrito,
  deleteproductCarrito
};
