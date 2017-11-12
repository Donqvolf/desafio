const mysql = require('mysql');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

app = {};
app.model = {};
app.parser = {};

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

app.cep = require('./util/cep');

app.parser.notNull = (value) => {
      return !!value;
}

app.parser.cep = (request, response, nextMiddleware) => {

      return new Promise((resolve, reason) => {

            const { from_cepcode, to_cepcode } = request.params;
            const codes = [from_cepcode, to_cepcode];

            return app.cep(codes).then((result) => {

                  if (result.length != codes.filter(app.parser.notNull).length) {

                        response.status(400).json({
                              'success': false,
                              'code': 40001,
                              'resume': 'Please, be sure that the informed CEP code(s) are valid and exist; and then, try again.'
                        });

                        return resolve();

                  }

                  request.cep = {
                        'from': result[0],
                        'to': result[1]
                  };

                  nextMiddleware();
                  return resolve();

            }).catch((failed) => {

                  response.status(500).json({
                        'success': false,
                        'code': 50001,
                        'resume': 'Please, be sure that the informed CEP code(s) are valid and exist; and then, try again.'
                  });

                  return resolve();

            });

      });

};

/**
 * Init models
 */
app.model.main = require('./database/heartbeat');
app.model.zone = require('./database/zone');
app.model.queue = require('./database/queue');

/**
 * Init middlewares and routes
 */
app.route = express();
app.route.use(helmet());
app.route.use(bodyParser.urlencoded({ "extended": false }));
app.route.use(bodyParser.json());
app.route.use('/api', require('./services/index'));
app.route.listen(4000, () => console.log('Listening on the port 4000'));

module.exports = app;