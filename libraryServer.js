const express = require('express')
const app = express()
const dotenv = require('dotenv')
const routerBooks = require('./routers/librosRouter');
const librosRouter = require('./routers/librosRouter');

dotenv.config();

const HOSTNAME = process.env.HOST_EXPRESS
const PORT = process.env.PORT_EXPRESS

//For the following path, use the following router

app.use('/api/libros', librosRouter)

app.listen(PORT, HOSTNAME, () => {
    console.log(`El servidor esta corriendo en: http://${HOSTNAME}:${PORT}`)
})

app.get('/', (req, res) => {
    res.send("Servidor funcionando")
 })