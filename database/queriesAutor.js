module.exports = {
    getAutor: `USE Biblioteca SELECT * from Autor`,
    addAutor: `USE Biblioteca INSERT INTO Autor (NombreAutor, Nacionalidad, FechaNacimiento)
     VALUES (@NombreAutor, @Nacionalidad, @FechaNacimiento);`,

    getAutorById : `USE Biblioteca select * from Autor where idAutor = @idAutor`,
    deleteAutorById : `USE Biblioteca delete from Autor where idAutor=@idAutor`

}