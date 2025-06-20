const prestamoRepository = require('../repositories/prestamoRepository.js');
const usuarioRepository = require('../repositories/usuario.js');
const libroRepository = require('../repositories/libro.js');
const { withTransaction } = require('../database/transaccion.js');

// TODO: Corregir fechas que No sale la hora

exports.getPrestamos = async (filters = {}) => {
    try {
        const prestamos = await prestamoRepository.getPrestamos(filters);
        if (!prestamos || prestamos.length === 0) {
            throw new Error("Not Found: Prestamos no encontrados");
        }
        return prestamos;
    } catch (error) {
        throw error;
    }
};

exports.createPrestamo = async ({ idUsuario, idLibro }) => {
    try {
        const usuario = await usuarioRepository.findById(idUsuario);
        if (!usuario) {
            throw new Error('Not Found: Usuario no encontrado');
        }

        const libro = await libroRepository.findById(idLibro);
        if (!libro) {
            throw new Error('Not Found: Libro no encontrado');
        }
        if (!libro.Disponibilidad) {
            throw new Error('Conflicto: El libro ya está prestado');
        }

        return await withTransaction(async (transaction) => {
            await libroRepository.updateDisponibilidad(idLibro, false, transaction);
            return await prestamoRepository.savePrestamo({idUsuario, idLibro}, transaction);
        });
    } catch (error) {
        throw error;
    }
};

exports.updateEstadoPrestamo = async (idPrestamo, activo) => {
    try {
        const prestamo = await prestamoRepository.getPrestamoById(idPrestamo);
        if (!prestamo) {
            throw new Error('Not Found: Prestamo no encontrado');
        }
        if (!prestamo.Activo) {
            throw new Error('Conflicto: Solo se puede actualizar el estado de préstamos activos');
        }

        return await withTransaction(async (transaction) => {
            await libroRepository.updateDisponibilidad(prestamo.IdLibro, true, transaction);
            return await prestamoRepository.updatePrestamo(idPrestamo, activo, transaction);
        });
    } catch (error) {
        throw error;
    }
};