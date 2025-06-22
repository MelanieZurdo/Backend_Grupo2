const libroRepository = require('../repositories/libroRepository')

//Obtengo todos los libros - SQL
exports.getAllBooks = async () => {
    try {
        return await libroRepository.getAllBooksRepository()

    } catch (error) {
        console.log("Error en getAllBooks - Service " + error)
        throw Error("Error en getAllBooks - Service " + error)
    }
}

//Obtengo libro por ID - SQL
exports.getBooksById = async (IdLibro) => {
    try {
        return await libroRepository.getBooksByIdRepository(IdLibro)
    }
    catch (error) {
        console.log("Error en getBooksById - Repository " + error)
        throw Error("Error en getBooksById - Repository " + error)
    }
}

//Creo un nuevo libro - SQL
exports.postNewBook = async (libroNuevo) => {
    try {
        return await libroRepository.postNewBookRepository(libroNuevo)

    } catch (error) {
        console.log("Error en postNewBook - Service " + error)
        throw Error("Error en postNewBook - Service " + error)
    }
}

//Modifico disponibilidad del libro mediante su ID - SQL
exports.putBookAvailability = async (IdLibro, libroActualizado) => {
    try {
        return await libroRepository.putBookAvailabilityRepository(IdLibro, libroActualizado)
    } catch (error) {
        console.log("Error en putBookAvailability - Service " + error)
        throw Error("Error en el service: " + error)
    }
}

//Obtener todos los libros de un autor por (IdAutor) y la informacion del mismo - SQL
exports.getBooksByIdAuthor = async (IdAutor) => {
    try {
        return await libroRepository.getBooksByIdAuthorRepository(IdAutor)
    }
    catch (error) {
        console.log("Error en getBooksByIdAuthor - Repository " + error)
        throw Error("Error en getBooksByIdAuthor - Repository " + error)
    }
}

//Modifico items de manera opcional de un libro mediante su ID - SQL
exports.putBookItemById = async (IdLibro, libroActualizado) => {
    try {
        return await libroRepository.putBookItemsByIdRepository(IdLibro, libroActualizado)
    } catch (error) {
        console.log("Error en putBookById - Service " + error)
        throw Error("Error en el service: " + error)
    }
}
