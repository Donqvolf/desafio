const Location = require('../util/location');

const processRequest = async (request, response) => {

      const resume = {};

      /**
       * Retrieves the origin and target of the
       *  product/item goes from and goes to.
       */
      const { from, to } = request.cep;

      resume.travel = {};
      resume.travel.throughCapitals = Location.fromCapital({ from, to });
      resume.travel.from = from;
      resume.travel.to = to;

      return response.status(200).json({ 'success': true, resume });

};

module.exports = processRequest;