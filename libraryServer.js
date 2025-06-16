const express = require('express')
const app = express()
const HOSTNAME = '127.0.0.1'
const PORT = 3000

const routerUsuario = require('./routers/usuarioRouter.js');


app.use('/usuario', routerUsuario);

app.get('/', (req, res) => {
    res.send("Servidor funcionando")
})


app.listen(PORT, HOSTNAME, () => {
    console.log(`El servidor esta corriendo en: http://${HOSTNAME}:${PORT}`)
})