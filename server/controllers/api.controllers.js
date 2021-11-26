const { PythonShell } = require('python-shell')
const path = require('path')

const getRankedWikiData = (req, res) => {
  // The query string
  console.log(req.query.q)

  let options = {
    mode: 'json',
    scriptPath: path.join(__dirname, '..', 'python'),
    args: [req.query.q],
  }

  PythonShell.run('script.py', options, function (err, results) {
    if (err) throw err

    res.send(results[0])
  })
}

module.exports = {
  getRankedWikiData,
}
