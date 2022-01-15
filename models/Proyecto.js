const mongoose = require('mongoose')

const ProyectoSchema = mongoose.Schema({
  nombre:{
    type: String,
    require: true,
    trim: true
  },
  usuario:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  timestamp:{
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Proyecto', ProyectoSchema);
