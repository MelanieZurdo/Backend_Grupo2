const { getConnection } = require('../database/conexion.js');

// Consultas SQL
const QUERY_FIND_ALL = 'SELECT * FROM Prestamo';
const QUERY_FIND_BY_ID = 'SELECT * FROM Prestamo WHERE IdPrestamo = @IdPrestamo';
const QUERY_FIND_BY_USUARIO = 'SELECT * FROM Prestamo WHERE IdUsuario = @IdUsuario';
const QUERY_FIND_BY_LIBRO = 'SELECT * FROM Prestamo WHERE IdLibro = @IdLibro';
const QUERY_FIND_BY_ACTIVO = 'SELECT * FROM Prestamo WHERE Activo = @Activo';
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
const QUERY_DELETE = 'DELETE FROM Prestamo WHERE IdPrestamo = @IdPrestamo';


const findAll = async () => {
    const pool = await getConnection();
    const result = await pool.request().query(QUERY_FIND_ALL);
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

const findByUsuario = async (idUsuario) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('IdUsuario', idUsuario)
        .query(QUERY_FIND_BY_USUARIO);
    return result.recordset;
};

const findByLibro = async (idLibro) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('IdLibro', idLibro)
        .query(QUERY_FIND_BY_LIBRO);
    return result.recordset;
};

const findByEstado = async (activo) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('Activo', activo)
        .query(QUERY_FIND_BY_ACTIVO);
    return result.recordset;
};

const save = async ({ idUsuario, idLibro }) => {
    const pool = await getConnection();
    const insertResult = await pool
        .request()
        .input('IdUsuario', idUsuario)
        .input('IdLibro', idLibro)
        .query(QUERY_INSERT);
    return insertResult.recordset[0];
};

const update = async (idPrestamo, activo) => {
    const pool = await getConnection();
    const result = await pool
        .request()
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
    findAll,
    findById,
    findByUsuario,
    findByLibro,
    findByEstado,
    save,
    update,
    deleteById
};