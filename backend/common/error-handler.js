function handleError(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Internal Server Error'

    return res.status(statusCode).json({error: errorMessage});
}

module.exports = {handleError};