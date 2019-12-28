var CLIEngine = require('eslint').CLIEngine
var { FILES } = require('./files')

console.log('Running ESLint on files...')

var cli = new CLIEngine({
  useEslintrc: true,
})

var report = cli.executeOnFiles(FILES)
var formatter = cli.getFormatter()

console.log(formatter(report.results))
console.log('Finished running ESLint.')
