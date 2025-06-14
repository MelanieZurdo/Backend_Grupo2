const service = require('../services/prestamoService.js');
const { validarId, validarBooleano } = require('../utils/validaciones.js');
const { BadRequestError, NotFoundError, ConflictError, InternalServerError } = require('../utils/errores.js');

// todo: armar un objeto de respuesta para Prestamo [modelo - dto]

const read = async (req, res) => {
    const { idUsuario, idLibro, activo } = req.query;
    const filters = {};

    try {
        if (idUsuario !== undefined) {
            validarId(idUsuario, 'idUsuario');
            filters.idUsuario = idUsuario;
        }
        if (idLibro !== undefined) {
            validarId(idLibro, 'idLibro');
            filters.idLibro = idLibro;
        }
        if (activo !== undefined) {
            validarBooleano(activo, 'activo');
            filters.activo = activo;
        }

        const prestamos = await service.getPrestamos(filters);
        res.status(200).json(prestamos);

    } catch (error) {
        if (error instanceof BadRequestError) {
            return res.status(400).json({ error: error.message });
        }
        if (error instanceof NotFoundError) {
            return res.status(404).json({ error: error.message });
        }

        return res.status(500).json({ error: new InternalServerError(error.message).message });
    }
};

const create = async (req, res) => {
    const { idUsuario, idLibro } = req.body;

    try {
        validarId(idUsuario, 'idUsuario');
        validarId(idLibro, 'idLibro');

        const prestamo = await service.createPrestamo({ idUsuario, idLibro });
        res.status(201).json(prestamo);

    } catch (error) {
        if (error instanceof BadRequestError) {
            return res.status(400).json({ error: error.message });
        }
        if (error instanceof NotFoundError) {
            return res.status(404).json({ error: error.message });
        }
        if (error instanceof ConflictError) {
            return res.status(409).json({ error: error.message });
        }

        return res.status(500).json({ error: new InternalServerError(error.message).message });
    }
};

// todo: reveer (parámetro "activo" no tiene mucho sentido)
const update = async (req, res) => {
    const { idPrestamo } = req.params;
    const { activo } = req.body;

    try {
        validarId(idPrestamo, 'idPrestamo');
        validarBooleano(activo, 'activo');

        const prestamo = await service.updateEstadoPrestamo(idPrestamo, activo);
        res.status(200).json(prestamo);

    } catch (error) {
        if (error instanceof BadRequestError) {
            return res.status(400).json({ error: error.message });
        }
        if (error instanceof NotFoundError) {
            return res.status(404).json({ error: error.message });
        }
        if (error instanceof ConflictError) {
            return res.status(409).json({ error: error.message });
        }

        return res.status(500).json({ error: new InternalServerError(error.message).message });
    }
};

const remove = async (req, res) => {
    const { idPrestamo } = req.params;

    try {
        validarId(idPrestamo, 'idPrestamo');

        const respuesta = await service.deletePrestamo(idPrestamo);
        res.status(200).json(respuesta);

    } catch (error) {
        if (error instanceof BadRequestError) {
            return res.status(400).json({ error: error.message });
        }
        if (error instanceof NotFoundError) {
            return res.status(404).json({ error: error.message });
        }
        if (error instanceof ConflictError) {
            return res.status(409).json({ error: error.message });
        }

        return res.status(500).json({ error: new InternalServerError(error.message).message });
    }
};

module.exports = {
    read,
    create,
    update,
    remove
};