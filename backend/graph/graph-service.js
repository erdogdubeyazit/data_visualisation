const graphRepository = require('./graph-repository');
const GraphNode = require('./graph-node')
const {NoDataFoundError, MultipleRootsInTreeError} = require('../common/errors')


function getAllData() {
    return graphRepository.getAllNodes()
        .then((data) => {
            if (!data || data.length === 0) {
                return Promise.reject(new NoDataFoundError());
            }

            if (data.length > 1) {
                return Promise.reject(new MultipleRootsInTreeError());
            }

            function mapToGraphNode(node) {
                return new GraphNode(
                    node.name,
                    node.description,
                    node.parent,
                    node.children.map(mapToGraphNode)
                );
            }

            return Promise.resolve(data.map(mapToGraphNode));
        });
}

module.exports = {getAllData};