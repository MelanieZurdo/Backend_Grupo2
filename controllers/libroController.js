const librosService = require('../services/libroService')

//Obtengo todos los libros - SQL
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

//Obtengo libro por ID - SQL
exports.readBookByID = async (req, res) => {
    try {
        const IdLibro = req.params.IdLibro;

        const booksByID = await librosService.getBooksById(IdLibro)

        if (!booksByID || booksByID.length === 0) {
            res.setHeader('Content-Type', 'text/plain')
            res.status(404)
            res.send(`No existe un libro con el id : ${IdLibro}`)
        }
        else {
            res.setHeader('Content-Type', 'application/json')
            res.status(200)
            res.send(booksByID)
        }
    } catch (error) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(500)
        res.send(`No existe un libro con el id : ${IdLibro}`)
        console.log("Error en readBooksByIdAuthor - Controller " + error)
    }
}

//Creo un nuevo libro - SQL
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

//Modifico disponibilidad del libro mediante su ID - SQL

exports.updateBookAvailability = async (req, res) => {
    try {
        const IdLibro = req.params.IdLibro;
        const libroActualizado = req.body;

        const libros = await librosService.putBookAvailability(IdLibro, libroActualizado)

        if (!libros || libros.length === 0) {
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

//Obtener todos los libros de un autor por (IdAutor) y la informacion del mismo - SQL
exports.readBooksByIdAuthor = async (req, res) => {
    try {
        const IdAutor = req.params.IdAutor;

        const booksByAuthor = await librosService.getBooksByIdAuthor(IdAutor)

        if (!booksByAuthor || booksByAuthor.length === 0) {
            res.setHeader('Content-Type', 'text/plain')
            res.status(404)
            res.send('No se han podido obtener los libros por id del autor y su información')
        }
        else {
            res.setHeader('Content-Type', 'application/json')
            res.status(200)
            res.send(booksByAuthor)
        }
    } catch (error) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(500)
        res.send("No se han podido obtener los libros por id del autor y su información")
        console.log("Error en readBooksByIdAuthor - Controller " + error)
    }
}

//Modifico items de manera opcional de un libro mediante su ID - SQL
exports.updateBookItemById = async (req, res) => {
    try {
        const IdLibro = req.params.IdLibro;
        const libroActualizado = req.body;

        const libroModificado = await librosService.putBookItemById(IdLibro, libroActualizado)

        if (!libroModificado || libroModificado.length === 0) {
            res.setHeader('Content-Type', 'text/plain')
            res.status(404)
            res.send('No se han podido modificar los datos del libro')
        }
        else {
            res.setHeader('Content-Type', 'application/json')
            res.status(200)
            res.send(libroModificado)
        }
    } catch (error) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(500)
        res.send("No se han podido modificar los datos del libro")
        console.log("Error en updateBookById - Controller " + error)
    }
}





