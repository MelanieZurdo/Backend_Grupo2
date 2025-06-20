module.exports = {
    getPrestamos: 'SELECT * FROM Prestamo WHERE 1=1',
    getPrestamoById: `SELECT * FROM Prestamo WHERE IdPrestamo = @IdPrestamo`,
    savePrestamo:  `INSERT INTO Prestamo (IdUsuario, IdLibro, FechaPrestamo)
                    OUTPUT INSERTED.*
                    VALUES (@IdUsuario, @IdLibro, GETDATE())`,
    updatePrestamo: `UPDATE Prestamo
                    SET Activo = @Activo, FechaDevolucion = GETDATE()
                    OUTPUT INSERTED.*
                    WHERE IdPrestamo = @IdPrestamo`
}