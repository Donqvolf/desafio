class Validator {

      constructor(request, response) {
            this.request = request;
            this.response = response;
      }

      productDetails({ height, width, weight, length }) {

            if (height < 2) {
                  this.response.status(400).json({ 'success': false, 'code': 40006, 'resume': "The minimum height is 2cm." });
                  return false;
            } else if (height > 105) {
                  this.response.status(400).json({ 'success': false, 'code': 40006, 'resume': "The maximum height is 105cm." });
                  return false;
            }

            if (width < 11) {
                  this.response.status(400).json({ 'success': false, 'code': 40006, 'resume': "The minimum width is 11cm." });
                  return false;
            } else if (width > 105) {
                  this.response.status(400).json({ 'success': false, 'code': 40006, 'resume': "The maximum width is 105cm." });
                  return false;
            }

            if (weight < 1) {
                  this.response.status(400).json({ 'success': false, 'code': 40006, 'resume': "The minimum weight is 1kg." });
                  return false;
            } else if (weight > 30) {
                  this.response.status(400).json({ 'success': false, 'code': 40006, 'resume': "The maximum weight is 30kg." });
                  return false;
            }

            if (length < 16) {
                  this.response.status(400).json({ 'success': false, 'code': 40006, 'resume': "The minimum length is 16cm." });
                  return false;
            } else if (length > 105) {
                  this.response.status(400).json({ 'success': false, 'code': 40006, 'resume': "The maximum length is 105cm." });
                  return false;
            }

            return true;

      }

};

module.exports = Validator;