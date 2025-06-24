CREATE DATABASE Biblioteca;
GO

USE Biblioteca;
GO

CREATE TABLE Autor (
    IdAutor INT IDENTITY(1,1) PRIMARY KEY,
    NombreAutor NVARCHAR(100) NOT NULL,
    Nacionalidad NVARCHAR(100) NOT NULL,
    FechaNacimiento NVARCHAR(10) NULL
);

CREATE TABLE Usuario (
    IdUsuario INT IDENTITY(1,1) PRIMARY KEY,
    NombreUsuario NVARCHAR(100) NOT NULL,
    Correo NVARCHAR(100) NOT NULL,
    Direccion NVARCHAR(100) NOT NULL,
    FechaRegistro NVARCHAR(10) NULL
);

CREATE TABLE Libro (
    IdLibro INT IDENTITY(1,1) PRIMARY KEY,
    Titulo NVARCHAR(100) NOT NULL,
    IdAutor INT NULL,
    FechaPublicacion NVARCHAR(10) NULL,
    Genero NVARCHAR(100) NOT NULL,
    Disponibilidad BIT NOT NULL DEFAULT 1,
    FOREIGN KEY (IdAutor) REFERENCES Autor(IdAutor) ON DELETE SET NULL
);

CREATE TABLE Prestamo (
    IdPrestamo INT IDENTITY(1,1) PRIMARY KEY,
    IdUsuario INT NOT NULL,
    IdLibro INT NOT NULL,
    FechaPrestamo DATETIME NOT NULL,
    FechaDevolucion DATETIME NULL,
    Activo BIT NOT NULL DEFAULT 1,
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario),
    FOREIGN KEY (IdLibro) REFERENCES Libro(IdLibro)
);
