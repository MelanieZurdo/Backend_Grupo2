const prestamoRepository = require('../repositories/prestamoRepository.js');
const usuarioRepository = require('../repositories/usuarioRepository.js');
const libroRepository = require('../repositories/libroRepository.js');


exports.getPrestamosService = async (filters = {}) => {
    try {
        const prestamos = await prestamoRepository.getPrestamosRepository(filters);
        if (!prestamos || prestamos.length === 0) {
            throw new Error("Not Found: Prestamos no encontrados");
        }
        return prestamos;
    } catch (error) {
        console.log("Error en getPrestamosService - Service " + error)
        throw Error("Error en getPrestamosService - Service " + error)
    }
};

exports.createPrestamoService = async ({ IdUsuario, IdLibro }) => {
    try {
        const usuario = await usuarioRepository.getUsuarioByIdRepository(IdUsuario);
        
        if (!usuario) {
            throw new Error('Not Found: Usuario no encontrado');
        }

        const libro = await libroRepository.getBooksByIdRepository(IdLibro);
        
        if (!libro) {
            throw new Error('Not Found: Libro no encontrado');
        }
        if (!libro[0].Disponibilidad) {
            throw new Error('Conflicto: El libro ya está prestado');
            
        }

        await libroRepository.putBookAvailabilityRepository(IdLibro, { Disponibilidad: false });
        return  await prestamoRepository.savePrestamoRepository({ IdUsuario, IdLibro });

    } catch (error) {
        console.log("Error en createPrestamoService - Service " + error)
        throw Error("Error en createPrestamoService - Service " + error)
    }
};

exports.updateEstadoPrestamoService = async (idPrestamo, activo) => {
    try {
        const prestamo = await prestamoRepository.getPrestamoByIdRepository(idPrestamo);
        if (!prestamo) {
            throw new Error('Not Found: Prestamo no encontrado');
        }
        if (!prestamo.Activo) {
            throw new Error('Conflicto: Solo se puede actualizar el estado de préstamos activos');
        }

        await libroRepository.putBookAvailabilityRepository(prestamo.idLibro, { Disponibilidad: true });
        return await prestamoRepository.updatePrestamoRepository(idPrestamo, activo);

    } catch (error) {
        console.log("Error en updateEstadoPrestamoService - Service " + error)
        throw Error("Error en updateEstadoPrestamoService - Service " + error)
    }
};