const express = require('express');
const autorRoute = express.Router();

autorRoute.use(express.json());

const autorController = require('../controllers/autorController')

autorRoute.get('/' , autorController.readAutor)
autorRoute.post('/' , autorController.createAutor)
autorRoute.delete('/:id', autorController.deleteAutor)

module.exports = autorRoute;