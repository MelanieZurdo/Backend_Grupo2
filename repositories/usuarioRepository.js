const queries = require('../database/queriesUsuarios')
const { getConnection } = require('../database/conexion')
const sql = require('mssql');

/**
 * Traer todos los usuarios
 */
exports.getAllUsuariosRepository = async () => {
    const pool = await getConnection()
    
    try{
        const resultado = await pool.request().query(queries.getUsuarios)
        console.table(resultado.recordset)

        return resultado.recordset
    } catch (error) {
        console.log("Error en getAllUsuarios - " + error)
        throw Error("Error en getAllUsuarios - " + error) 
    } finally {
        pool.close()
    }

}

/**
 * Traer un usuario pasando su ID
 */
exports.getUsuarioByIdRepository = async (id) => {//buscar por ID
    const pool = await getConnection();

    try {
        console.log(`REPOSITORY  - getUsuarioById - id:${id}`)
        const usuarioEncontrado = await pool.request().input('id', sql.Int, id).query(queries.getUsuarioById)

        if(usuarioEncontrado.recordset.length == 0){
            console.log("Usuario no encontrado");
        }else{
            console.log("Usuario encontrado");
            console.table(usuarioEncontrado.recordset)
            
            return usuarioEncontrado.recordset
        }

    } catch (error) {
        console.log("getUsuarioById  " + error)
        throw Error("Error al intentar encontrar usuario: - " + error)
    } finally {
        pool.close()
    }
}

exports.createUsuarioRepository = async (usuario) => {
    const { NombreUsuario, Correo, Direccion, FechaRegistro } = usuario;
    const pool = await getConnection();

    try {

        const usuarioNuevo = await pool.request()
        .input('NombreUsuario', sql.NVarChar, NombreUsuario)
        .input('Correo', sql.NVarChar, Correo)
        .input('Direccion', sql.NVarChar, Direccion)
        .input('FechaRegistro', sql.Date, FechaRegistro)
        .query(queries.addUsuario)

        const nuevousuario = { NombreUsuario, Correo, Direccion, FechaRegistro   }
        console.table(nuevousuario)

        return usuarioNuevo.recordset
    } catch (error) {
        console.log("createNewFrontendLanguageRepository - " + error)
        throw Error("Error al intentar crear el nuevo lenguaje: - " + error)
    } finally {
        pool.close()
    }
}

exports.updateUsuarioRepository = async (id, usuarioEditado) => {

    const { NombreUsuario, Correo, Direccion, FechaRegistro } = usuarioEditado;
    const pool = await getConnection();

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
            requestActualizado.input('FechaRegistro', sql.Date, FechaRegistro)
            queryActualizada += 'FechaRegistro = @FechaRegistro, '
        }

        //console.log(queryActualizada)
        queryActualizada = queryActualizada.trim().replace(/,$/, '')
        //console.log(queryActualizada)
        queryActualizada += ' WHERE IdUsuario = @id'
        //console.log(queryActualizada)

        const usuarioActualizado = await requestActualizado.query(queryActualizada)

        if (usuarioActualizado.rowsAffected[0] == 0) {
            return null
        }

        return { NombreUsuario, Correo, Direccion, FechaRegistro }
    } catch (error) {
        console.log("updateFrontendLanguageItemRepository - " + error)
        throw Error("Error al intentar actualizar el lenguaje: - " + error)
    } finally {
        pool.close()
    }
}

