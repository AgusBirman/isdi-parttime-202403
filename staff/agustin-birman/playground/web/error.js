class ContentError extends Error {
    constructor(message) {
        this.message = message

        Error.captureStackTrace(this, this.constructor)
        this.name = ContentError.name
    }
}

class MatchError extends Error {
    constructor(message) {
        this.message = message

        Error.captureStackTrace(this, this.constructor)
        this.name = MatchError.name
    }
}

class DuplicityError extends Error {
    constructor(message) {
        this.message = message

        Error.captureStackTrace(this, this.constructor)
        this.name = DuplicityError.name
    }
}