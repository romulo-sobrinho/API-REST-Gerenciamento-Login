const userController = {
  register: function (req, res) {
    console.log('Register')
    res.send("Register")
  },
  login: function (req, res) {
    console.log('Login')
    res.send("Login")
  }
}

module.exports = userController