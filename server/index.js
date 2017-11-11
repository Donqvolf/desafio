const mysql = require('mysql');

app = {};
app.model = {};

/**
 * Load the cache and common used variables
 */
app.cache = {};
app.cache.cep = {};
app.cache.capitais = require('./capitais')

/**
 * Starts a pool mysql connection and set it to the `app.database`
 */
app.database = mysql.createPool({
      connectionLimit: 15,
      host: '127.0.0.1',
      user: 'root',
      password: 'root',
      database: 'mvchallenge',
      charset: 'utf8mb4_unicode_ci'
});

/**
 * This is a helpful function to create and retrieves the created
 *  pool connection from the mysql database. It also allows you to
 *  directly starts a database transaction.
 */
app.connection = ({ isTransaction = false }) => {

      return new Promise((resolve, reason) => {
            return app.database.getConnection((err, connection) => {
                  if (err) {
                        return reason(err);
                  } else {
                        if (!isTransaction) {
                              return resolve(connection);
                        } else {
                              return connection.beginTransaction((failed) => {
                                    if (failed) {
                                          return reason(failed);
                                    } else {
                                          return resolve(connection);
                                    }
                              });
                        }
                  }
            });
      });

};

/**
 * Init models
 */
app.model.main = require('./database/heartbeat');
app.model.zone = require('./database/zone');
app.model.queue = require('./database/queue');

module.exports = app;