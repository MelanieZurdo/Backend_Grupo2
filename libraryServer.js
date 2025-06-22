const express = require('express');
const app = express();
const dotenv = require('dotenv')
const librosRouter = require('./routers/librosRouter');
const autorRoute = require('./routers/autorRoute');
const routerUsuario = require('./routers/usuarioRouter.js');
const prestamoRoutes = require('./routers/prestamoRoutes.js');

app.use(express.json());
dotenv.config();

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

app.use('/api/libros', librosRouter);
app.use('/api/autor', autorRoute);
app.use('/api/usuario', routerUsuario);
app.use('/api/prestamos', prestamoRoutes);

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