# LibroBit

**LibroBit** es un proyecto realizado para la materia **Desarrollo de Sistemas Web (BackEnd)** del IFTS N°11 por Melanie Zurdo, Teresa Fernandez, Arthur Cañari e Irina Ponzi **(Grupo 2)**.

Permite gestionar una biblioteca digital, administrando libros, autores, usuarios y préstamos mediante una API REST.

## Tecnologías utilizadas

- Node.js 20.13.1
- Express.js 5.1.0
- SQL Server 11.0.1

## Pasos para ejecutar localmente el proyecto 

### 1. Clonar el repositorio

```bash
  git clone <https://github.com/MelanieZurdo/Backend_Grupo2.git>
  cd Backend_Grupo2
```

### 2. Instalar dependencias
```bash
  npm install
```

### 3. Configurar el archivo `.env`

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT_EXPRESS = 3000
HOST_EXPRESS = 127.0.0.1
DB_USER=tu_usuario_sql
DB_PASSWORD=tu_contraseña_sql
DB_SERVER=localhost
DB_DATABASE=Biblioteca
PORT=tu_puerto
```

### 4. Configurar la base de datos

1. Ejecutar el script de creación de la base de datos:

```
database/Scripts_Database/Create_Database_Tables_.sql
```

2. Insertar los datos iniciales siguiendo este orden:

    - `autor`
    - `libro`
    - `usuario`
    - `prestamo`

### 5. Iniciar el servidor

```bash
  npm run start
```

## Pruebas de la API

Se pueden realizar pruebas a los endpoints de la API utilizando los archivos de peticiones HTTP incluidos en el proyecto:

```
src/peticiones_test/
```
