const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req, res) => {
  //Revisar si hay errores
  const errores = validationResult(req)
  if(!errores.isEmpty()){
    return res.status(400).json({ errores: errores.array() })
  }

  const {email, password} = req.body

  try {
    //Revisar si existe el usuario en la base de datos
    let usuario = await Usuario.findOne({ email })
    //Si no existe
    if(!usuario){
      return res.status(400).json({ msg: "El usuario no existe" })
    }
    //Verificar password
    const passwordCheck = await bcrypt.compare(password, usuario.password)
    //Si es incorrecto
    if(!passwordCheck){
      return res.status(400).json({ msg: "Contraseña incorrecta" })
    }

    //Si son correctos email y password crea JWT
    const payload = {
      usuario: {
        id: usuario.id
      }
    }
    jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 86400 //24hs
    }, (error, token) => {
      if(error){
        throw error
      }else{
        return res.json({ token })
      }
    })

  } catch (e) {
    console.log(e);
  }
}

//Obtener usuario autenticado
exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-password')
    return res.json(usuario)
  } catch (e) {
    return res.status(500).json({msg: "Hubo un error"})
  }
}
