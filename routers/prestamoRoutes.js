const { Router } = require('express');
const controller = require('../controllers/prestamoController.js');

const router = Router();

router.get('/', controller.readPreatamos);
router.post('/', controller.createPrestamo);
router.patch('/:idPrestamo', controller.updatePrestamo);

module.exports = router;
