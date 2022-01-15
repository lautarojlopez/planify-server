const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token')

  if(!token){
    res.status(401).json({ msg: "Permiso no válido" })
  }

  try {
    const cifrado = jwt.verify(token, process.env.SECRET_KEY)
    req.usuario = cifrado.usuario
    next()
  } catch (e) {
    res.status(401).json({ msg: "Token no válido" })
  }
}
