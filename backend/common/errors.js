class NoDataFoundError extends Error {
    constructor() {
        super('No data found');
        this.name = 'NoDataFoundError';
        this.statusCode = 404;
    }
}

class MultipleRootsInTreeError extends Error {
    constructor() {
        super('Multiple root nodes exist int the three');
        this.name = 'MultipleRootsInTreeError';
        this.statusCode = 409;
    }
}

module.exports = {
    NoDataFoundError,
    MultipleRootsInTreeError
};