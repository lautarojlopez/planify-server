const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.crearUsuario = async (req, res) => {
    try {

      const errores = validationResult(req)
      if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() })
      }
      const {email, password} = req.body

      let usuario = await Usuario.findOne({ email })
      //Si ya existe un usuario con ese email
      if(usuario){
        return res.status(400).json({ msg: "Ya existe un usuario con ese e-mail." })
      }
      else{
        usuario = new Usuario(req.body)
        const salt = await bcrypt.genSalt(10)
        usuario.password = await bcrypt.hash(password, salt)
        await usuario.save()
        //JWT
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
      }

    } catch (e) {
      console.log(e)
      return res.status(400).send('Error al guardar usuario.')
    }
}
