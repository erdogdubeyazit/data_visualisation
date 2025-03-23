const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Backend API',
        version: '1.0.0',
        description: 'Backend API Swagger',
    }
};


const options = {
    swaggerDefinition,
    apis: ['./graph/graph-routes.js'],
};

const swaggerDocs = swaggerJSDoc(options);

module.exports = swaggerDocs;