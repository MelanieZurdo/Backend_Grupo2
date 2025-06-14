const { BadRequestError } = require("./errores");

const validarId = (id, idNombre) => {
    if (!id || isNaN(id) || id <= 0) {
        throw new BadRequestError(idNombre);
    }
};

const validarBooleano = (valorBooleano, nombreBooleano) => {
    if (typeof valorBooleano !== 'boolean' && valorBooleano !== 'true' && valorBooleano !== 'false') {
        throw new BadRequestError(nombreBooleano);
    }
};

module.exports = {
    validarId,
    validarBooleano
};