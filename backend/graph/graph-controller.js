const grapService = require('./graph-service')

function getAllNodes(req, res, next) {
    grapService.getAllData()
        .then(data => res.json({data}))
        .catch(next);
}

module.exports = {getAllNodes}