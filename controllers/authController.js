const jwt = require('jsonwebtoken');

const authContoller = {
  checkAuth: function(req, res, next) {
    const token = req.header('authorization-token');
    if(!token) {
      return res.status(401).send('Usuário sem permissão de acesso para área de administrador');
    }

    try {
      const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
      req.user = userVerified
      next()
    } catch (error) {
      return res.status(401).send('Usuário sem permissão de acesso para área de administrador');
    }
  },

  checkType: function (req, res, next) {
    const type = req.user.type
    if(type === 'admin') {
      next()
    } else {
      return res.status(401).send('Usuário sem permissão de acesso para área de administrador');
    }
  }
}

module.exports = authContoller;