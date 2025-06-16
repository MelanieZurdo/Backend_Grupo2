const librosService = require('../services/librosService')

//Obtengo todos los libros SQL
exports.readAllBooks = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await librosService.getAllBooks())

    } catch (error) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(500)
        res.send("No se han podido obtener los libros")
        console.log("Error en readAllBooks - Controller " + error)
    }
}

//Creo un nuevo libro SQL
exports.createNewBook = async (req, res) => {
    try {
        let libroNuevo = req.body
        const libroAgregado = await librosService.postNewBook(libroNuevo)
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(libroAgregado)

    } catch (error) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(500)
        res.send("No se ha podido agregar el libro")
        console.log("Error en createNewBook - Controller " + error)
    }
}

//Modifico disponibilidad del libro mediante su ID SQL

exports.updateBookAvailability = async (req, res) => {
    try {
        const IdLibro = req.params.id_Libro;
        const libroActualizado = req.body;

        const libros = await librosService.putBookAvailability(IdLibro, libroActualizado)

        if (libros.length === 0) {
            res.setHeader('Content-Type', 'text/plain')
            res.status(404)
            res.send('No se ha podido modificar la disponibilidad del libro')
        }
        else {
            res.setHeader('Content-Type', 'application/json')
            res.status(200)
            res.send(libros)
        }
    } catch (error) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(500)
        res.send("No se ha podido modificar la disponibilidad del libro")
        console.log("Error en updateputBookAvailability - Controller " + error)
    }
}

//Obtengo libro por ID SQL
exports.readBooksById = async (req, res) => {
    try {
        const id_librosolicitado = req.params.id_Libro

        const librosById = await librosService.getBooksById(id_librosolicitado)

        if (librosById.length === 0) {
            res.setHeader('Content-Type', 'text/plain')
            res.status(404)
            res.send('No existe un libro con ese ID')
        }
        else {
            res.setHeader('Content-Type', 'application/json')
            res.status(200)
            res.send(librosById)
        }

    } catch (error) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(500)
        res.send("No se han podido obtener el libro por ID")
        console.log("Error en readBooksById - Controller " + error)
    }
}



//Modifico toda la informacion del libro por ID SQL
exports.updateBook = async (req, res) => {
    try {
        const id_libroAModificar = req.params.id_Libro
        const libroNuevo = req.body
        const libroModificado = await librosService.putBook(id_libroAModificar, libroNuevo)

        if (libroModificado.length == 0) {
            res.setHeader('Content-Type', 'text/plain')
            res.status(404)
            res.send('No existe un libro con ese ID a modificar')

        }
        else {
            res.setHeader('Content-Type', 'application/json')
            res.status(200)
            res.send(libroModificado)

        }

    } catch (error) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(500)
        res.send("No se ha podido modificar el libro")
        console.log("Error en updateBook - Controller " + error)
    }
}





