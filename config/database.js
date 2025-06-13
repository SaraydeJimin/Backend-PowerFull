require('dotenv').config();
const { Client } = require('pg'); // ✅ usamos Client, no connectDB ni Connection

const connectDB = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Esto es importante en entornos como Render
    }, 
    
  });

  try {
    await client.connect();
    console.log("Conexión exitosa a la base de datos PostgreSQL.");
    return client;
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err.message);
    throw err;
  }
};

module.exports = connectDB;
