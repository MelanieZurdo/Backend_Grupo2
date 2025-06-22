const prestamoRepository = require('../repositories/prestamoRepository.js');
const usuarioRepository = require('../repositories/usuarioRepository.js');
const libroRepository = require('../repositories/librosSQLRepository.js');


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
        const usuario = await usuarioRepository.getUsuarioByIdRepository(idUsuario);
        if (!usuario) {
            throw new Error('Not Found: Usuario no encontrado');
        }

        const libro = await libroRepository.getBooksByIdAuthorRepository(idLibro);
        if (!libro) {
            throw new Error('Not Found: Libro no encontrado');
        }
        if (!libro.Disponibilidad) {
            throw new Error('Conflicto: El libro ya está prestado');
        }

        await libroRepository.putBookAvailabilityRepository(idLibro, { Disponibilidad: false });
        return  await prestamoRepository.savePrestamo({ idUsuario, idLibro });

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

        await libroRepository.putBookAvailabilityRepository(prestamo.idLibro, { Disponibilidad: true });
        return await prestamoRepository.updatePrestamo(idPrestamo, activo);

    } catch (error) {
        throw error;
    }
};