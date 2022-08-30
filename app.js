require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION_URL).then(db => {
  console.log('Banco de dados conectado')
}).catch(error => {
  console.log('Ocorreu um erro ao conectar ao banco de dados')
})

app.use('/user', userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT: ${process.env.PORT}`);
})