const autorService = require('../services/autorService');

exports.readAutor = async (req,res) =>{

    try {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);

        res.send(await autorService.autorGetAllService());
    } catch (error) {
        console.log("Error en readAutor - " + error)
        res.status(500).send( { code: 500, message: "Error al obtener los autores"})
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
        res.status(500).send({code:500 , message:"Error al crear autor nuevo"});
    }
}
