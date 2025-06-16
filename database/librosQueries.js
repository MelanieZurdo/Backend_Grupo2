module.exports = {
    getAllBooks: 'SELECT * FROM BIBLIOTECA.dbo.LIBRO',
    postNewBook: `INSERT INTO BIBLIOTECA.dbo.LIBRO
    (Titulo, IdAutor, FechaPublicacion, Genero, Disponibilidad)
    OUTPUT INSERTED.*
    VALUES(@Titulo,@IdAutor,@FechaPublicacion,@Genero,@Disponibilidad);`,
    putBookAvailability: `UPDATE BIBLIOTECA.dbo.LIBRO
    SET Disponibilidad = @Disponibilidad
    OUTPUT INSERTED.*
    WHERE IdLibro = @IdLibro;`,
}