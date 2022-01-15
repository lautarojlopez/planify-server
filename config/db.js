const mongoose = require('mongoose')
require('dotenv').config({
  path: '.env'
})

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO)
  } catch (e) {
    console.log(e);
    process.exit(1) //Detener aplicación
  }
}

module.exports = connectDB
