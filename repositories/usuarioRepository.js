const sql = require('mssql');
const { getSQLConnection } = require('../database/conexion')
const usuarioQueries = require('../database/queries/usuarioQueries');

/**
 * TRAER TODOS LOS USUARIOS DE LA BBDD
 */
exports.getAllUsuariosRepository = async () => {
    const pool = await getSQLConnection()
    
    try{

        const usuarios = await pool.request().query(usuarioQueries.getUsuarios)

        return usuarios.recordset

    } catch (error) {
        console.log("Error en getAllUsuariosRepository - Repository " + error)
        throw Error("Error en getAllUsuariosRepository - Repository " + error)
    } 
    finally {
        pool.close()
    }

}

/**
 * TRAER UN USUARIO DE LA BBDD, SEGUN SU ID
 */
exports.getUsuarioByIdRepository = async (id) => {
    const pool = await getSQLConnection();

    try {
        const usuarioEncontrado = await pool.request().input('id', sql.Int, id).query(usuarioQueries.getUsuarioById)

        if(usuarioEncontrado.recordset.length == 0){
            console.log("Usuario no encontrado");
        }else{
            console.log("Usuario encontrado");

            return usuarioEncontrado.recordset
        }

    } catch (error) {
        console.log("Error en getUsuarioByIdRepository - Repository " + error)
        throw Error("Error en getUsuarioByIdRepository - Repository " + error)
    }
    finally {
        pool.close()
    }
}

/**
 * TRAER UN USUARIO DE LA BBDD, POR NOMBRE O PARTE DEL NOMBRE
 */
exports.getUsuarioByNameRepository = async (NombreUsuario) => {

    const pool = await getSQLConnection();

    try {

        const usuarioEncontrado = await pool.request().input('NombreUsuario', sql.NVarChar, `%${NombreUsuario}%`).query(usuarioQueries.getUsuarioByName)

        if(usuarioEncontrado.recordset.length == 0){
            console.log("Usuario no encontrado");
        }else{
            console.log("Usuario encontrado");
            return usuarioEncontrado.recordset
        }

    } catch (error) {
        console.log("Error en getUsuarioByNameRepository - Repository " + error)
        throw Error("Error en getUsuarioByNameRepository - Repository " + error)
    }
    finally {
        pool.close()
    }
}

/**
 * CREAR UN NUEVO USUARIO EN LA BBDD
 */
exports.createUsuarioRepository = async (usuario) => {

    const { NombreUsuario, Correo, Direccion, FechaRegistro } = usuario;
    const pool = await getSQLConnection();

    try {

        const usuarioNuevo = await pool.request()
        .input('NombreUsuario', sql.NVarChar, NombreUsuario)
        .input('Correo', sql.NVarChar, Correo)
        .input('Direccion', sql.NVarChar, Direccion)
        .input('FechaRegistro', sql.DateTime, FechaRegistro)
        .query(usuarioQueries.addUsuario)

        return usuarioNuevo.recordset

    } catch (error) {
        console.log("Error en createUsuarioRepository - Repository " + error)
        throw Error("Error en createUsuarioRepository - Repository " + error)
    } 
    finally {
        pool.close()
    }
}

/**
 * ACTUALIZAR UN USUARIO EN LA BBDD, SELECCIONADO POR SU ID
 */
exports.updateUsuarioRepository = async (id, usuario) => {

    const { NombreUsuario, Correo, Direccion, FechaRegistro } = usuario;
    const pool = await getSQLConnection();

    try {

        await pool.request().query('USE BIBLIOTECA')

        let queryActualizada = 'UPDATE Usuario SET ';
        const requestActualizado = pool.request().input('id', sql.Int, id)

        if (NombreUsuario != null) {
            requestActualizado.input('NombreUsuario', sql.NVarChar, NombreUsuario)
            queryActualizada += 'NombreUsuario = @NombreUsuario, '
        }
        if (Correo != null) {
            requestActualizado.input('Correo', sql.NVarChar, Correo)
            queryActualizada += 'Correo = @Correo, '
        }
        if (Direccion != null) {
            requestActualizado.input('Direccion', sql.NVarChar, Direccion)
            queryActualizada += 'Direccion = @Direccion, '
        }
        if (FechaRegistro != null) {
            requestActualizado.input('FechaRegistro', sql.DateTime, FechaRegistro)
            queryActualizada += 'FechaRegistro = @FechaRegistro, '
        }

        queryActualizada = queryActualizada.trim().replace(/,$/, '')

        queryActualizada += ' WHERE IdUsuario = @id'

        const usuarioActualizado = await requestActualizado.query(queryActualizada)

        if (usuarioActualizado.rowsAffected[0] == 0) {
            return null
        }

        return { NombreUsuario, Correo, Direccion, FechaRegistro }

    } catch (error) {
        console.log("Error en updateUsuarioRepository - Repository " + error)
        throw Error("Error en updateUsuarioRepository - Repository " + error)
    } 
    finally {
        pool.close()
    }
}

