let infoBiblioteca = {
    usuarios: [
        {
            id_usuario: 1,
            nombre: "Ana Gómez",
            email: "ana.gomez@example.com",
            contraseña: "123456"
        },
        {
            id_usuario: 2,
            nombre: "Luis Martínez",
            email: "luis.martinez@example.com",
            contraseña: "abcdef"
        },
        {
            id_usuario: 3,
            nombre: "María Torres",
            email: "maria.torres@example.com",
            contraseña: "pass123"
        },
        {
            id_usuario: 4,
            nombre: "Javier López",
            email: "javier.lopez@example.com",
            contraseña: "lopez321"
        },
        {
            id_usuario: 5,
            nombre: "Lucía Pérez",
            email: "lucia.perez@example.com",
            contraseña: "luciapass"
        },
        {
            id_usuario: 6,
            nombre: "Carlos Ruiz",
            email: "carlos.ruiz@example.com",
            contraseña: "ruizpass"
        },
        {
            id_usuario: 7,
            nombre: "Florencia Díaz",
            email: "flor.diaz@example.com",
            contraseña: "flor2024"
        },
        {
            id_usuario: 8,
            nombre: "Matías Romero",
            email: "matias.romero@example.com",
            contraseña: "romero123"
        },
        {
            id_usuario: 9,
            nombre: "Sofía Herrera",
            email: "sofia.herrera@example.com",
            contraseña: "sofia321"
        },
        {
            id_usuario: 10,
            nombre: "Diego Silva",
            email: "diego.silva@example.com",
            contraseña: "silva456"
        }
    ],

    autores: [
        {
            id_autor: 1,
            nombre: "Gabriel García Márquez",
            nacionalidad: "Colombiano",
            fecha_nacimiento: "1927-03-06"
        },
        {
            id_autor: 2,
            nombre: "Miguel de Cervantes",
            nacionalidad: "Español",
            fecha_nacimiento: "1547-09-29"
        },
        {
            id_autor: 3,
            nombre: "George Orwell",
            nacionalidad: "Británico",
            fecha_nacimiento: "1903-06-25"
        },
        {
            id_autor: 4,
            nombre: "Antoine de Saint-Exupéry",
            nacionalidad: "Francés",
            fecha_nacimiento: "1900-06-29"
        },
        {
            id_autor: 5,
            nombre: "Julio Cortázar",
            nacionalidad: "Argentino",
            fecha_nacimiento: "1914-08-26"
        },
        {
            id_autor: 6,
            nombre: "Jane Austen",
            nacionalidad: "Británica",
            fecha_nacimiento: "1775-12-16"
        },
        {
            id_autor: 7,
            nombre: "Ray Bradbury",
            nacionalidad: "Estadounidense",
            fecha_nacimiento: "1920-08-22"
        },
        {
            id_autor: 8,
            nombre: "J. R. R. Tolkien",
            nacionalidad: "Británico",
            fecha_nacimiento: "1892-01-03"
        },
        {
            id_autor: 9,
            nombre: "Suzanne Collins",
            nacionalidad: "Estadounidense",
            fecha_nacimiento: "1962-08-10"
        },
        {
            id_autor: 10,
            nombre: "Isabel Allende",
            nacionalidad: "Chilena",
            fecha_nacimiento: "1942-08-02"
        }
    ],

    libros: [
        {
            id_libro: 1,
            titulo: "Cien años de soledad",
            año_publicacion: 1967,
            genero: "Realismo mágico",
            id_autor: 1
        },
        {
            id_libro: 2,
            titulo: "Don Quijote de la Mancha",
            año_publicacion: 1605,
            genero: "Novela",
            id_autor: 2
        },
        {
            id_libro: 3,
            titulo: "1984",
            año_publicacion: 1949,
            genero: "Distopía",
            id_autor: 3
        },
        {
            id_libro: 4,
            titulo: "El Principito",
            año_publicacion: 1943,
            genero: "Fábula",
            id_autor: 4
        },
        {
            id_libro: 5,
            titulo: "Rayuela",
            año_publicacion: 1963,
            genero: "Ficción",
            id_autor: 5
        },
        {
            id_libro: 6,
            titulo: "Orgullo y Prejuicio",
            año_publicacion: 1813,
            genero: "Romance",
            id_autor: 6
        },
        {
            id_libro: 7,
            titulo: "Crónica de una muerte anunciada",
            año_publicacion: 1981,
            genero: "Novela",
            id_autor: 1
        },
        {
            id_libro: 8,
            titulo: "Fahrenheit 451",
            año_publicacion: 1953,
            genero: "Ciencia ficción",
            id_autor: 7
        },
        {
            id_libro: 9,
            titulo: "El Hobbit",
            año_publicacion: 1937,
            genero: "Fantasía",
            id_autor: 8
        },
        {
            id_libro: 10,
            titulo: "Los juegos del hambre",
            año_publicacion: 2008,
            genero: "Distopía",
            id_autor: 9
        }
    ]
};

module.exports.infoBiblioteca = infoBiblioteca;

//Equivalente
/* module.exports = {
  infoBiblioteca: infoBiblioteca
}; */
