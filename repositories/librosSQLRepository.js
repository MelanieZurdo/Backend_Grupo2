const { getSQLConnection } = require('../database/conexion')
const queries = require('../database/librosQueries')
const sql = require('mssql');

//Obtengo todos los libros SQL
exports.getAllBooksRepository = async () => {
    const pool = await getSQLConnection()
    try {
        const resultado = await pool.request().query(queries.getAllBooks)
        console.table(resultado.recordset)
        return resultado.recordset

    } catch (error) {
        console.log("Error en getAllBooksRepository - Repository " + error)
        throw Error("Error en getAllBooksRepository - Repository " + error)
    }
    finally {
        pool.close()
    }
}

//Creo un nuevo libro SQL
exports.postNewBookRepository = async (libroNuevo) => {
    const { Titulo, IdAutor, FechaPublicacion, Genero, Disponibilidad } = libroNuevo
    const pool = await getSQLConnection()

    try {
        const resultado = await pool.request()
            .input('Titulo', sql.NVarChar, Titulo)
            .input('IdAutor', sql.Int, IdAutor)
            .input('FechaPublicacion', sql.Date, FechaPublicacion)
            .input('Genero', sql.NVarChar, Genero)
            .input('Disponibilidad', sql.Bit, Disponibilidad)
            .query(queries.postNewBook)

        console.log(resultado.recordset)
        return resultado.recordset

    } catch (error) {
        console.log("Error en postNewBookRepository - Repository " + error)
        throw Error("Error en postNewBookRepository - Repository " + error)
    }
    finally {
        pool.close()
    }
}

//Modifico disponibilidad del libro mediante su ID SQL
exports.putBookAvailabilityRepository = async (IdLibro, libroActualizado) => {
    const { Disponibilidad } = libroActualizado;
    const pool = await getSQLConnection();

    try {
        if (Disponibilidad == null) {
            console.log("No se proporcionó disponibilidad");
            return [];
        }

        const resultado = await pool.request()
            .input('IdLibro', sql.Int, IdLibro)
            .input('Disponibilidad', sql.Bit, Disponibilidad)
            .query(queries.putBookAvailability);

        //const resultado = await request.query(queries.putBookAvailability);


        if (resultado.rowsAffected[0] === 0) {
            console.log("No se ha podido modificar la disponibilidad del libro");
            return [];
        }

        console.log("Se ha modificado la disponibilidad del libro");
        return resultado.recordset;

    } catch (error) {
        console.log("Error en putBookAvailability - Repository " + error);
        throw Error("Error en putBookAvailability - Repository " + error);
    } finally {
        pool.close();
    }
}

//Obtener todos los libros de un autor por (IdAutor) y la informacion del mismo.
exports.getBooksByIdAuthorRepository = async (IdAutor) => {
    const pool = await getSQLConnection();
    try {
        const resultado = await pool.request()
            .input('IdAutor', sql.Int, IdAutor)
            .query(queries.getBooksByIdAuthor);
        console.table(resultado.recordset)
        return resultado.recordset
    }
    catch (error) {
        console.log("Error en getBooksByIdAuthor - Repository " + error)
        throw Error("Error en getBooksByIdAuthor - Repository " + error)
    }
    finally {
        pool.close();
    }
}

//Actualizar los datos de un libro por su ID - SQL
exports.putBookByIdRepository = async (IdLibro, libroActualizado) => {
    const { Titulo, IdAutor, FechaPublicacion, Genero, Disponibilidad } = libroActualizado;
    const pool = await getSQLConnection();

    try {

        let resultado = await pool.request().
        input('IdLibro', sql.Int, IdLibro)

        if (Titulo != null) {
            resultado.input('Titulo', sql.NVarChar, Titulo)            
        }
        if (IdAutor != null) {
            resultado.input('IdAutor', sql.Int, IdAutor)            
        }
        if (FechaPublicacion != null) {
            resultado.input('FechaPublicacion', sql.Date, FechaPublicacion)            
        }
        if (Genero != null) {
            resultado.input('Genero', sql.NVarChar, Genero)            
        }
        if (Disponibilidad != null) {
            resultado.input('Disponibilidad', sql.Int, Disponibilidad)            
        }

        resultado = await resultado.query(queries.updateBook)

        console.table(resultado.recordset)
        return resultado.recordset
    } catch (error) {
        console.log("Error en putBookRepository - Repository " + error)
        throw Error("Error en putBookRepository - Repository " + error)
    } finally {
        pool.close()
    }
}


























/* exports.putBookAvailabilityRepository = async (IdLibro, libroActualizado) => {
    const { Disponibilidad } = libroActualizado;
    const pool = await getSQLConnection();

    try {

        await pool.request().query('USE Biblioteca')

        let queryActualizada = 'UPDATE Libro SET ';
        const resultado = pool.request().input('IdLibro', sql.Int, IdLibro)

        if (Disponibilidad != null) {
            resultado.input('Disponibilidad', sql.Bit, Disponibilidad)
            queryActualizada += 'Disponibilidad = @Disponibilidad'
        }
       
        queryActualizada = queryActualizada.trim().replace(/,$/, '')        
        queryActualizada += ' WHERE IdLibro = @IdLibro'        

        const libroActualizado = await resultado.query(queryActualizada)

        if (libroActualizado.rowsAffected[0] == 0) {
            return []
        }
        return { Disponibilidad }
    } catch (error) {
        console.log("Error en putBookAvailability - Repository " + error)
        throw Error("Error en putBookAvailability - Repository " + error)
    }
    finally{
        pool.close()
    }
} */


