const express = require('express')
const librosRouter = express.Router()
const librosController = require('../controllers/librosController')


//Middleware de Express
librosRouter.use(express.json())

//Obtengo todos los libros SQL
librosRouter.get('/', librosController.readAllBooks)

//Creo un nuevo libro SQL
librosRouter.post('/', librosController.createNewBook)

//Modifico disponibilidad del libro mediante su ID SQL
librosRouter.put('/disponibilidad/:IdLibro', librosController.updateBookAvailability)

//Obtener todos los libros de un autor por (IdAutor) y la informacion del mismo.
librosRouter.get('/autor/:IdAutor', librosController.readBooksByIdAuthor)

//Actualizar los datos de un libro por su ID - SQL
librosRouter.put('/:IdLibro', librosController.updateBookAvailability)




module.exports = librosRouter
