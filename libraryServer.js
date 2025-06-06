const express = require('express')
const app = express()
const HOSTNAME = '127.0.0.1'
const PORT = 3000

app.listen(PORT, HOSTNAME, () => {
    console.log(`El servidor esta corriendo en: http://${HOSTNAME}:${PORT}`)
})

app.get('/', (req, res) => {
    res.send("Servidor funcionando")
 })