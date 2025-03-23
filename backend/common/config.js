require('dotenv').config();

module.exports = {
    port: process.env.PORT || 8080,
    neo4j: {
        uri: process.env.NEO4J_URI,
        user: process.env.NEO4J_USER,
        password: process.env.NEO4J_PASSWORD
    }
};