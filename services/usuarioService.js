const usuarioRepository = require('../repositories/usuarioRepository.js')

exports.getAllUsuarios = async () => {
    try {
        console.log("SERVICE - getAllUsuarios ")
        return await usuarioRepository.getAllUsuariosRepository()
    } catch (error) {
        console.log("Error en getAllUsuarios - " + error)
        throw Error("Error en getAllUsuarios - " + error) 
    }
}

exports.getUsuarioById = async (id) => {
    try {
        console.log(`SERVICE - getUsuarioById - id:${id}`)
        return await usuarioRepository.getUsuarioByIdRepository(id)
    } catch (error) {
        console.log("Error en getUsuarioByIdRepository  - " + error)
        throw Error("Error en el service: " + error)
    }
}