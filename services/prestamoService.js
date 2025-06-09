const prestamoRepository = require('../repositories/prestamoRepository.js');
const usuarioRepository = require('../repositories/usuarioRepository.js');
const libroRepository = require('../repositories/libroRepository.js');


// todo error handling --->
// todo el error handling se tendría que poner en un modulo separado de errores compartido por todo el grupo
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConflictError';
    }
}

const getAllPrestamos = async () => {
    const prestamos = await prestamoRepository.findAll();
    if (!prestamos || prestamos.length === 0) {
        throw new NotFoundError('No se encontraron prestamos');
    }
    return prestamos;
};

const getPrestamosByUsuario = async (idUsuario) => {
    const prestamos = await prestamoRepository.findByUsuario(idUsuario);
    if (!prestamos || prestamos.length === 0) {
        throw new NotFoundError('No se encontraron prestamos para ese usuario');
    }
    return prestamos;
};

const getPrestamosByLibro = async (idLibro) => {
    const prestamos = await prestamoRepository.findByLibro(idLibro);
    if (!prestamos || prestamos.length === 0) {
        throw new NotFoundError('No se encontraron prestamos para ese libro');
    }
    return prestamos;
};

const getPrestamosByEstado = async (activo) => {
    const prestamos = await prestamoRepository.findByEstado(activo);
    if (!prestamos || prestamos.length === 0) {
        throw new NotFoundError('No se encontraron prestamos con ese estado');
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

    const prestamo = await prestamoRepository.save({ idUsuario, idLibro });

    await libroRepository.updateDisponibilidad(idLibro, false);

    return prestamo;
};

const updatePrestamoEstado = async (idPrestamo, activo) => {
    const prestamo = await prestamoRepository.findById(idPrestamo);
    if (!prestamo) {
        throw new NotFoundError('Prestamo no encontrado');
    }

    if (!prestamo.Activo) {
        throw new ConflictError('Solo se puede actualizar el estado de préstamos activos');
    }

    // todo: muy estrictamente esto tendría que ser una transaccion
    // ver si hacerla manual (si la actualización de la disponibilidad del libro falla, revertir el update del prestamo)
    await prestamoRepository.update(idPrestamo, activo);
    await libroRepository.updateDisponibilidad(prestamo.IdLibro, true);

    return { message: 'Estado del prestamo actualizado correctamente' };
};

// todo: agregar que antes de borrar verifique el estado del prestamo
// y si es activo, no se puede borrar (o si pero antes se cambia la disponibilidad del libro??)
const deletePrestamo = async (idPrestamo) => {
    const prestamo = await prestamoRepository.findById(idPrestamo);
    if (!prestamo) {
        throw new NotFoundError('No se encontró el prestamo a eliminar');
    }
    await prestamoRepository.deleteById(idPrestamo);
    return { message: 'Prestamo eliminado correctamente' };
};

module.exports = {
    NotFoundError,
    ConflictError,
    getAllPrestamos,
    getPrestamosByUsuario,
    getPrestamosByLibro,
    getPrestamosByEstado,
    createPrestamo,
    updatePrestamoEstado,
    deletePrestamo
};