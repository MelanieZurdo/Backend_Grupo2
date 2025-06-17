const sql = require('mssql');
const { getSQLConnection } = require('../database/conexion');
const queries = require('../database/queriesAutor')

exports.getAllAutorRepository = async () => {
    const pool = await getSQLConnection();
    try {
        
        const result = await pool.request().query(queries.getAutor);
       // console.log('funkaa');
        return result.recordset;
    } catch (error) {
        console.error("Error en getAllAutorRepository: ", error);
        throw Error("Error en getAllAutorRepository: ", error); 
    }finally{
        pool.close()
    }
}


exports.createAutorRepository = async (autorNuevo) => {
    const {NombreAutor, Nacionalidad, FechaNacimiento} = autorNuevo;
    const pool = await getSQLConnection();
    
    try {
        const resultado = await pool.request()
        .input('NombreAutor', sql.NVarChar, NombreAutor)
        .input('Nacionalidad', sql.NVarChar, Nacionalidad)
        .input('FechaNacimiento', sql.Date, FechaNacimiento)
        .query(queries.addAutor);


        return resultado.recordset;

        
    } catch (error) {
        console.log("createNewFrontendLanguageRepository - " + error)
        throw Error("Error al intentar crear el nuevo lenguaje: - " + error)        
    } finally{
        pool.close();
    }
}

exports.deleteAutorRepository = async (idAutor) => {
    const pool = await getSQLConnection();

    try {
        const autorEncontrado = await pool.request()
        .input('idAutor',sql.Int, idAutor)
        .query(queries.getAutorById);
        if (autorEncontrado.recordset === 0) {
            console.log('autor no encontrado');
        } else {
            await pool.request()
            .input('idAutor',sql.Int, idAutor)
            .query(queries.deleteAutorById);

            return autorEncontrado.recordset[0];
        
        }
    } catch (error) {
        console.log('DeleteAutorRepository error')
        throw Error('No se pudo eliminar autor' + error);
    } finally {
        pool.close();
    }
}


