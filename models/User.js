const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type: 'string', required: true, minlength: 3, maxlength: 50},
  email: {type: 'string', required: true, maxlength: 100},
  password: {type: 'string', required: true, minlength: 6, maxlength: 200},
  createdAt: {type: Date, required: true, default: Date.now()}
})

const User = mongoose.model('User', userSchema);

module.exports = User;