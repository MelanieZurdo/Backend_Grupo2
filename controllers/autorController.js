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
        console.log('Request body:', req.body);
        let autor = req.body;
        res.send(await autorService.autorCreateService(autor))
        
    } catch (error) {
        console.log('error creando autor' + error)
        res.status(500).send({code:500 , message:"Error al crear autor nuevo"});
    }
}
