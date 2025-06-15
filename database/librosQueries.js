module.exports = {
    getAllBooks: 'SELECT * FROM BIBLIOTECA.dbo.LIBRO',
    postNewBook: `INSERT INTO BIBLIOTECA.dbo.LIBRO
    (Titulo, IdAutor, FechaPublicacion, Genero, Disponibilidad)
    VALUES(@Titulo,@IdAutor,@FechaPublicacion,@Genero,@Disponibilidad);`,

}