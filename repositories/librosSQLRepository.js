const { infoBiblioteca } = require('../src/InfoBiblioteca')
const { getSQLConnection } = require('../database/conexion')
const queries = require('../database/librosQueries')
const sql = require('mssql');

//Obtengo todos los libros
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
}

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
            return librosFiltrados
        }

    } catch (error) {
        console.log("Error en getBooksByIdRepository - Repository " + error)
        throw Error("Error en getBooksByIdRepository - Repository " + error)
    }
}

//Creo un nuevo libro

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

        const libroAgregado = { Titulo, IdAutor, FechaPublicacion, Genero, Disponibilidad }
        console.log(libroAgregado)

        return resultado.recordset

    } catch (error) {
        console.log("Error en postNewBookRepository - Repository " + error)
        throw Error("Error en postNewBookRepository - Repository " + error)
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


