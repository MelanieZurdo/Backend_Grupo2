const sql = require('mssql');
const { getConnection } = require('../database/conexion.js');
const queries = require('../database/prestamoQueries.js');


exports.getPrestamos = async (filters) => {
    const pool = await getConnection();
    let query = queries.getPrestamos;
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

    try {
        let request = pool.request();
        Object.entries(params).forEach(([key, value]) => {
            request = request.input(key, value);
        });

        const result = await request.query(query);
        return result.recordset;
    } catch (error) {
        throw Error(`Error al buscar préstamos: ${error.message}`);
    } finally {
        pool.close()
    }
};

exports.getPrestamoById = async (idPrestamo) => {
    const pool = await getConnection();
    try {
        const result = await pool
            .request()
            .input('IdPrestamo', idPrestamo)
            .query(queries.getPrestamoById);
        return result.recordset[0];
    } catch (error) {
        throw Error(`Error al buscar préstamo por ID: ${error.message}`);
    } finally {
        pool.close();
    }
};

exports.savePrestamo = async ({ idUsuario, idLibro }, transaction) => {
    try {
        const request = new sql.Request(transaction);
        const insertResult = await request
            .input('IdUsuario', idUsuario)
            .input('IdLibro', idLibro)
            .query(queries.savePrestamo);
        return insertResult.recordset[0];
    } catch (error) {
        throw Error(`Error al guardar préstamo: ${error.message}`);
    }
};

exports.updatePrestamo = async (idPrestamo, activo, transaction) => {
    try {
        const request = new sql.Request(transaction);
        const result = await request
            .input('IdPrestamo', idPrestamo)
            .input('Activo', activo)
            .query(queries.updatePrestamo);
        return result.recordset[0];
    } catch (error) {
        throw Error(`Error al actualizar préstamo: ${error.message}`);
    }
};