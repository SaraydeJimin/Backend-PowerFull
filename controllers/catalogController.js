const {
    getAllCatalogService, 
    getCatalogByNameService, 
    createCatalogService,
    updateCatalogService,
    deleteCatalogService
  } = require("../services/catalogService");
  
  const {
    catalogForCreation, 
    catalogForUpdate, 
    catalogForSearch, 
    catalogForDelete
  } = require("../models/catalog");
  
  const getAllCatalog = async (req, res) => {
    try {
      const response = await getAllCatalogService();
      res.json({ response });
    } catch (error) {
      console.error("Error trying to get the Catalog:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  const getCatalogByName = async (req, res) => {
    // Accedemos al parámetro 'nombre' de la ruta
    const { nombre } = req.params;
    // Validar que el 'nombre' no esté vacío (si es necesario)
    const { error } = catalogForSearch.validate({ nombre });
    if (error) {
      return res.status(400).json({ error: "Parámetros inválidos" });
    }
    try {
      // Llamar al servicio para buscar el catálogo por nombre
      const response = await getCatalogByNameService(nombre);
      if (!response) {
        return res.status(404).json({ error: "Catálogo no encontrado" });
      }
      res.json({ response });
    } catch (err) {
      console.error("Error intentando obtener el catálogo:", err);
      res.status(500).json({ error: err.message });
    }
  };  

  const createCatalog = async (req, res) => {
    const { error } = catalogForCreation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error });
    }
    try {
      const response = await createCatalogService(req.body);
      res
        .status(201)
        .json({ message: "Catalog registered succesfully", response });
    } catch (error) {
      console.error("Error en el controlador del catalogo:", error.message);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  };

  const updateCatalog = async (req, res) => {
    console.log("BODY ENTRANTE:", req.body);
    const { id } = req.params; // El id del catálogo que estamos actualizando
    const updatedData = req.body; // Los datos a actualizar
    // Validamos los datos según el esquema catalogForUpdate
    const { error } = catalogForUpdate.validate(updatedData);
    if (error) {
      return res.status(400).json({ error: error.details.map(err => err.message).join(", ") }); // Mejorar el mensaje de error
    }
    try {
      // Llamamos al servicio para actualizar el catálogo con el ID y los nuevos datos
      const response = await updateCatalogService(id, updatedData);
      if (!response) {
        return res.status(404).json({ error: "Catálogo no encontrado" }); // Si no se encuentra el catálogo
      }
      res.status(200).json({ message: "Catálogo actualizado con éxito", response });
    } catch (error) {
      console.error("Error en el controlador del catálogo:", error.message);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  };  

  const deleteCatalog = async (req, res) => {
    const { id } = req.params; // Aquí accedemos al ID de la URL
    try {
      const response = await deleteCatalogService(id); // Llamamos al servicio pasando el ID
      if (!response) {
        return res.status(404).json({ error: "Catálogo no encontrado" });
      }
      res.status(200).json({ message: "Catálogo eliminado con éxito", response });
    } catch (error) {
      console.error("Error al eliminar el catálogo:", error.message);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  };
  

  module.exports = { getAllCatalog, getCatalogByName, createCatalog, updateCatalog, deleteCatalog };
  

  