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
 * Formats the CEP code and removes everything that is not numbers.
 * It will be used before the code is sent to the "Melhor Envio" API.
 */
const formatCode = (cep_code) => {

      if (!cep_code) {
            return null;
      }

      if (cep_code.cep) {
            cep_code = cep_code.cep;
      }

      if (typeof cep_code != 'string') {
            cep_code = (cep_code).toString();
      }

      return cep_code.replace(/[^0-9]+/g, '');

};

/**
 * Prepare the URL with the CEP code to then sent it to the "Melhor Envio" API.
 */
const formatURL = (cep_code) => {

      return util.format("https://location.melhorenvio.com.br/%s", cep_code);

};

/**
 * Remove ALL null, undefined or false objects/values from the array.
 */
const trimResult = (arr) => {

      return arr.filter(value => !!value);

};


/**
 * Retrieve all information from an array of CEP codes.
 * If a CEP code isn't found, it will be null and removed from the final array result.
 */
const retrieveAll = (cep_code_list) => {

      const queue = cep_code_list.map((cep) => {

            try {
                  return getByCode(cep);
            } catch (ex) {
                  return null;
            }

      }).filter(task => !!task);

      return Promise.all(queue).then(trimResult);

};

/**
 * Retrieves the 'about' information from the requested CEP code.
 * This resource uses the third-party "Melhor Envio" API.
 */
const getByCode = (cep_code) => {

      if (cep_code && Array.isArray(cep_code)) {
            return retrieveAll(cep_code);
      }

      const code = formatCode(cep_code);
      if (!code) {
            throw new Error('No valid CEP has been informed. Data could not be retrieved.');
      }

      return new Promise((resolve, reason) => {

            const fromCache = app.cache.cep[cep_code];
            if (fromCache || fromCache === 0) {
                  return resolve(fromCache);
            }

            return request({
                  'url': formatURL(cep_code)
            }).then((response) => {

                  app.cache.cep[cep_code] = response.data;
                  return resolve(app.cache.cep[cep_code]);


            }).catch((failure) => {

                  app.cache.cep[cep_code] = 0; // Doesn't exists
                  if (failure.response.status === 404) {
                        return resolve(null);
                  } else {
                        return reason(failure);
                  }

            });

      });

};

module.exports = getByCode;