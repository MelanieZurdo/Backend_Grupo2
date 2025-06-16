const express = require('express')
const app = express()
const HOSTNAME = '127.0.0.1'
const PORT = 3000
const autorRoute = require('./routers/autorRoute')


app.use('/api/autor', autorRoute);

app.get('/', (req, res) => {
    res.send("Servidor funcionando")
 })

app.get('/{*any}', (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.status(404)
    res.send("la ruta a la que quiere ingresar, no existe")
})

app.listen(PORT, HOSTNAME, () => {
    console.log(`El servidor esta corriendo en: http://${HOSTNAME}:${PORT}`)
})