const neo4jDriver = require('../common/neo4j')

function getAllNodes() {
    const session = neo4jDriver.session();

    return new Promise((resolve, reject) => {
        session
            .run(
                `
        MATCH (n:Node)
        OPTIONAL MATCH (n)-[:HAS_CHILD]->(child)
        RETURN n, collect(child) AS children
      `
            )
            .then((result) => {
                if (result.records.length === 0) {
                    return resolve([]);
                }

                const nodeMap = new Map();

                result.records.forEach((record) => {
                    const node = record.get("n").properties;
                    const children = record.get("children");

                    if (!nodeMap.has(node.name)) {
                        nodeMap.set(node.name, {...node, children: []});
                    }

                    children.forEach((child) => {
                        if (child) {
                            const childNode = child.properties;

                            if (!nodeMap.has(childNode.name)) {
                                nodeMap.set(childNode.name, {...childNode, children: []});
                            }

                            nodeMap.get(node.name).children.push(nodeMap.get(childNode.name));
                        }
                    });
                });

                const allNodes = new Set(nodeMap.values());
                const childNodes = new Set();

                allNodes.forEach((node) => {
                    node.children.forEach((child) => childNodes.add(child));
                });

                const rootNodes = [...allNodes].filter((node) => !childNodes.has(node));

                resolve(rootNodes);
            })
            .catch((error) => {
                reject(new Error("Failed to fetch data from Neo4j"));
            })
            .finally(() => {
                session.close();
            });
    });
}

module.exports = {getAllNodes};