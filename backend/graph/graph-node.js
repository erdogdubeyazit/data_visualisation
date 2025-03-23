class GraphNode {
    constructor(name, description, parent, children = []) {
        this.name = name;
        this.description = description;
        this.parent = parent;
        this.children = children;
    }

    addChild(childNode) {
        if (!this.children.some(child => child.name === childNode.name)) {
            this.children.push(childNode);
        }
    }
}

module.exports = GraphNode;