const Proyecto = require('../models/Proyecto')
const {validationResult} = require('express-validator')

exports.crearProyecto = async (req, res) => {

  //Verificar si hay errores
  const errores = validationResult(req)
  if(!errores.isEmpty()){
    return res.status(400).json({ errores: errores.array() })
  }

  try {
    //Crear proyecto
    const proyecto = new Proyecto(req.body)
    proyecto.usuario = req.usuario.id
    proyecto.save()
    res.json(proyecto)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      msg: "Error al crear proyecto."
    })
  }
}

//Obtener proyectos del usuario autenticado
exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({usuario: req.usuario.id}).sort({timestamp: -1})
    return res.json(proyectos)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: "Hubo un error" })
  }
}

//Editar proyecto
exports.editarProyecto = async (req, res) => {

  //Verificar si hay errores
  const errores = validationResult(req)
  if(!errores.isEmpty()){
    return res.status(400).json({ errores: errores.array() })
  }

  const {nombre} = req.body
  const nuevoProyecto = {}
  if(nombre){
    nuevoProyecto.nombre = nombre
  }

  try {
    //Buscar el proyecto en la base de datos
    let proyecto = await Proyecto.findById(req.params.id)
    //Si el proyecto no existe
    if(!proyecto){
      return res.status(404).json({msg: "El proyecto no existe"})
    }
    //Verificar que sea el usuario que lo creo
    if(proyecto.usuario.toString() !== req.usuario.id){
      return res.status(401).json({msg: "No permitido"})
    }
    //Editar
    proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id}, {$set: nuevoProyecto}, {new: true})
    res.json(proyecto)

  } catch (e) {
    console.log(e)
    res.status(500).json({msg: "Hubo un error"})
  }

}

//Eliminar proyecto
exports.eliminarProyecto = async (req, res) => {
  const proyecto = await Proyecto.findById(req.params.id)
  try {
    if(proyecto.usuario.toString() === req.usuario.id){
      await Proyecto.findOneAndRemove({_id: req.params.id})
      res.json({msg: "Proyecto eliminado"})
    }
    else{
      res.status(401).json({msg: "No permitido"})
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({msg: "Hubo un error"})
  }
}
