const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book shop',
      version: '1.0.0',
      description: "bu loyha kutubxona loyhasini documentioni"
    },
  },
  apis: ['./routes/*.js'], 
};

const swaggerDocument = swaggerJsdoc(options);


module.exports = swaggerDocument