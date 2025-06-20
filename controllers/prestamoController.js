const service = require('../services/prestamoService.js');

exports.readPreatamos = async (req, res) => {
    const { idUsuario, idLibro, activo } = req.query;
    const filters = {};

    try {
        if (idUsuario !== undefined) {
            filters.idUsuario = idUsuario;
        }
        if (idLibro !== undefined) {
            filters.idLibro = idLibro;
        }
        if (activo !== undefined) {
            filters.activo = activo;
        }

        const prestamos = await service.getPrestamos(filters);
        res.status(200).json(prestamos);

    } catch (error) {
        if (error.message.includes('Not Found')) {
        return res.status(404).json({ error: error.message });
    }
        return res.status(500).json({ error: error.message });
    }
};

exports.createPrestamo = async (req, res) => {
    const { idUsuario, idLibro } = req.body;

    try {
        const prestamo = await service.createPrestamo({ idUsuario, idLibro });
        res.status(201).json(prestamo);

    } catch (error) {
        if (error.message.includes('Not Found')) {
            return res.status(404).json({ error: error.message });
        }
        if (error.message.includes('Conflicto')) {
            return res.status(409).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
    }
};

exports.updatePrestamo = async (req, res) => {
    const { idPrestamo } = req.params;
    const { activo } = req.body;

    try {
        const prestamo = await service.updateEstadoPrestamo(idPrestamo, activo);
        res.status(200).json(prestamo);

    } catch (error) {
        if (error.message.includes('Not Found')) {
            return res.status(404).json({ error: error.message });
        }
        if (error.message.includes('Conflicto')) {
            return res.status(409).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
    }
};