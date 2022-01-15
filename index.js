const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

//Servidor
const app = express()
//Conectar database
connectDB()
//Habilitar CORS
app.use(cors())
//Express.json
app.use(express.json({ extended: true }))
//Puerto
const port = process.env.PORT || 4000
//Rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))

app.listen(port, '0.0.0.0', () => {
})
