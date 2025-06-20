// NOTA EQUIPO: Estas son las querys que necesitaría de Usuario
// Lo dejo como borrador hasta que se implemente en Libro

const { getConnection } = require('../database/conexion.js');

const QUERY_FIND_BY_ID = 'SELECT * FROM Usuario WHERE IdUsuario = @IdUsuario';

const findById = async (idUsuario) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('IdUsuario', idUsuario)
        .query(QUERY_FIND_BY_ID);
    return result.recordset[0];
};

module.exports = {
    findById
};