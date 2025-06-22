const sql = require('mssql');
const { getSQLConnection } = require('../database/conexion');
const autorQueries = require('../database/queries/autorQueries');

exports.getAllAutorRepository = async () => {
    const pool = await getSQLConnection();
    try {

        const result = await pool.request().query(autorQueries.getAutor);
        // console.log('funkaa');
        return result.recordset;
    } catch (error) {
        console.log("Error en getAllAutorRepository - Repository " + error)
        throw Error("Error en getAllAutorRepository - Repository " + error)
    }
    finally {
        pool.close()
    }
}


exports.createAutorRepository = async (autorNuevo) => {
    const { NombreAutor, Nacionalidad, FechaNacimiento } = autorNuevo;
    const pool = await getSQLConnection();

    try {
        const resultado = await pool.request()
            .input('NombreAutor', sql.NVarChar, NombreAutor)
            .input('Nacionalidad', sql.NVarChar, Nacionalidad)
            .input('FechaNacimiento', sql.DateTime, FechaNacimiento)
            .query(autorQueries.addAutor);


        return resultado.recordset;


    } catch (error) {
        console.log("Error en createAutorRepository - Repository " + error)
        throw Error("Error en createAutorRepository - Repository " + error)
    }
    finally {
        pool.close();
    }
}

exports.deleteAutorRepository = async (idAutor) => {
    const pool = await getSQLConnection();

    try {
        const autorEncontrado = await pool.request()
            .input('idAutor', sql.Int, idAutor)
            .query(autorQueries.getAutorById);
        if (autorEncontrado.recordset === 0) {
            console.log('autor no encontrado');
        } else {
            await pool.request()
                .input('idAutor', sql.Int, idAutor)
                .query(autorQueries.deleteAutorById);

            return autorEncontrado.recordset[0];

        }
    } catch (error) {
        console.log("Error en deleteAutorRepository - Repository " + error)
        throw Error("Error en deleteAutorRepository - Repository " + error)
    }
    finally {
        pool.close();
    }
}

exports.updateAutorRepository = async (idAutor, autorActualizado) => {
    console.log(`REPOSITORY  - updateAutorRepository - id:${idAutor} - autorActualizado:${JSON.stringify(autorActualizado)}`)
    const pool = await getSQLConnection();
    const { NombreAutor, Nacionalidad, FechaNacimiento } = autorActualizado



    try {
        await pool.request().query('USE Biblioteca')

        let queryActualizar = 'UPDATE Autor SET '
        const requestActualizado = pool.request().input('idAutor', sql.Int, idAutor)

        if (NombreAutor != null) {
            requestActualizado.input('NombreAutor', sql.NVarChar, NombreAutor)
            queryActualizar += 'NombreAutor = @NombreAutor,';
        }

        if (Nacionalidad != null) {
            requestActualizado.input('Nacionalidad', sql.NVarChar, Nacionalidad)
            queryActualizar += 'Nacionalidad = @Nacionalidad,';
        }

        if (FechaNacimiento != null) {
            requestActualizado.input('FechaNacimiento', sql.NVarChar, FechaNacimiento)
            queryActualizar += 'FechaNacimiento = @FechaNacimiento,';
        }

        queryActualizar = queryActualizar.trim().replace(/,$/, '')
        queryActualizar += ' WHERE idAutor = @idAutor'


        const autorActualizado = await requestActualizado.query(queryActualizar);

        if (autorActualizado.rowsAffected[0] == 0) {
            return null;
        }

        return { NombreAutor, Nacionalidad, FechaNacimiento }

    } catch (error) {
        console.log("Error en updateAutorRepository - Repository " + error)
        throw Error("Error en updateAutorRepository - Repository " + error)
    }
    finally {
        pool.close();
    }
}


