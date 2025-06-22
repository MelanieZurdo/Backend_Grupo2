const usuarioService = require('../services/usuarioService.js')


exports.readAllUsuarios = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await usuarioService.getAllUsuarios())

    } catch (error) {

        console.log("ERROR en readAllUsuarios " + error)
        res.status(500).send( { code: 500, message: "ERROR al obtener los usuarios - readAllUsuarios"})
    }
}

exports.readUsuarioById = async (req, res) => {
    try {

        const id = req.params.id
        const usuario = await usuarioService.getUsuarioById(id)

        if (usuario.length === 0) {
            return res.status(404).send("No se encontro un usuario con el ID: " + id)
        }
        else{
            res.setHeader('Content-Type', 'application/json')
            res.status(200)
            res.send(usuario)
        }
        
    } catch (error) {
        
        console.log("ERROR en readUsuarioById " + error)
        res.status(500).send({ code: 500, message: "ERROR al buscar usuario - readUsuarioById" })
    }
}

exports.readUsuarioByName = async (req, res) => {
    try {

        const {nombre} = req.params
        const usuario = await usuarioService.getUsuarioByName(nombre)

        if (usuario.length == 0) {
            return res.status(404).send("No se encontro un usuario con el nombre: " + nombre)
        }
        else{
            res.setHeader('Content-Type', 'application/json')
            res.status(200)
            res.send(usuario)
        }
        
    } catch (error) {
        
        console.log("ERROR en readUsuarioByName " + error)
        res.status(500).send({ code: 500, message: "ERROR al buscar usuario - readUsuarioByName" })
    }
}

exports.createNuevoUsuario = async (req, res) => {
    try {

        let usuarioNuevo = req.body;
        res.send(await usuarioService.createUsuario(usuarioNuevo))

    } catch (error) {

        console.log("ERROR en createNuevoUsuario " + error)
        res.status(500).send( { code: 500, message: "ERROR al agregar el lenguaje de frontend - createNuevoUsuario"})
    }

}

exports.updateEditarUsuario = async (req, res) => {
    try {

        const usuarioEditado = req.body;
        const id = req.params.id;

        const usuario = await usuarioService.updateUsuario(id, usuarioEditado)

        if (usuario.length === 0) {
            return res.status(404).send("No se encontro un usuario con el ID: " + id)
        }

        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(usuario)

    } catch (error) {
        console.log("ERROR en updateEditarUsuario " + error)
        res.status(500).send({ code: 500, message: "ERROR al intentar editar a un usuario - updateEditarUsuario" })
    }
}