const usuarioRepository = require('../repositories/usuarioRepository.js')


exports.getAllUsuariosService = async () => {

    try {
        return await usuarioRepository.getAllUsuariosRepository()
    } catch (error) {
        console.log("Error en getAllUsuariosService - Service " + error)
        throw Error("Error en getAllUsuariosService - Service " + error)
    }
}

exports.getUsuarioByIdService = async (id) => {

    try {
        return await usuarioRepository.getUsuarioByIdRepository(id)
    } catch (error) {
        console.log("Error en getUsuarioByIdService - Service " + error)
        throw Error("Error en getUsuarioByIdService - Service " + error)
    }
}

exports.getUsuarioByNameService = async (nombre) => {

    try {
        return await usuarioRepository.getUsuarioByNameRepository(nombre)

    } catch (error) {
        console.log("Error en getUsuarioByNameService - Service " + error)
        throw Error("Error en getUsuarioByNameService - Service " + error)
    }
}

exports.createUsuarioService = async (usuario) => {

    try {
        return await usuarioRepository.createUsuarioRepository(usuario)        
    } catch (error) {
        console.log("Error en createUsuarioService - Service " + error)
        throw Error("Error en createUsuarioService - Service " + error)
    }
}

exports.updateUsuarioService = async (id, usuario) => {

    try {
        return await usuarioRepository.updateUsuarioRepository(id, usuario)
    } catch (error) {
        console.log("Error en updateUsuarioService - Service " + error)
        throw Error("Error en updateUsuarioService - Service " + error)
    }
}