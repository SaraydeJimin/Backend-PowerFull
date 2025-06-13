const connectDB = require("../config/database");

// Crear pago
const createPagoService = async (pago) => {
  try {
    const client = await connectDB();

    const query = `
      INSERT INTO pago 
        (id_usuario, fecha_pago, metodo_pago, nombre_tarjeta, numero_tarjeta, fecha_expedicion)
      VALUES 
        ($1, $2, $3, $4, $5, $6)
      RETURNING id_pago
    `;

    const values = [
      pago.id_usuario,
      pago.fecha_pago,
      pago.metodo_pago,
      pago.nombre_tarjeta ?? null,
      pago.numero_tarjeta ?? null,
      pago.fecha_expedicion ?? null
    ];

    const result = await client.query(query, values);

    if (result.rowCount === 1) {
      return {
        status: true,
        message: "Pago registrado exitosamente",
        id_pago: result.rows[0].id_pago
      };
    } else {
      return { status: false, message: "No se pudo registrar el pago" };
    }

  } catch (error) {
    console.error("Error en pagoService:", error.message);
    throw error;
  }
};

module.exports = { createPagoService };
