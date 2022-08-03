import jwt from "jsonwebtoken";
import config from "../../db.config.js";


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, config.secret, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}


  function generateAccessToken(username) {
    return jwt.sign(username, config.secret, {expiresIn: '1800s'})
  }

  module.exports = {authJwt};