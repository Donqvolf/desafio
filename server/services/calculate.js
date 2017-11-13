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
const Location = require('../util/location');
const Validator = require('./validator');
const Product = require('../util/product');
const Deadline = require('../util/deadline');

const processRequest = async (request, response) => {

      const resume = {};

      /**
       * Check query parameters
       */
      let { width, height, weight, length, insurance, ar, mp } = request.query;
      let type = request.params.type || request.query.type;

      /**
       * Check if the type is informed properly
       */
      if (!type || (type != 'expresso' && type != 'economico')) {
            return response.status(400).json({ 'success': false, 'code': 40004, 'resume': "You should inform the 'type' ('expresso' or 'economico') through the URL param." })
      } else {
            type = (type === 'expresso' ? 1 : 2);
      }

      const validator = new Validator(request, response);
      width = +width, height = +height, weight = +weight, length = +length;

      /**
       * Check and apply the rules of the "Melhor Transportadora"
       */
      if (width && height && weight && length) {

            if (!validator.productDetails({ height, width, weight, length })) {
                  return false;
            }

      } else {
            return response.status(400).json({ 'success': false, 'code': 40003, 'resume': "Please, inform product details on request url query." });
      }

      const connection = await app.connection();
      const Travel = new app.model.travel(connection);
      const Zone = new app.model.zone(connection);

      const { from, to } = request.cep;
      const product = new Product({ height, length, weight, width });
      const level = await Travel.getLevel({ 'from_uf': from.uf, 'to_uf': to.uf });

      if (!level) {

            return response.status(500).json({
                  'success': false,
                  'code': 50002,
                  'resume': "We couldn't process your combination of FROM and TO travel."
            });

      }

      const category = Location.getCategory({ from, to });
      const stretch = category + String(level);

      let price = chargeable = await Zone.getPrice({ type, stretch, 'weight': (weight / 1000) });
      if (!price) {

            return response.status(406).json({
                  'success': false,
                  'code': 406001,
                  'resume': "We currently don't offer support to this route."
            });

      }

      price = +price, chargeable = +chargeable;
      product.price = price;

      /**
       * Build the JSON response to send to the client-side
       *  with a properly status code (http).
       */
      resume.stretch = stretch;

      /**
       * If an insurance has been requested,
       *  add the price to the charge value.
       */
      if (insurance) {
            let extraValue = +parseFloat(product.insurance).toFixed(2);
            chargeable += extraValue;
      }

      /**
       * If an MP ('Mao Propria') has been requgetDeadlineested,
       *  add the price to the charge value.
       */
      if (mp) {
            let extraValue = 3;
            chargeable += extraValue;
      }

      /**
       * If an AR ('Aviso de Recebimento') has been requested,
       *  add the price to the charge value.
       */
      if (ar) {
            let extraValue = +parseFloat((chargeable / 100) * 5).toFixed(2);
            chargeable += extraValue;
      }

      const deadline = await Deadline({ from, to, height, width, weight, length });

      resume.pricing = 'R$ ' + parseFloat(chargeable).toFixed(2);;
      resume.deadline = 'On average, within ' + deadline + ' day(s)';
      resume.rawDeadline = +deadline;

      await connection.release();
      return response.status(200).json({ 'success': true, resume });

};

module.exports = processRequest;