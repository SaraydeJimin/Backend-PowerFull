require("dotenv").config();
const { Pool } = require("pg");

const connectDB = async () => {
  try {
    const pool = new Pool({
      host: process.env.BDSENA_HOST,
      user: process.env.BDSENA_USER,
      password: process.env.BDSENA_PASSWORD,
      database: process.env.BDSENA_DATABASE,
      port: 5432, // Puerto por defecto de PostgreSQL
      ssl: {
        rejectUnauthorized: false, // Si usas Render o alguna plataforma con SSL
      },
    });

    // Verifica la conexión
    await pool.query("SELECT NOW()");
    console.log("Conexión exitosa a la base de datos PostgreSQL.");

    return pool;
  } catch (error) {
    console.error("Error conectando a la base de datos PostgreSQL:", error.message, error.stack);
    throw error;
  }
};

module.exports = connectDB;
