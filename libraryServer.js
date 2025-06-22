const express = require('express')
const app = express()
const HOSTNAME = '127.0.0.1'
const PORT = 3000

const routerUsuario = require('./routers/usuarioRouter.js');


app.use('/api/usuario', routerUsuario);

//borralo
app.get('/api', (req, res) => {
    res.send("Servidor funcionando")
})

//borralo
app.listen(PORT, HOSTNAME, () => {
    console.log(`El servidor esta corriendo en: http://${HOSTNAME}:${PORT}`)
})