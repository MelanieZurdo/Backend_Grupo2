const express = require('express')
const librosRouter = express.Router()
const libroController = require('../controllers/libroController')


//Middleware de Express
librosRouter.use(express.json())

//Obtengo todos los libros - SQL
librosRouter.get('/', libroController.readAllBooks)

//Creo un nuevo libro - SQL
librosRouter.post('/', libroController.createNewBook)

//Modifico disponibilidad del libro mediante su ID - SQL
librosRouter.put('/disponibilidad/:IdLibro', libroController.updateBookAvailability)

//Obtener todos los libros de un autor por (IdAutor) y la informacion del mismo - SQL
librosRouter.get('/autor/:IdAutor', libroController.readBooksByIdAuthor)

//Modifico items de manera opcional de un libro mediante su ID - SQL
librosRouter.patch('/:IdLibro', libroController.updateBookItemById)




module.exports = librosRouter
