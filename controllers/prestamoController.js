const service = require('../services/prestamoService.js');
const { NotFoundError, ConflictError } = require('../services/prestamoService.js');

// TODO: objetos se respuesta aca y en el service ? Dtos ?? Modelos ??
// Seria lindo un DTO con nombre de Libro y de Usuario o algunos datos mas em la respuesta de los prestamos.
// TODO : casteo de parametros es necesario? ver
// TODO: validaciones vale la pena armar un modulo aparte? Distingo entre el 422 y el 400 ??

const getAll = async (req, res) => {
    try {
        const prestamos = await service.getAllPrestamos();
        res.json(prestamos);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Error al obtener los préstamos' });
    }
};

const getByUsuario = async (req, res) => {
    const { idUsuario } = req.params;
    if (!idUsuario || isNaN(Number(idUsuario)) || Number(idUsuario) <= 0) {
        return res.status(400).json({ error: 'Parámetro usuarioId inválido' });
    }

    try {
        const prestamos = await service.getPrestamosByUsuario(idUsuario);
        res.json(prestamos);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Error al obtener préstamos por usuario' });
    }
};

const getByLibro = async (req, res) => {
    const { idLibro } = req.params;
    if (!idLibro || isNaN(Number(idLibro)) || Number(idLibro) <= 0) {
        return res.status(400).json({ error: 'Parámetro libroId inválido' });
    }

    try {
        const prestamos = await service.getPrestamosByLibro(idLibro);
        res.json(prestamos);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Error al obtener préstamos por libro' });
    }
};

const getByEstadoPrestamo = async (req, res) => {
    const { activo } = req.query;
    if (activo !== 'true' && activo !== 'false') {
        return res.status(400).json({ error: 'Parámetro activo inválido' });
    }

    try {
        const prestamos = await service.getPrestamosByEstado(activo);
        res.json(prestamos);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Error al obtener préstamos por estado' });
    }
};

const create = async (req, res) => {
    const { idUsuario, idLibro } = req.body;
    if (!idUsuario || isNaN(Number(idUsuario)) || Number(idUsuario) <= 0) {
        return res.status(400).json({ error: 'Parámetro idUsuario inválido' });
    }
    if (!idLibro || isNaN(Number(idLibro)) || Number(idLibro) <= 0) {
        return res.status(400).json({ error: 'Parámetro idLibro inválido' });
    }

    try {
        const prestamo = await service.createPrestamo({ idUsuario, idLibro });
        res.status(201).json(prestamo);
    } catch (error) {
        if (error instanceof service.NotFoundError) {
            return res.status(404).json({ error: error.message });
        }
        if (error instanceof service.ConflictError) {
            return res.status(409).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Error al crear el préstamo' });
    }
};

// todo: no me convencen muchas cosas de todo el flujo del update - reveer
const update = async (req, res) => {
    const { idPrestamo } = req.params;
    const { activo } = req.body;

    if (!idPrestamo || isNaN(Number(idPrestamo)) || Number(idPrestamo) <= 0) {
        return res.status(400).json({ error: 'Parámetro idPrestamo inválido' });
    }
    if (typeof activo !== 'boolean')  {
        return res.status(400).json({ error: 'Parámetro activo inválido' });
    }

    try {
        const result = await service.updatePrestamoEstado(idPrestamo, activo);
        res.json(result);
    } catch (error) {
        if (error instanceof service.NotFoundError) {
            return res.status(404).json({ error: error.message });
        }
        if (error instanceof service.ConflictError) {
            return res.status(409).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Error al actualizar el préstamo' });
    }
};


const remove = async (req, res) => {
    const { idPrestamo } = req.params;
    if (!idPrestamo || isNaN(Number(idPrestamo)) || Number(idPrestamo) <= 0) {
        return res.status(400).json({ error: 'Parámetro idPrestamo inválido' });
    }

    try {
        const result = await service.deletePrestamo(idPrestamo);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof service.NotFoundError) {
            return res.status(404).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Error al eliminar el préstamo' });
    }
};

module.exports = {
    getAll,
    getByUsuario,
    getByLibro,
    getByEstadoPrestamo,
    create,
    update,
    remove
};