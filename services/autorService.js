const autorRepository = require('../repositories/AutorRepository');

exports.autorGetAllService = async () => {
    try {
        let resultado = await autorRepository.getAllAutorRepository();

        return resultado;
    } catch (error) {
        console.log('error obteniendo GET ALL autorRepository' + error);
        throw error;
    }
}

exports.autorCreateService = async (autor) => {
    try {

        
        return await autorRepository.createAutorRepository(autor);
    } catch (error) {
        console.log('error obteniendo Create autorRepository' + error);
        throw error;
    }
}