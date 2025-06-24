module.exports = {
    getAllBooks: 'SELECT * FROM BIBLIOTECA.dbo.LIBRO',
    getBookById: 'SELECT * FROM BIBLIOTECA.dbo.LIBRO WHERE IdLibro = @IdLibro',
    postNewBook: `INSERT INTO BIBLIOTECA.dbo.LIBRO
    (Titulo, IdAutor, FechaPublicacion, Genero, Disponibilidad)
    OUTPUT INSERTED.*
    VALUES(@Titulo,@IdAutor,@FechaPublicacion,@Genero,@Disponibilidad);`,
    putBookAvailability: `UPDATE BIBLIOTECA.dbo.LIBRO
    SET Disponibilidad = @Disponibilidad
    OUTPUT INSERTED.*
    WHERE IdLibro = @IdLibro;`,
    getBooksByIdAuthor:`SELECT 
    L.Titulo,
    L.FechaPublicacion,
    L.Genero,
    L.Disponibilidad,
    A.NombreAutor,
    A.FechaNacimiento,
    A.Nacionalidad
    FROM BIBLIOTECA.dbo.LIBRO L
    inner join Autor A
    on L.IdAutor=A.IdAutor
    where L.IdAutor=@IdAutor`
}