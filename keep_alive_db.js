// Este script debe estar en tu repositorio de GitHub.
import { Database } from '@sqlitecloud/drivers'; // Asegúrate de tener esta librería en tu package.json

// La URL de conexión debe venir de una variable de entorno segura
const CONNECTION_STRING = process.env.SQLITE_CLOUD_URL;

async function keepAlive() {
  try {
    const db = new Database(CONNECTION_STRING);
    // Ejecuta una consulta rápida para mantener la base de datos activa
    await db.sql`SELECT 1;`;
    console.log('✅ SQLite Cloud pingueado con éxito.');
    // Cierra la conexión si tu driver lo requiere
    // await db.close(); 
  } catch (error) {
    console.error('❌ Error al mantener activa la conexión:', error);
    // Es importante que el script falle si hay un error
    process.exit(1); 
  }
}

keepAlive();