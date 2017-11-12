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

const CEP = require('./cep');

class Location {

      /**
       * Check if the both ceps are from the same State.
       */
      static inSameState({ from, to }) {

            return from.uf === to.uf;

      };

      /**
       * Check if the both CEP codes are from the same City
       *  (and, of course, the same State).
       */
      static inSameCity({ from, to }) {

            return isSameState({ from, to }) && from.cidade === to.cidade;

      };

      static fromCapital({ from, to }) {

            if (!isSameCity({ from, to })) {
                  if (app.cache.capitais.includes(from.cidade)) {
                        return !!app.cache.capitais.includes(to.cidade);
                  }
            }

            return false;

      };

      /**
       * Check the both CEP codes and returns the category character,
       *  i.e. 'L', 'E', etc.
       */
      static getCategory({ from_cep_code, to_cep_code }) {

            return new Promise((resolve, reason) => {

                  const codes = [from_cep_code, to_cep_code];
                  return app.cep(codes).then((about) => {

                        const a = about[0], b = about[1];
                        if (isSameCity({ 'from': a, 'to': b })) {
                              return 'L';
                        } else if (isSameState({ 'from': a, 'to': b })) {
                              return 'E';
                        } else if (fromCapital({ 'from': a, 'to': b })) {
                              return 'N';
                        }

                  });

            })

      };

};

module.exports = Location;