module.exports = {
    getAutor: `USE Biblioteca SELECT * from Autor`,
    addAutor: `USE Biblioteca INSERT INTO Autor (NombreAutor, Nacionalidad, FechaNacimiento)
     VALUES (@NombreAutor, @Nacionalidad, @FechaNacimiento);`,

}