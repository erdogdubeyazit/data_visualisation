MATCH (n) DETACH DELETE n;

CREATE (A:Node {name: 'A', description: 'This is a description of A', parent: ''})
CREATE (B:Node {name: 'B', description: 'This is a description of B', parent: 'A'})
CREATE (C:Node {name: 'C', description: 'This is a description of C', parent: 'A'})
CREATE (D:Node {name: 'D', description: 'This is a description of D', parent: 'A'})
CREATE (B1:Node {name: 'B-1', description: 'This is a description of B-1', parent: 'B'})
CREATE (B2:Node {name: 'B-2', description: 'This is a description of B-2', parent: 'B'})
CREATE (B3:Node {name: 'B-3', description: 'This is a description of B-3', parent: 'B'})

MERGE (A)-[:HAS_CHILD]->(B)
MERGE (A)-[:HAS_CHILD]->(C)
MERGE (A)-[:HAS_CHILD]->(D)

MERGE (B)-[:HAS_CHILD]->(B1)
MERGE (B)-[:HAS_CHILD]->(B2)
MERGE (B)-[:HAS_CHILD]->(B3);
