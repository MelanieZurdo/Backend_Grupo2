const prestamoRepository = require('../repositories/prestamoRepository.js');
const usuarioRepository = require('../repositories/usuarioRepository.js');
const libroRepository = require('../repositories/libroRepository.js');
const { withTransaction } = require('../database/transaccion.js');
const { NotFoundError, ConflictError } = require('../utils/errores.js');

// TODO: Corregir fechas que No sale la hora

const getPrestamos = async (filters = {}) => {
    const prestamos = await prestamoRepository.findByFilters(filters);
    if (!prestamos || prestamos.length === 0) {
        throw new NotFoundError('No se encontraron préstamos');
    }

    return prestamos;
};

const createPrestamo = async ({ idUsuario, idLibro }) => {
    const usuario = await usuarioRepository.findById(idUsuario);
    if (!usuario) {
        throw new NotFoundError('Usuario no encontrado');
    }

    const libro = await libroRepository.findById(idLibro);
    if (!libro) {
        throw new NotFoundError('Libro no encontrado');
    }
    if (!libro.Disponibilidad) {
        throw new ConflictError('El libro ya está prestado');
    }

    return await withTransaction(async (transaction) => {
        await libroRepository.updateDisponibilidad(idLibro, false, transaction);
        return await prestamoRepository.save({idUsuario, idLibro}, transaction);
    });
};

const updateEstadoPrestamo = async (idPrestamo, activo) => {
    const prestamo = await prestamoRepository.findById(idPrestamo);
    if (!prestamo) {
        throw new NotFoundError('Préstamo no encontrado');
    }
    if (!prestamo.Activo) {
        throw new ConflictError('Solo se puede actualizar el estado de préstamos activos');
    }

    return await withTransaction(async (transaction) => {
        await libroRepository.updateDisponibilidad(prestamo.IdLibro, true, transaction);
        return await prestamoRepository.update(idPrestamo, activo, transaction);
    });
};

const deletePrestamo = async (idPrestamo) => {
    const prestamo = await prestamoRepository.findById(idPrestamo);
    if (!prestamo) {
        throw new NotFoundError('No se encontró el préstamo a eliminar');
    }
    if (prestamo.Activo) {
        throw new ConflictError('Solo se pueden eliminar préstamos que estén finalizados');
    }

    await prestamoRepository.deleteById(idPrestamo);
    return { message: 'Préstamo eliminado correctamente' };
};

module.exports = {
    getPrestamos,
    createPrestamo,
    updateEstadoPrestamo,
    deletePrestamo
};