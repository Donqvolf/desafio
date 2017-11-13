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

const request = require('axios');
const util = require('util');

/**
 * Prepare the URL with the filter to then sent it to the "Melhor Envio" API.
 *
 * @@@@
 * @@ Não haviam instructions sobre como obter o "prazo" de entrega, de forma correta,
 * @@ então a melhor iniciativa aparente foi utilizar o mesmo padrão regente no Melhor Envio,
 * @@ através de sua API disponível em www.melhorenvio.com.br, obtida através do inspecionamento
 * @@ de elementos do site do Melhor Envio, através das ferramentas de desenvolvimento do Google Chrome.
 * @@@@
 */
const formatURL = ({ from, to, height, width, weight, length }) => {

      const params = [from, to, width, height, length, weight];
      return util.format("https://www.melhorenvio.com.br/api/v2/calculator?from=%s&to=%s&width=%s&height=%s&length=%s&weight=%s", ...params);

};

/**
 * Filter elements from the array and catch only that
 *  exists and have the delivery time (that we want to use).
 */
const trimResult = (arr) => {

      return arr.filter(value => !!value && !!value.delivery_time);

};

/**
 * Function to be used in array.map,
 *  will retrieves and convert to Number only the delivery_time object.
 */
const convertDays = (value) => {
      return +value.delivery_time;
};

/**
 * Retrieves the deadline of an stretch/route, using as details
 *  the height, width, weight and length of the final product.
 */
const getDeadline = ({ from, to, height, width, weight, length }) => {

      return new Promise((resolve, reason) => {

            return request({
                  'url': formatURL({ 'from': from.cep, 'to': to.cep, height, width, weight, length })
            }).then((response) => {

                  /**
                   * Retrieves the first two minimal values from the found possible deadlines,
                   *  and retrieves the average, generating the most possible deadline.
                   *
                   * Math.ceil will be applied, so if the result is 5.1, will be converted to 6.
                   */
                  const filtered = trimResult(response.data).map(convertDays).sort().reverse().splice(0, 2);
                  return resolve(Math.ceil(filtered.reduce((previous, current) => (previous + current)) / filtered.length));

            }).catch((failure) => {
                  return reason(failure);
            });

      });

};

module.exports = getDeadline;