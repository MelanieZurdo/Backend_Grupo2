const express = require('express');

const routerUsuario = express.Router();

const usuarioController = require('../controllers/usuarioController.js')


routerUsuario.use(express.json());


routerUsuario.get('/', usuarioController.readAllUsuarios)
routerUsuario.get('/:id', usuarioController.readUsuarioById)
routerUsuario.post('/', usuarioController.createNuevoUsuario)
routerUsuario.put('/:id', usuarioController.updateEditarUsuario)

module.exports = routerUsuario