const sayHello = (req, res) => {
  console.log('hi')
  res.send('<h2>Server is running.</h2>')
}

module.exports = {
  sayHello,
}
