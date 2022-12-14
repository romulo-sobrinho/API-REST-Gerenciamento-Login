const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {registerValidate, loginValidate} = require('./validate')

const userController = {
  register: async function (req, res) {
    const error = registerValidate(req.body)
    if(error) {
      return res.status(400).send(error.message)
    }
    
    const {name, email, password, type, createdAt} = req.body

    const user = {
      name, email, password: bcrypt.hashSync(password), type, createdAt
    }

    const selectedUser = await User.findOne({email})
    if(selectedUser) {
      return res.status(422).json({message: 'E-mail já cadastrado, utilize outro e-mail'})
    }

    try{
      const savedUser = await User.create(user)
      res.status(201).send(savedUser)
    }catch(error){
      res.status(400).send(error)
    }
  },
  login: async function (req, res) {
    const error = loginValidate(req.body)
    if(error) {
      return res.status(400).send(error.message)
    }

    const {email, password} = req.body

    try {
      const chekedUser = await User.findOne({email})
      if(bcrypt.compareSync(password, chekedUser.password)) {
        const token = jwt.sign({_id: chekedUser._id, type: chekedUser.type}, process.env.TOKEN_SECRET)
        res.header('Authorization-token', token)
        res.status(200).send("Usuário logado")
      }else {
        res.status(200).send("Usuário não logado")
      }
    }catch(error) {
      res.status(500).send('E-mail não cadastrado, por favor, cadastre-se para poder realizar o login')
    }
  }
}

module.exports = userController