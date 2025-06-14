const { Router } = require('express');
const controller = require('../controllers/prestamoController.js');

const router = Router();

router.get('/', controller.read);
router.post('/', controller.create);
router.patch('/:idPrestamo', controller.update);
router.delete('/:idPrestamo', controller.remove);

module.exports = router;
