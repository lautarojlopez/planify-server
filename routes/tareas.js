const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {check} = require('express-validator')
const tareaController = require('../controllers/tareaController')

//Crear tarea
router.post('/', auth, [check('nombre', 'Escribe un nombre').not().isEmpty()], tareaController.crearTarea)
//Obtener tareas de un proyecto
router.get('/', auth, tareaController.obtenerTareas)
//Editar tarea
router.put('/:id', auth, tareaController.editarTarea)
//Eliminar tarea
router.delete('/:id', auth, tareaController.eliminarTarea)

module.exports = router;
