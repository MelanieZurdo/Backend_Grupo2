const sql = require('mssql');
const configDB = require('./config').configDB

exports.getSQLConnection = async () => {
    console.log("invocando el método getSQLConnection")
    try {
        const pool = await sql.connect(configDB);

/*         const resultado = await pool.request().query('select * from libro');
        console.log(resultado)
 */
        return pool
    } catch (error) {
        console.log("Error en getConnection: " + error)
    }
}


//getSQLConnection();