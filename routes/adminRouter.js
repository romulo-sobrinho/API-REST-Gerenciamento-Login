const express = require('express');
const router = express.Router();
const authContoller = require('../controllers/authController')

router.get('/', authContoller.checkAuth, authContoller.checkType, (req, res) => {
  res.send('Usuário acessou área do admin')
})

module.exports = router