// keep_alive_db.js
import { Database } from '@sqlitecloud/drivers';

const CONNECTION_STRING = "sqlitecloud://cjpbteq6hz.g2.sqlite.cloud:8860/frabel-database?apikey=FfhzRXRDvzVRsXe9eCffmWJWkvCHTallPKpwkv1b69o";

async function keepAlive() {
  let db; // Declaramos db fuera del try para que sea accesible en finally
  try {
    db = new Database(CONNECTION_STRING);
    
    // 1. Ejecuta la consulta de mantenimiento
    await db.sql`SELECT 1;`;
    
    console.log('✅ SQLite Cloud pingueado con éxito.');
    
    // 2. Si la conexión se abrió, intenta cerrarla limpiamente
    if (db) {
        // La terminación de Node.js a veces es suficiente, pero cerrar es mejor práctica.
        // Dependiendo del driver, puede que el proceso termine antes de que se cierre.
        // await db.close(); 
    }
    
    // 3. ¡Terminar el proceso Node.js inmediatamente!
    process.exit(0); 

  } catch (error) {
    console.error('❌ Error al mantener activa la conexión:', error);
    // 4. Si hay un error, terminar con código de fallo (1)
    process.exit(1);
  }
}

keepAlive();
// Nota: No se necesita un .catch o .then aquí si se usa async/await y process.exit