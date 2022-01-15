const mongoose = require('mongoose')

const TareaSchema = mongoose.Schema({
  nombre:{
    type: String,
    require: true,
    trim: true
  },
  estado:{
    type: Boolean,
    default: false
  },
  proyecto:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proyecto'
  },
  timestamp:{
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Tarea', TareaSchema);
