const usuarioService = require('../services/usuarioService.js')

exports.readAllUsuarios = async (req, res) => {
    try {

        console.log("entrando a readAllUsuarios")
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await usuarioService.getAllUsuarios())

    } catch (error) {

        console.log("Error en readAllUsuarios - " + error)
        res.status(500).send( { code: 500, message: "Error al obtener los usuarios"})
    }
}

exports.readUsuarioById = async (req, res) => {
    try {

        const id = req.params.id
        const usuario = await usuarioService.getUsuarioById(id)

        if (usuario.length === 0) {
            return res.status(404).send("no se encuentro el usuario con el id: " + id)
        }
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(usuario)

    } catch (error) {
        
        console.log("Error en readUsuarioById - " + error)
        res.status(500).send({ code: 500, message: "Error al buscar usuario" })
    }
}