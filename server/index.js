/**
 * Copyright 2017 João Pedro Viana <snider@degiant.com.br>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice
 * shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 */
const mysql = require('mysql2/promise');
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
app.cache.deadline = {};
app.cache.capitais = require('./capitais');

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
app.connection = async (options = { isTransaction: false }) => {

      try {

            const conn = await app.database.getConnection();
            if (options.isTransaction) {
                  await conn.beginTransaction();
            }

            return conn;

      } catch (ex) {
            console.error('Failed to retrieve a pool connection:');
            throw ex;
      }

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
                              'resume': 'Não foi possível obter os dados do CEP informado.'
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
                        'resume': 'Não foi possível obter os dados do CEP informado.'
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
app.model.travel = require('./database/travel');

/**
 * Init middlewares and routes
 */
app.route = express();
app.route.use(express.static('public'));
app.route.use(helmet());
app.route.use(bodyParser.urlencoded({ "extended": false }));
app.route.use(bodyParser.json());
app.route.use('/api', require('./services/index'));
app.route.listen(4000, () => console.log('Listening on the port 4000'));

module.exports = app;