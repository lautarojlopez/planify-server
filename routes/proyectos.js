const express = require('express')
const router = express.Router()
const proyectoController = require('../controllers/proyectoController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')

//Crear nuevo proyecto
router.post('/', auth, [ check('nombre', "Escribe un nombre").not().isEmpty() ],proyectoController.crearProyecto)
//Obtener proyectos del usuario
router.get('/', auth, proyectoController.obtenerProyectos)
//Editar proyecto
router.put('/:id', auth, [ check('nombre', "Escribe un nombre").not().isEmpty() ],proyectoController.editarProyecto)
//Eliminar proyecto
router.delete('/:id', auth,proyectoController.eliminarProyecto)

module.exports = router;
