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

/*exports.getFrontendLanguagesFilteredRepository = (lenguaje, orderBy) => {
    console.log(`REPOSITORY - getFrontendLanguagesFiltered - lenguaje:${lenguaje} - orderBy:${orderBy}`)
    const filtrado = frontend.filter(
        lenguajes => lenguajes.nombre.toLocaleLowerCase() === lenguaje.toLocaleLowerCase()
    )

    console.log("El valor del query param ordenar es:", orderBy)
    //console.log("Los lenguajes filtrados son: ",filtrado)

    if(filtrado.length === 0){
        return []
    }

    if(orderBy === "arriba"){
        return filtrado.sort(
            (a,b) => b.cantidadAlumnos - a.cantidadAlumnos
        )
    }else if (orderBy === "abajo"){
        return filtrado.sort(
            (a,b) => a.cantidadAlumnos - b.cantidadAlumnos
        )
    }else{
        return filtrado
    }
}

exports.createNewFrontendLanguageRepository = async (language) => {
    const { materia_id, nombre, turno_id , comision_id , cantidad_alumnos } = language;
    const pool = await getSQLConnection();

    try {
        console.log(`REPOSITORY  - createNewFrontendLanguage - language:${language}`)

        const resultado = await pool.request()
        .input('materia_id', sql.Int, materia_id)
        .input('nombre', sql.NVarChar, nombre)
        .input('turno_id', sql.Int, turno_id)
        .input('comision_id', sql.Int, comision_id)
        .input('cantidad_alumnos', sql.Int, cantidad_alumnos)
        .query(queries.addLenguaje)

        const lenguajeNuevo = { materia_id, nombre, turno_id , comision_id , cantidad_alumnos }
        console.table(lenguajeNuevo)

        return resultado.recordset
    } catch (error) {
        console.log("createNewFrontendLanguageRepository - " + error)
        throw Error("Error al intentar crear el nuevo lenguaje: - " + error)
    } finally {
        pool.close()
    }
}


exports.updateFrontendLanguageItemRepository = async (id, lenguajeActualizado) => {
    console.log(`REPOSITORY  - updateFrontendLanguageItem - id:${id} - lenguajeActualizado:${JSON.stringify(lenguajeActualizado)}`)

    const { materia_id, nombre, turno_id, comision_id, cantidad_alumnos } = lenguajeActualizado;
    const pool = await getSQLConnection();

    try {

        await pool.request().query('USE IFTS11')

        let queryActualizada = 'UPDATE Lenguajes SET ';
        const requestActualizado = pool.request().input('id', sql.Int, id)
        if (materia_id != null) {
            requestActualizado.input('materia_id', sql.Int, materia_id)
            queryActualizada += 'materia_id = @materia_id, '
        }
        if (nombre != null) {
            requestActualizado.input('nombre', sql.NVarChar, nombre)
            queryActualizada += 'nombre = @nombre, '
        }
        if (turno_id != null) {
            requestActualizado.input('turno_id', sql.Int, turno_id)
            queryActualizada += 'turno_id = @turno_id, '
        }
        if (comision_id != null) {
            requestActualizado.input('comision_id', sql.Int, comision_id)
            queryActualizada += 'comision_id = @comision_id, '
        }
        if (cantidad_alumnos != null) {
            requestActualizado.input('cantidad_alumnos', sql.Int, cantidad_alumnos)
            queryActualizada += 'cantidad_alumnos = @cantidad_alumnos'
        }

        //console.log(queryActualizada)
        queryActualizada = queryActualizada.trim().replace(/,$/, '')
        //console.log(queryActualizada)
        queryActualizada += ' WHERE id = @id'
        //console.log(queryActualizada)

        const lenguajeActualizado = await requestActualizado.query(queryActualizada)

        if (lenguajeActualizado.rowsAffected[0] == 0) {
            return null
        }

        return { materia_id, nombre, turno_id, comision_id, cantidad_alumnos }
    } catch (error) {
        console.log("updateFrontendLanguageItemRepository - " + error)
        throw Error("Error al intentar actualizar el lenguaje: - " + error)
    } finally {
        pool.close()
    }*/
