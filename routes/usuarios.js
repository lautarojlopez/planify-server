const express = require('express')
const router = express.Router()
const usuariosController = require('../controllers/usuariosController')
const {check} = require('express-validator')

//Crear usuario
router.post('/',[
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'Ingresa un e-mail válido').isEmail(),
  check('password', 'El password debe tener al menos 6 caracteres.').isLength({ min: 6 })
],usuariosController.crearUsuario)

module.exports = router
