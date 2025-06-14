// 400 - Bad Request Error
class BadRequestError extends Error {
    constructor(paramName) {
        super(`El parámetro ${paramName} es inválido`);
        this.name = 'BadRequestError';
    }
}

// 404 - Not Found Error
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

// 409 - Conflict Error
class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConflictError';
    }
}

// 500 - Internal Server Error
class InternalServerError extends Error {
    constructor(errorMessage) {
        super(`Error interno del servidor: ${errorMessage}`);
        this.name = 'InternalServerError';
    }
}

module.exports = {
    BadRequestError,
    NotFoundError,
    ConflictError,
    InternalServerError
};