const autorRepository = require('../repositories/autorRepository');

exports.autorGetAllService = async () => {
    try {
        let resultado = await autorRepository.getAllAutorRepository();

        return resultado;
    } catch (error) {
        console.log('error obteniendo GET ALL autorRepository' + error);
        throw error;
    }
}

exports.autorCreateService = async (autorNuevo) => {
    try {
        return await autorRepository.createAutorRepository(autorNuevo);
    } catch (error) {
        console.log('error usando autorCreateService' + error);
        throw error;
    }
}

exports.autorDeleteService = async (idAutor) => {
    try {
        return await autorRepository.deleteAutorRepository(idAutor);
    } catch (error) {
        console.log('Error usando autorDeleteService' + error);
    }
}

exports.autorUpdateService = async (idAutor, autorActualizado) =>{
    try {
        return await autorRepository.updateAutorRepository(idAutor, autorActualizado)
    } catch (error) {

        console.log("Error en autorUpdateService  - " + error)
        throw Error("Error en el service: " + error)
    }
}