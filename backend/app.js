const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./common/swagger');
const graphRoutes = require('./graph/graph-routes');
const {handleError} = require('./common/error-handler');
const {port} = require('./common/config');
const {register} = require('./common/metrics');

const app = express();

app.use(cors());
app.disable('etag');

// Home page
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello from BEB API!');
});

// API
app.use('/api/v1', graphRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(handleError);

// Metrics page
app.use('/metrics', async (req, res) => {
    res.setHeader('Content-Type', register.contentType);
    const metrics = await register.metrics();
    res.send(metrics);
});


if (require.main === module) {
    const server = app.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
        console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
    });
}

module.exports = {app};