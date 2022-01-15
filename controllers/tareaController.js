const Tarea = require('../models/Tarea')
const Proyecto = require('../models/Proyecto')
const {validationResult} = require('express-validator')

exports.crearTarea = async (req, res) => {

  //Verificar si hay errores
  const errores = validationResult(req)
  if(!errores.isEmpty()){
    return res.status(400).json({ errores: errores.array() })
  }

  try {
    const {proyecto} = req.body
    const _proyecto = await Proyecto.findById(proyecto)

    //Si el proyecto no existe
    if(!_proyecto){
      return res.status(404).json({msg: "El proyecto no existe"})
    }
    //Si no es el usuario que lo creo
    if(_proyecto.usuario.toString() !== req.usuario.id){
      return res.status(401).json({msg: "No autorizado"})
    }

    //Crear y guardar tarea
    const tarea = new Tarea(req.body)
    await tarea.save()

    res.json(tarea)

  } catch (e) {
    console.log(e)
    res.status(500).json({msg: "Hubo un error"})
  }
}

//Obtener tareas de un proyecto
exports.obtenerTareas = async (req, res) => {
  try {
    const {proyecto} = req.query
    const _proyecto = await Proyecto.findById(proyecto)

    //Si el proyecto no existe
    if(!_proyecto){
      return res.status(404).json({msg: "El proyecto no existe"})
    }
    //Si no es el usuario que lo creo
    if(_proyecto.usuario.toString() !== req.usuario.id){
      return res.status(401).json({msg: "No autorizado"})
    }

    //Buscar tareas
    const tareas = await Tarea.find({proyecto})
    res.json({tareas})

  } catch (e) {
    console.log(e)
    res.status(500).json({msg: "Hubo un error"})
  }

}

//Editar tarea
exports.editarTarea = async (req, res) => {
  try {
    const {proyecto, nombre, estado} = req.body
    const _proyecto = await Proyecto.findById(proyecto)

    //Verificar si existe la tarea
    let tarea = await Tarea.findById(req.params.id)
    if(!tarea){
      return res.status(404).json({msg: "La tarea no existe"})
    }
    //Si no es el usuario que lo creo
    if(_proyecto.usuario.toString() !== req.usuario.id){
      return res.status(401).json({msg: "No autorizado"})
    }

    //Crear tarea nueva con los datos editados
    const tareaEditada = {}
    tareaEditada.nombre = nombre
    tareaEditada.estado = estado

    //Editar y guardar
    tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, tareaEditada, {new: true})

    res.json(tarea)

  } catch (e) {
    console.log(e)
    res.status(500).json({msg: "Hubo un error"})
  }
}

//Eliminar tarea
exports.eliminarTarea = async (req, res) => {
  try {
    const {proyecto} = req.query
    const _proyecto = await Proyecto.findById(proyecto)

    //Verificar si existe la tarea
    let tarea = await Tarea.findById(req.params.id)
    if(!tarea){
      return res.status(404).json({msg: "La tarea no existe"})
    }
    //Si no es el usuario que lo creo
    if(_proyecto.usuario.toString() !== req.usuario.id){
      return res.status(401).json({msg: "No autorizado"})
    }

    //Elimina la tarea
    await tarea.remove()
    res.json({msg: "Tarea eliminada"})

  } catch (e) {
    console.log(e)
    res.status(500).json({msg: "Hubo un error"})
  }
}
