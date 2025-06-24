module.exports = {
    getUsuarios: `USE BIBLIOTECA SELECT * FROM usuario`,
    addUsuario: `USE BIBLIOTECA INSERT INTO usuario 
    (NombreUsuario, Correo, Direccion, FechaRegistro)
    OUTPUT INSERTED.*
    VALUES (@NombreUsuario, @Correo, @Direccion, @FechaRegistro);`,
    getUsuarioById: `USE BIBLIOTECA SELECT * FROM Usuario WHERE IdUsuario = @ID`,
    getUsuarioByName: `USE BIBLIOTECA SELECT * FROM Usuario WHERE NombreUsuario LIKE @NombreUsuario`
}