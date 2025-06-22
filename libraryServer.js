const express = require('express');
const app = express();
const dotenv = require('dotenv')
const libroRouter = require('./routers/libroRouter');
const autorRouter = require('./routers/autorRouter');
const usuarioRouter = require('./routers/usuarioRouter.js');
const prestamoRouter = require('./routers/prestamoRouter.js');

app.use(express.json());
dotenv.config();

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

app.use('/api/libros', libroRouter);
app.use('/api/autor', autorRouter);
app.use('/api/usuario', usuarioRouter);
app.use('/api/prestamos', prestamoRouter);

app.listen(PORT, HOSTNAME, () => {
    console.log(`El servidor esta corriendo en: http://${HOSTNAME}:${PORT}/api`)
})

app.get('/{*any}', (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.status(404)
    res.send("La ruta ingresada no es valida")
})

app.put('/{*any}', (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.status(404)
    res.send("La ruta ingresada no es valida")
})

app.post('/{*any}', (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.status(404)
    res.send("La ruta ingresada no es valida")
})

app.delete('/{*any}', (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.status(404)
    res.send("La ruta ingresada no es valida")
})