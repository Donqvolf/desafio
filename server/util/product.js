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
class Product {

      constructor({ height, width, weight, length, price = 0 }) {
            this.data = {};
            this.data.height = height;
            this.data.width = width;
            this.data.weight = Math.ceil(weight);
            this.data.length = length;
            this.data.price = 0;
      }

      /**
       * Calculate the bulk ('volume') of the product.
       */
      get bulk() {
            return this.data.height * this.data.width * this.data.length;
      }

      /**
       * Calculate the cubic weight ('peso cubico') using the bulk weight.
       */
      get cubicWeight() {
            return Math.ceil(this.bulk / 6000);
      }

      /**
       * Get the final product's weight (that will be used to charge).
       */
      get weight() {
            return Math.max(this.cubicWeight, this.data.weight);
      }

      /**
       * Get the tax of insurance ('Seguro') (corresponds to 1% of product value)
       */
      get insurance() {
            return (this.data.price / 100) * 1;
      }

      set price(value) {
            this.data.price = +value;
      }

}

module.exports = Product;