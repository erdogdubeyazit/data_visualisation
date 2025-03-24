const client = require('prom-client');

const register = new client.Registry();

const requestCounter = new client.Counter({
    name: 'http_server_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status'],
});

const requestHistogram = new client.Histogram({
    name: 'http_server_requests_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status'],
    buckets: [0.001, 0.01, 0.1, 0.3, 1.5, 5, 10],
});

register.registerMetric(requestCounter);
register.registerMetric(requestHistogram);

const collectMetrics = () => {
    return (req, res, next) => {
        const end = requestHistogram.startTimer();

        res.on('finish', () => {
            const route = req.route ? req.route.path : req.path;
            requestCounter.inc({ method: req.method, route, status: res.statusCode });
            end({ method: req.method, route, status: res.statusCode });
        });

        next();
    };
};

module.exports = { register, collectMetrics };
