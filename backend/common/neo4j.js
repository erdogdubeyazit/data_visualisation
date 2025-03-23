const neo4j = require('neo4j-driver');
const {neo4j: config} = require('./config');

const neo4jDriver = neo4j.driver(config.uri, neo4j.auth.basic(config.user, config.password));

module.exports = neo4jDriver;