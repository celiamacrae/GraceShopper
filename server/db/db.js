const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  process.env.DATABASE_URL ||
    `postgres://lyezpzwnddexja:dbc2a524fc53e75351ca4c477f1d43d898cc7af6589c9008d323b6acd08596f5@ec2-174-129-253-53.compute-1.amazonaws.com:5432/d66liuumpc1i8u`,
  {
    logging: false
  }
)
module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
