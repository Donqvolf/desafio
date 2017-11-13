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
class Validator {

      constructor(request, response) {
            this.request = request;
            this.response = response;
      }

      productDetails({ height, width, weight, length }) {

            if (height < 2) {
                  this.response.status(400).json({ 'success': false, 'code': 40006, 'resume': "A altura mínima é 2cm." });
                  return false;
            } else if (height > 105) {
                  this.response.status(400).json({ 'success': false, 'code': 40006, 'resume': "A altura máxima é 105cm." });
                  return false;
            }

            if (width < 11) {
                  this.response.status(400).json({ 'success': false, 'code': 40006, 'resume': "A largura mínima é 11cm." });
                  return false;
            } else if (width > 105) {
                  this.response.status(400).json({ 'success': false, 'code': 40006, 'resume': "A largura máxima é 105cm." });
                  return false;
            }

            if (weight < 1) {
                  this.response.status(400).json({ 'success': false, 'code': 40006, 'resume': "O peso mínimo é 1kg." });
                  return false;
            } else if (weight > 30) {
                  this.response.status(400).json({ 'success': false, 'code': 40006, 'resume': "O peso máximo é 30kg." });
                  return false;
            }

            if (length < 16) {
                  this.response.status(400).json({ 'success': false, 'code': 40006, 'resume': "O comprimento mínimo é 16cm." });
                  return false;
            } else if (length > 105) {
                  this.response.status(400).json({ 'success': false, 'code': 40006, 'resume': "O comprimento máximo é 105cm." });
                  return false;
            }

            return true;

      }

};

module.exports = Validator;