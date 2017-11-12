const Location = require('../util/location');

const processRequest = async (request, response) => {

      /**
       * Check query parameters
       */
      let { width, height, weight } = request.query;
      let { type } = request.params;

      if (!type || (type != 'expresso' && type != 'economico')) {
            return response.status(400).json({
                  'success': false,
                  'code': 40004,
                  'resume': "You should inform the 'type' ('expresso' or 'economico') through the URL param."
            })
      } else {
            // the number represents an enum on the database
            type = (type === 'expresso' ? 1 : 2);
      }

      /**
       * Convert to numbers if it's a string
       */
      width = +width;
      height = +height;
      weight = +weight;

      /**
       * Check and apply the rules of the "Melhor Transportadora"
       */
      if (width && height && weight) {

            if (height < 2) {
                  return response.status(400).json({
                        'success': false,
                        'code': 40006,
                        'resume': "The minimum height is 2cm."
                  });
            } else if (height > 105) {
                  return response.status(400).json({
                        'success': false,
                        'code': 40006,
                        'resume': "The maximum height is 105cm."
                  });
            }

            if (width < 11) {
                  return response.status(400).json({
                        'success': false,
                        'code': 40006,
                        'resume': "The minimum width is 11cm."
                  });
            } else if (width > 105) {
                  return response.status(400).json({
                        'success': false,
                        'code': 40006,
                        'resume': "The maximum width is 105cm."
                  });
            }

            if (width < 11) {
                  return response.status(400).json({
                        'success': false,
                        'code': 40006,
                        'resume': "The minimum width is 11cm."
                  });
            } else if (width > 105) {
                  return response.status(400).json({
                        'success': false,
                        'code': 40006,
                        'resume': "The maximum width is 105cm."
                  });
            }

      } else {
            return response.status(400).json({
                  'success': false,
                  'code': 40003,
                  'resume': "You should inform the 'width', 'height' and 'weight' through the URL query."
            });
      }

      /**
       * Prepare the mysql connection
       */
      const connection = await app.connection();
      const Travel = new app.model.travel(connection);

      const resume = {};

      /**
       * Retrieves the origin and target of the
       *  product/item goes from and goes to.
       */
      const { from, to } = request.cep;
      const level = await Travel.getLevel({ 'from_uf': from.uf, 'to_uf': to.uf });

      if (!level) {
            return response.status(500).json({
                  'success': false,
                  'code': 50002,
                  'resume': "We couldn't process your combination of FROM and TO traject."
            });
      }

      /**
       * Build the JSON response to send to the client-side
       *  with a properly status code (http).
       */
      resume.travel = {};
      resume.travel.category = { 'name': Location.getCategory({ from, to }), level };
      resume.travel.from = from;
      resume.travel.to = to;

      await connection.release();
      return response.status(200).json({ 'success': true, resume });

};

module.exports = processRequest;