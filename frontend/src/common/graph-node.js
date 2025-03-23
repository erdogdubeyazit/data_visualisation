class GraphNode {
    constructor(name, description, parent, children = []) {
        this.name = name;
        this.description = description;
        this.parent = parent;
        this.children = children;
    }
}

export default {GraphNode};