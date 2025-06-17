const usuarioRepository = require('../repositories/usuarioRepository.js')


exports.getAllUsuarios = async () => {

    try {

        return await usuarioRepository.getAllUsuariosRepository()

    } catch (error) {

        console.log("ERROR en el service - getAllUsuarios" + error)
        throw Error("ERROR getAllUsuarios " + error) 
        
    }
}

exports.getUsuarioById = async (id) => {

    try {

        return await usuarioRepository.getUsuarioByIdRepository(id)

    } catch (error) {
    
        console.log("ERROR en el service - getUsuarioById " + error)
        throw Error("ERROR getUsuarioById" + error)

    }
}

exports.getUsuarioByName = async (nombre) => {

    try {
        return await usuarioRepository.getUsuarioByNameRepository(nombre)

    } catch (error) {

        console.log("ERROR en el service - getUsuarioByName " + error)
        throw Error("ERROR getUsuarioByName " + error)

    }
}

exports.createUsuario = async (usuario) => {

    try {

        return await usuarioRepository.createUsuarioRepository(usuario)
        
    } catch (error) {

        console.log("ERROR en el service - createUsuario " + error)
        throw Error("ERROR createUsuario " + error)
        
    }
}

exports.updateUsuario = async (id, usuario) => {

    try {

        return await usuarioRepository.updateUsuarioRepository(id, usuario)

    } catch (error) {

        console.log("ERROR en el service - updateUsuario " + error)
        throw Error("ERROR updateUsuario" + error)

    }
}