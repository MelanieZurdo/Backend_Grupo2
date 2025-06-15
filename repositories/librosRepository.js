const { infoBiblioteca } = require('../src/InfoBiblioteca')

//Obtengo todos los libros
exports.getAllBooksRepository = async () => {
    try {
        return await JSON.stringify(infoBiblioteca.libros)

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
    try {
        await infoBiblioteca.libros.push(libroNuevo)
        return JSON.stringify(infoBiblioteca.libros)

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


