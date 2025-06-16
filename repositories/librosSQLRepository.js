const { infoBiblioteca } = require('../src/InfoBiblioteca')
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
    finally{
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
    finally{
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

        const request = pool.request()
            .input('IdLibro', sql.Int, IdLibro)
            .input('Disponibilidad', sql.Bit, Disponibilidad);

        const resultado = await request.query(queries.putBookAvailability);
        

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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//No SQL aún

//Obtengo libro por ID
exports.getBooksByIdRepository = async (id_librosolicitado) => {
    try {
        const librosFiltrados = await infoBiblioteca.libros.filter(libro => {
            return libro.id_libro == id_librosolicitado
        })

        if (librosFiltrados.length === 0) {
            return []
        }
        else {
            console.table(librosFiltrados)
            return librosFiltrados
        }

    } catch (error) {
        console.log("Error en getBooksByIdRepository - Repository " + error)
        throw Error("Error en getBooksByIdRepository - Repository " + error)
    }
}

//Modifico un libro por id
exports.putBookRepository = async (id_libroAModificar, libroNuevo) => {
    try {
        const index = await infoBiblioteca.libros.findIndex(libro => libro.id_libro == id_libroAModificar);

        if (index < 0) {
            return []
        }
        else {
            infoBiblioteca.libros[index] = libroNuevo
            return JSON.stringify(infoBiblioteca.libros)
        }

    } catch (error) {
        console.log("Error en putBookRepository - Repository " + error)
        throw Error("Error en putBookRepository - Repository " + error)
    }
}


























/* exports.putBookAvailabilityRepository = async (IdLibro, libroActualizado) => {
    const { Disponibilidad } = libroActualizado;
    const pool = await getSQLConnection();

    try {

        await pool.request().query('USE Biblioteca')

        let queryActualizada = 'UPDATE Libro SET ';
        const requestActualizado = pool.request().input('IdLibro', sql.Int, IdLibro)

        if (Disponibilidad != null) {
            requestActualizado.input('Disponibilidad', sql.Bit, Disponibilidad)
            queryActualizada += 'Disponibilidad = @Disponibilidad'
        }
       
        queryActualizada = queryActualizada.trim().replace(/,$/, '')        
        queryActualizada += ' WHERE IdLibro = @IdLibro'        

        const libroActualizado = await requestActualizado.query(queryActualizada)

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


