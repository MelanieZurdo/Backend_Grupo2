// NOTA EQUIPO: Estas son las querys que necesitaría de Libro
// Lo dejo como borrador hasta que se implemente en Libro

const { getConnection } = require('../database/conexion.js');

const QUERY_FIND_BY_ID = 'SELECT * FROM Libro WHERE IdLibro = @IdLibro';
const QUERY_UPDATE_DISPONIBILIDAD = `
    UPDATE Libro
    SET Disponibilidad = @Disponibilidad
    OUTPUT inserted.*
    WHERE IdLibro = @IdLibro
`;

const findById = async (idLibro) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('IdLibro', idLibro)
        .query(QUERY_FIND_BY_ID);
    return result.recordset[0];
};

const updateDisponibilidad = async (idLibro, disponibilidad) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('Disponibilidad', disponibilidad)
        .input('IdLibro', idLibro)
        .query(QUERY_UPDATE_DISPONIBILIDAD);

    return result.recordset[0];
};

module.exports = {
    findById,
    updateDisponibilidad
};