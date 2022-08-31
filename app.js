require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/adminRouter')

mongoose.connect(process.env.MONGO_CONNECTION_URL).then(db => {
  console.log('Banco de dados conectado')
}).catch(error => {
  console.log('Ocorreu um erro ao conectar ao banco de dados')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT: ${process.env.PORT}`);
})