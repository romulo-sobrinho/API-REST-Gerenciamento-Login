const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = {
  register: async function (req, res) {
    const {name, email, password, createdAt} = req.body

    if(!name){
      return res.status(400).send('Campo nome está vazio, por favor digite um nome')
    }

    if(!email){
      return res.status(400).send('Campo e-mail está vazio, por favor digite um e-mail')
    }

    if(!password){
      return res.status(400).send('Campo senha está vazio, por favor digite uma senha')
    }

    const user = {
      name, email, password: bcrypt.hashSync(password), createdAt
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
    const {email, password} = req.body

    if(!email){
      return res.status(400).send('Digite o e-mail para logar')
    }
    
    if(!password){
      return res.status(400).send('Digite a senha para logar')
    }

    try {
      const chekedUser = await User.findOne({email})
      if(bcrypt.compareSync(password, chekedUser.password)) {
        const token = jwt.sign({_id: chekedUser._id}, process.env.TOKEN_SECRET)
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