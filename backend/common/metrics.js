const client = require('prom-client');

const register = new client.Registry();

const requestCounter = new client.Counter({
    name: 'http_server_requests_seconds_count',
    help: 'Total number of HTTP server requests',
    labelNames: ['method', 'route', 'status'],
});

const requestHistogram = new client.Histogram({
    name: 'http_server_requests_seconds',
    help: 'Duration of HTTP server requests in seconds',
    labelNames: ['method', 'route', 'status'],
    buckets: [0.001, 0.01, 0.1, 0.3, 1.5, 5, 10],
});


const requestSummary = new client.Summary({
    name: 'http_server_requests_seconds_sum',
    help: 'Summary of HTTP request durations in seconds',
    labelNames: ['method', 'route', 'status'],
});

register.registerMetric(requestCounter);
register.registerMetric(requestHistogram);
register.registerMetric(requestSummary);

const metricsComponent = (req, res, next) => {
    const end = requestHistogram.startTimer();
    const summaryEnd = requestSummary.startTimer();

    res.on('finish', () => {
        const route = req.route ? req.route.path : req.path;

        requestCounter.inc({ method: req.method, route, status: res.statusCode });
        end({ method: req.method, route, status: res.statusCode });
        summaryEnd({ method: req.method, route, status: res.statusCode });
    });

    next();
};

const metricsEndpoint = async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
};

module.exports = {
    metricsComponent,
    metricsEndpoint,
};
