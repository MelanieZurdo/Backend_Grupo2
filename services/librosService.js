const librosRepository = require('../repositories/librosSQLRepository')

//Obtengo todos los libros - SQL
exports.getAllBooks = async () => {
    try {
        return await librosRepository.getAllBooksRepository()

    } catch (error) {
        console.log("Error en getAllBooks - Service " + error)
        throw Error("Error en getAllBooks - Service " + error)
    }
}

//Creo un nuevo libro - SQL
exports.postNewBook = async (libroNuevo) => {
    try {
        return await librosRepository.postNewBookRepository(libroNuevo)

    } catch (error) {
        console.log("Error en postNewBook - Service " + error)
        throw Error("Error en postNewBook - Service " + error)
    }
}

//Modifico disponibilidad del libro mediante su ID - SQL
exports.putBookAvailability = async (IdLibro, libroActualizado) => {
    try {
        return await librosRepository.putBookAvailabilityRepository(IdLibro, libroActualizado)
    } catch (error) {
        console.log("Error en putBookAvailability - Service " + error)
        throw Error("Error en el service: " + error)
    }
}

//Obtener todos los libros de un autor por (IdAutor) y la informacion del mismo - SQL
exports.getBooksByIdAuthor = async (IdAutor) => {
    try {
        return await librosRepository.getBooksByIdAuthorRepository(IdAutor)
    }
    catch (error) {
        console.log("Error en getBooksByIdAuthor - Repository " + error)
        throw Error("Error en getBooksByIdAuthor - Repository " + error)
    }
}

//Actualizar los datos de un libro por su ID - SQL
exports.putBookById = async (IdLibro, libroActualizado) => {
    try {
        return await librosRepository.putBookByIdRepository(IdLibro, libroActualizado)
    } catch (error) {
        console.log("Error en putBookById - Service " + error)
        throw Error("Error en el service: " + error)
    }
}
