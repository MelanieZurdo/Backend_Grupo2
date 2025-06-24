const autorRepository = require('../repositories/autorRepository');

exports.autorGetAllService = async () => {
    try {
        let resultado = await autorRepository.getAllAutorRepository();

        return resultado;
    } catch (error) {
        console.log("Error en autorGetAllService - Service " + error)
        throw Error("Error en autorGetAllService - Service " + error)
    }
}

exports.autorCreateService = async (autorNuevo) => {
    try {
        return await autorRepository.createAutorRepository(autorNuevo);
    } catch (error) {
        console.log("Error en autorCreateService - Service " + error)
        throw Error("Error en autorCreateService - Service " + error)
    }
}

exports.autorDeleteService = async (idAutor) => {
    try {
        return await autorRepository.deleteAutorRepository(idAutor);
    } catch (error) {
        console.log("Error en autorDeleteService - Service " + error)
        throw Error("Error en autorDeleteService - Service " + error)
    }
}

exports.autorUpdateService = async (idAutor, autorActualizado) =>{
    try {
        return await autorRepository.updateAutorRepository(idAutor, autorActualizado)
    } catch (error) {
        console.log("Error en autorUpdateService - Service " + error)
        throw Error("Error en autorUpdateService - Service " + error)
    }
}