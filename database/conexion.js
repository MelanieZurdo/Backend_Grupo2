const sql = require('mssql');
const configDB = require('./config').configDB

getConnection = async () => {
    try {
        const pool = await sql.connect(configDB);

        const resultado = await pool.request().query('SELECT 1');
        console.log(resultado)

        return pool
    } catch (error) {
        console.log("Error en getConnection: " + error)
    }
}

getConnection();