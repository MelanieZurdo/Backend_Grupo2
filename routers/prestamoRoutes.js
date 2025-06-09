const { Router } = require('express');
const controller = require('../controllers/prestamoController.js');

const router = Router();

router.get('/', controller.getAll);
// todo cambiar estos gets a un solo endpoint con query params (varios filtros)
router.get('/usuario/:idUsuario', controller.getByUsuario);
router.get('/libro/:idLibro', controller.getByLibro);
router.get('/activo', controller.getByEstadoPrestamo);
router.post('/', controller.create);
router.put('/:idPrestamo', controller.update);
router.delete('/:idPrestamo', controller.remove);

module.exports = router;
