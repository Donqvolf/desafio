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