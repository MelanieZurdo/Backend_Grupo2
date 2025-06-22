const sql = require('mssql');
const { getSQLConnection } = require('../database/conexion')
const libroQueries = require('../database/queries/libroQueries');


//Obtengo todos los libros - SQL
exports.getAllBooksRepository = async () => {
    const pool = await getSQLConnection()
    try {
        const resultado = await pool.request().query(libroQueries.getAllBooks)
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

//Creo un nuevo libro - SQL
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
            .query(libroQueries.postNewBook)

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

//Modifico disponibilidad del libro mediante su ID - SQL
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
            .query(libroQueries.putBookAvailability);

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

//Obtener todos los libros de un autor por (IdAutor) y la informacion del mismo - SQL
exports.getBooksByIdAuthorRepository = async (IdAutor) => {
    const pool = await getSQLConnection();
    try {
        const resultado = await pool.request()
            .input('IdAutor', sql.Int, IdAutor)
            .query(libroQueries.getBooksByIdAuthor);
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

//Modifico items de manera opcional de un libro mediante su ID - SQL
exports.putBookItemsByIdRepository = async (IdLibro, libroActualizado) => {
    const { Titulo, IdAutor, FechaPublicacion, Genero, Disponibilidad } = libroActualizado;
    const pool = await getSQLConnection();

    try {
        let query = 'UPDATE Biblioteca.dbo.Libro SET ';
        const request = await pool.request().input('IdLibro', sql.Int, IdLibro)
        if (Titulo != null) {
            request.input('Titulo', sql.NVarChar, Titulo)
            query += 'Titulo = @Titulo, '
        }
        if (IdAutor != null) {
            request.input('IdAutor', sql.Int, IdAutor)
            query += 'IdAutor = @IdAutor, '
        }
        if (FechaPublicacion != null) {
            request.input('FechaPublicacion', sql.Date, FechaPublicacion)
            query += 'FechaPublicacion = @FechaPublicacion, '
        }
        if (Genero != null) {
            request.input('Genero', sql.NVarChar, Genero)
            query += 'Genero = @Genero, '
        }
        if (Disponibilidad != null) {
            request.input('Disponibilidad', sql.Bit, Disponibilidad)
            query += 'Disponibilidad = @Disponibilidad'
        }
        if (query.trim() === 'UPDATE Biblioteca.dbo.Libro SET') {
            throw new Error("No se recibió ningún campo para actualizar");
        }

        query = query.trim().replace(/,$/, '')
        
        query += ' OUTPUT INSERTED.* WHERE IdLibro = @IdLibro'
        
        const libroActualizado = await request.query(query)

        if (libroActualizado.rowsAffected[0] == 0) {
            return null
        }
        return libroActualizado.recordset
    }catch (error) {
        console.log("Error en putBookItemsByIdRepository - Repository " + error)
        throw Error("Error en putBookItemsByIdRepository - Repository " + error)
    }
    finally {
        pool.close()
    }
}


