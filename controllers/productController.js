const {
  getAllProductsService,
  getProductsByCatalogService,
  getProductsWithFiltersService,
  createProductService,
  deleteProductService,
  updateProductService
} = require("../services/productService");

const {
  productForCreation,
  productForSearch,
  productForDelete
} = require("../models/products");

const { uploadImage } = require("../config/cloudinary");

const getAllProducts = async (req, res) => {
  try {
    const response = await getAllProductsService();
    res.json({ response });
  } catch (error) {
    console.error("Error trying to get the products:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getProductsByCatalog = async (req, res) => {
  const { error } = productForSearch.validate({
    id_catalog: req.params.catalog,
  });
  if (error) {
    return res.status(400).json({ error: "Parámetros inválidos" });
  }
  try {
    const response = await getProductsByCatalogService(req.params.catalog);
    res.json({ response });
  } catch (err) {
    console.error("Error trying to get products:", err);
    res.status(500).json({ error: err.message });
  }
};

const getProductsWithFilters = async (req, res) => {
  try {
    // Recibes los filtros por query params
    const filters = {
      name: req.query.name || null,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : null,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : null,
      minStock: req.query.minStock ? Number(req.query.minStock) : null,
      maxStock: req.query.maxStock ? Number(req.query.maxStock) : null,
      id_catalog: req.query.id_catalog ? Number(req.query.id_catalog) : null
    };
    // Validar que si vienen, sean del tipo esperado (puedes usar Joi o hacer validaciones simples)
    if (
      (filters.minPrice && isNaN(filters.minPrice)) ||
      (filters.maxPrice && isNaN(filters.maxPrice)) ||
      (filters.minStock && isNaN(filters.minStock)) ||
      (filters.maxStock && isNaN(filters.maxStock)) ||
      (filters.id_catalog && isNaN(filters.id_catalog))
    ) {
      return res.status(400).json({ error: "Filtros inválidos" });
    }
    const response = await getProductsWithFiltersService(filters);
    res.json({ response });
  } catch (error) {
    console.error("Error al obtener productos con filtros:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const createProduct = async (req, res) => {
  const { error } = productForCreation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    if (req.files && req.files.image) {
      const file = req.files.image;
      const fileType = file.mimetype.split('/')[0];
      if (fileType !== 'image') {
        return res.status(400).json({ error: 'El archivo debe ser una imagen' });
      }
      const result = await uploadImage(file.tempFilePath);
      req.body.image = result.secure_url; // Asegúrate de que esto sea una URL válida
      console.log("URL de la imagen:", req.body.image); // Verifica la URL aquí
    } else {
      return res.status(400).json({ error: "La imagen es obligatoria" });
    }
    const response = await createProductService(req.body);
    res.status(201).json({ message: "Producto registrado exitosamente", response });
  } catch (error) {
    console.error("Error en el controlador de producto:", error.message);
    res.status(500).json({ error: "El nombre ya existe" });
  }
};

const updateProduct = async (req, res) => {
  const { error } = productForCreation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const { id } = req.params;
    if (req.files && req.files.image) {
      const file = req.files.image;
      const fileType = file.mimetype.split('/')[0];
      if (fileType !== 'image') {
        return res.status(400).json({ error: 'El archivo debe ser una imagen' });
      }
      const result = await uploadImage(file.tempFilePath);
      req.body.image = result.secure_url;
    } else {
      req.body.image = null;  // Aquí defines si quieres borrar la imagen o no
    }
    const response = await updateProductService(id, req.body);
    if (response.status) {
      return res.status(200).json({ message: response.message });
    } else {
      return res.status(404).json({ message: response.message });
    }
  } catch (error) {
    console.error("Error en el controlador de producto:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const deleteProduct = async (req, res) => {
  const id_producto = Number(req.params.id);
  const { error } = productForDelete.validate({id_producto});
  if (error) {
    return res.status(400).json({ error: "ID inválido para eliminar producto" });
  }
  try {
    const response = await deleteProductService(id_producto);
      if (response.status) {
        res.status(200).json({ message: response.message });
      } else {
        res.status(404).json({ message: response.message });
      }
    } catch (error) {
    console.error("Error en el controlador de eliminar producto:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  getAllProducts,
  getProductsByCatalog,
  getProductsWithFilters,
  createProduct,
  updateProduct,
  deleteProduct
};
