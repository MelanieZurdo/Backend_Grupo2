module.exports = {
    getUsuarios: `USE BIBLIOTECA SELECT * FROM usuario`,
    addUsuario: `USE BIBLIOTECA INSERT INTO usuario 
    (nombreUsuario, correo, direccion, fechaRegistro)
    VALUES (@nombreUsuario, @correo, @direccion, @fechaRegistro);`,
    getUsuarioById: `USE BIBLIOTECA SELECT * FROM Usuario WHERE IdUsuario = @ID`,
}