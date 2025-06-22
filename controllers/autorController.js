const autorService = require('../services/autorService');

exports.readAutor = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(await autorService.autorGetAllService());
    } catch (error) {
        console.log("Error en readAutor - " + error)
        res.status(500).send({ code: 500, message: "Error al obtener los autores" })
    }
}

exports.createAutor = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ code: 400, message: "El cuerpo de la solicitud está vacío" });
        }
        let autorNuevo = req.body;
        const autorAgregado = await autorService.autorCreateService(autorNuevo);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(autorAgregado);
        //res.send(await autorService.autorCreateService(autor))
    } catch (error) {
        console.log('error creando autor' + error)
        res.status(500).send({ code: 500, message: "Error al crear autor nuevo" });
    }
}

exports.deleteAutor = async (req, res) => {
    try {
        const id = req.params.id;
        const autor = await autorService.autorDeleteService(id);

        if (autor.length === 0) {
            return res.status(404).send("no se encuentra un autor con el id: " + id)
        }
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(autor)
    } catch (error) {
        console.log("Error en deleteAutor - " + error)
        res.status(500).send({ code: 500, message: "Error al eliminar un autor" })
    }

}

exports.updateAutor = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0 ) {
            return res.status(400).send({ code: 400, message: "El cuerpo de la solicitud está vacío" });
        }
        const id = req.params.id;
        const autorActualizado = req.body;
        const requestActualizado = await autorService.autorUpdateService(id, autorActualizado);

        if (requestActualizado.length === 0) {
            return res.status(404).send({code: 400, message:"no se encuentra un autor con el id: " + id})
        }
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(requestActualizado);
    } catch (error) {

        console.log("Error en updateAutor - " + error)
        res.status(500).send({ code: 500, message: "Error al actualizar un autor" })
    }
}
