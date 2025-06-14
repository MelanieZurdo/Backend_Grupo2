const sql = require('mssql');
const { getConnection } = require('../database/conexion.js');

const QUERY_FIND_BY_FILTERS = 'SELECT * FROM Prestamo WHERE 1=1';
const QUERY_FIND_BY_ID = 'SELECT * FROM Prestamo WHERE IdPrestamo = @IdPrestamo';
const QUERY_DELETE = 'DELETE FROM Prestamo WHERE IdPrestamo = @IdPrestamo';
const QUERY_INSERT = `
    INSERT INTO Prestamo (IdUsuario, IdLibro, FechaPrestamo)
    OUTPUT INSERTED.*
    VALUES (@IdUsuario, @IdLibro, GETDATE())
`;
const QUERY_UPDATE = `
    UPDATE Prestamo
    SET Activo = @Activo, FechaDevolucion = GETDATE()
    OUTPUT INSERTED.*
    WHERE IdPrestamo = @IdPrestamo
`;

const findByFilters = async (filters) => {
    let query = QUERY_FIND_BY_FILTERS;
    const params = {};

    if (filters.idUsuario) {
        query += ' AND IdUsuario = @IdUsuario';
        params.IdUsuario = filters.idUsuario;
    }
    if (filters.idLibro) {
        query += ' AND IdLibro = @IdLibro';
        params.IdLibro = filters.idLibro;
    }
    if (filters.activo !== undefined) {
        query += ' AND Activo = @Activo';
        params.Activo = filters.activo;
    }

    const pool = await getConnection();
    let request = pool.request();
    Object.entries(params).forEach(([key, value]) => {
        request = request.input(key, value);
    });

    const result = await request.query(query);
    return result.recordset;
};

const findById = async (idPrestamo) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('IdPrestamo', idPrestamo)
        .query(QUERY_FIND_BY_ID);
    return result.recordset[0];
};

const save = async ({ idUsuario, idLibro }, transaction) => {
    const request = new sql.Request(transaction);
    const insertResult = await request
        .input('IdUsuario', idUsuario)
        .input('IdLibro', idLibro)
        .query(QUERY_INSERT);
    return insertResult.recordset[0];
};

const update = async (idPrestamo, activo, transaction) => {
    const request = new sql.Request(transaction);
    const result = await request
        .input('IdPrestamo', idPrestamo)
        .input('Activo', activo)
        .query(QUERY_UPDATE);
    return result.recordset[0];
};

const deleteById = async (idPrestamo) => {
    const pool = await getConnection();
    await pool
        .request()
        .input('IdPrestamo', idPrestamo)
        .query(QUERY_DELETE);
};

module.exports = {
    findByFilters,
    findById,
    save,
    update,
    deleteById,
};