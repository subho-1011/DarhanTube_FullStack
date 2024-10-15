class ApiSuccessResponse {
    constructor(statusCode, message, data = undefined, success = true) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = success;
    }
}

class ApiReridectResponse extends ApiSuccessResponse {
    constructor(statusCode, message, url) {
        super(statusCode, message);
        this.url = url;
    }
}

class ApiErrorResponse {
    constructor(statusCode, message, errors = null, stack = null, success = false) {
        // super(message);

        this.message = message;
        this.statusCode = statusCode;
        this.success = success;
        if (errors) {
            this.errors = errors;
        }
        if (stack) {
            this.stack = stack;
        }
    }

    static fromZodError(error) {
        const errors = error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
        }));

        if (error?.issues) {
            return new ApiErrorResponse(400, errors[0].message, error.errors, error.issues);
        }

        return new ApiErrorResponse(400, error.message, errors);
    }
}

export { ApiSuccessResponse, ApiReridectResponse, ApiErrorResponse };
