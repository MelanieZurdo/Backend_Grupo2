const sql = require('mssql');
const { getSQLConnection } = require('../database/conexion')
const prestamoQueries = require('../database/queries/prestamoQueries');


exports.getPrestamosRepository = async (filters) => {
    const pool = await getSQLConnection();
    let query = prestamoQueries.getPrestamos;
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
        console.log("Error en getPrestamosRepository - Repository " + error)
        throw Error("Error en getPrestamosRepository - Repository " + error)
    } finally {
        pool.close()
    }
};

exports.getPrestamoByIdRepository = async (idPrestamo) => {
    const pool = await getSQLConnection();

    try {
        const result = await pool.request()
            .input('IdPrestamo', sql.Int, idPrestamo)
            .query(prestamoQueries.getPrestamoById);
        return result.recordset[0];

    } catch (error) {
        console.log("Error en getPrestamoByIdRepository - Repository " + error)
        throw Error("Error en getPrestamoByIdRepository - Repository " + error)
    } finally {
        pool.close();
    }
};

exports.savePrestamoRepository = async ({ IdUsuario, IdLibro }) => {
    const pool = await getSQLConnection();
    const date = new Date();

    try {
        const result = await pool.request()
            .input('IdUsuario', sql.Int, IdUsuario)
            .input('IdLibro', sql.Int, IdLibro)
            .input('FechaPrestamo', sql.DateTime, date)
            .query(prestamoQueries.savePrestamo);
        return result.recordset[0];

    } catch (error) {
        console.log("Error en savePrestamoRepository - Repository " + error)
        throw Error("Error en savePrestamoRepository - Repository " + error)
    } finally {
        pool.close();
    }
};

exports.updatePrestamoRepository = async (idPrestamo, activo, transaction) => {
    const pool = await getSQLConnection();
    const date = new Date();

    try {
        const result = await pool.request()
            .input('IdPrestamo', sql.Int, idPrestamo)
            .input('Activo', sql.Bit, activo)
            .input('FechaDevolucion', sql.DateTime, date)
            .query(prestamoQueries.updatePrestamo);
        return result.recordset[0];

    } catch (error) {
        console.log("Error en updatePrestamoRepository - Repository " + error)
        throw Error("Error en updatePrestamoRepository - Repository " + error)
    } finally {
        pool.close();
    }
};