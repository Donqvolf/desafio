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
const Model = app.model.main;

class Zone extends Model {

      constructor(trx) {
            super(trx);
      }

      /**
       * Retrieves the base of price from a Place X to an Place Y.
       * @param 'weight' the unity of the value is GR, not KG.
       */
      async getPrice({ type, stretch, weight }) {

            const sql = 'SELECT JSON_EXTRACT(`zone`.`price`, CONCAT("$.", ?)) AS `price` \
                         FROM `zone` WHERE `type` = ? AND ((?) BETWEEN `min_gr` AND `max_gr`) LIMIT 1';
            
            const params = [stretch, type, weight];
            const [rows] = await this.trx.query(sql, params);
            return rows[0]['price'];

      }

}

module.exports = Zone;