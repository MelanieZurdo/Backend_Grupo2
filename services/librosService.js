const librosRepository = require('../repositories/librosSQLRepository')

//Obtengo todos los libros SQL
exports.getAllBooks = async () => {
    try {
        return await librosRepository.getAllBooksRepository()

    } catch (error) {
        console.log("Error en getAllBooks - Service " + error)
        throw Error("Error en getAllBooks - Service " + error)
    }
}

//Creo un nuevo libro SQL
exports.postNewBook = async (libroNuevo) => {
    try {
        return await librosRepository.postNewBookRepository(libroNuevo)

    } catch (error) {
        console.log("Error en postNewBook - Service " + error)
        throw Error("Error en postNewBook - Service " + error)
    }
}

//Modifico disponibilidad del libro mediante su ID SQL
exports.putBookAvailability = async (IdLibro, libroActualizado) => {
    try {        
        return await librosRepository.putBookAvailabilityRepository(IdLibro, libroActualizado)
    } catch (error) {
        console.log("Error en putBookAvailability - Service " + error)
        throw Error("Error en el service: " + error)
    }
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//No SQL aún

//Obtengo libro por ID
exports.getBooksById = async (id_librosolicitado) => {
    try {
        return await librosRepository.getBooksByIdRepository(id_librosolicitado)

    } catch (error) {
        console.log("Error en getBooksById - Service " + error)
        throw Error("Error en getBooksById - Service " + error)
    }
}

//Modifico un libro por id
exports.putBook = async (id_libroAModificar, libroNuevo) => {
    try {
        return await librosRepository.putBookRepository(id_libroAModificar, libroNuevo)

    } catch (error) {
        console.log("Error en putBook - Service " + error)
        throw Error("Error en putBook - Service " + error)
    }
}

