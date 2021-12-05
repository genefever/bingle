const { PythonShell } = require('python-shell')
const path = require('path')

const getRankedWikiData = (req, res) => {
  let query_str = req.query.q

  // TODO remove pythonPath on deployment.
  // TODO For testing locally, change the pythonPath to the path of your python 3.5.10 verion.
  let options = {
    mode: 'json',
    scriptPath: path.join(__dirname, '..', 'python'),
    args: ['config.toml', query_str],
    pythonPath: '/Users/genehorecka/.pyenv/versions/3.5.10/bin/python',
  }

  PythonShell.run('searchWiki.py', options, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(404).send({
        message: 'No results found.',
      })
    }

    // console.log(results[0])
    res.send(results[0])
  })
}

module.exports = {
  getRankedWikiData,
}
