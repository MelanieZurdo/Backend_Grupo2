const express = require("express");
const prestamoRouter = express.Router()
const controller = require('../controllers/prestamoController.js');

prestamoRouter.use(express.json());

prestamoRouter.get('/', controller.readPreatamos);
prestamoRouter.post('/', controller.createPrestamo);
prestamoRouter.patch('/:idPrestamo', controller.updatePrestamo);

module.exports = prestamoRouter;