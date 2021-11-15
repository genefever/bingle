const { PythonShell } = require('python-shell')
const path = require('path')

const sayHello = (req, res) => {
  let options = {
    mode: 'text',
    scriptPath: path.join(__dirname, '..', 'python'),
    args: ['Server', ' is', ' running.'],
  }

  PythonShell.run('script.py', options, function (err, results) {
    if (err) throw err

    // results is an array consisting of messages collected during execution
    console.log('results: %j', results)
    res.send(`<h2>${results[0]}</h2>`)
  })
}

module.exports = {
  sayHello,
}
