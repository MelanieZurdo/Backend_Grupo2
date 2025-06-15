const sql = require('mssql');
const configDB = require('./config').configDB

exports.getConnection = async () => {
    try {
        
        return await sql.connect(configDB)
       
    } catch (error) {
        console.log("Error al conectarse a la base de datos: " + error)
    }
}
