const express = require('express')
const librosRouter = express.Router()
const librosController = require('../controllers/librosController')


//Middleware de Express
librosRouter.use(express.json())

//Obtengo todos los libros
librosRouter.get('/', librosController.readAllBooks)

//Creo un nuevo libro
librosRouter.post('/', librosController.createNewBook)

//Modifico disponibilidad del libro mediante su ID SQL
librosRouter.put('/disponibilidad/:id_Libro', librosController.updateBookAvailability)

//Obtengo libro por ID
librosRouter.get('/:id_Libro', librosController.readBooksById)



//Modifico un libro
librosRouter.put('/:id_Libro', librosController.updateBook)





module.exports = librosRouter
