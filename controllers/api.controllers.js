const { PythonShell } = require('python-shell')
const path = require('path')

const getRankedWikiData = (req, res) => {
  let query_str = req.query.q

  /* TODO: Developer must run Python 3.5.10 version for metapy library to work.
   * Otherwise there will be an error. You might need to add it to your PATH.
   * If you want to use a version of python NOT in your PATH, you should specify it
   * below in options.pythonPath.
   * Metapy Library: https://github.com/meta-toolkit/metapy
   * PythonShell: https://www.npmjs.com/package/python-shell
   */
  let options = {
    mode: 'json',
    scriptPath: path.join(__dirname, '..', 'python'),
    args: ['config.toml', query_str],
    // pythonPath: '/Users/genehorecka/.pyenv/versions/3.5.10/bin/python',
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
