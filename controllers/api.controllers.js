const { PythonShell } = require('python-shell')
const path = require('path')

const getRankedWikiData = (req, res) => {
  let config_toml = 'config.toml'
  let query_str = 'req.query.q'

  let options = {
    mode: 'json',
    scriptPath: path.join(__dirname, '..', 'python'),
    args: [config_toml, query_str],
  }

  PythonShell.run('script.py', options, function (err, results) {
    if (err) throw err

    console.log(results[0])
    res.send(results[0])
  })
}

module.exports = {
  getRankedWikiData,
}
