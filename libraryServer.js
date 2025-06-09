const express = require('express')
const prestamoRoutes = require('./routers/prestamoRoutes.js');

const app = express()
const HOSTNAME = '127.0.0.1'
const PORT = 3000

app.use(express.json());
app.use('/prestamos', prestamoRoutes);

app.listen(PORT, HOSTNAME, () => {
    console.log(`El servidor esta corriendo en: http://${HOSTNAME}:${PORT}`)
})

app.get('/', (req, res) => {
    res.send("Servidor funcionando")
 })