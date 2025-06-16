const express = require('express')
const app = express()
app.use(express.static('src'));
const dotenv = require('dotenv')
const librosRouter = require('./routers/librosRouter');
const fs = require('node:fs')
const HOME = fs.readFileSync('./src/index.html');

dotenv.config();

const HOSTNAME = process.env.HOST_EXPRESS
const PORT = process.env.PORT_EXPRESS

//For the following path, use the following router

app.use('/api/libros', librosRouter)

app.get('/api', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.status(200)
    res.send(HOME)
})

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