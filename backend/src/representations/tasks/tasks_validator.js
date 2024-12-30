const { checkSchema } = require("express-validator");

let tasks_validator = {};

tasks_validator.create = checkSchema({
    title: {
        in: "body",
        isString: { errorMessage: "title field must be a string" }
    },
    description: {
        in: "body",
        optional: true,
        isString: { errorMessage: "description field must be a string" }
    },
    completed: {
        in: "body",
        optional: true,
        isBoolean: { errorMessage: "completed field must be a boolean" },
    }
});

tasks_validator.update = checkSchema({
    title: {
        in: "body",
        optional: true,
        isString: { errorMessage: "title field must be a string" }
    },
    description: {
        in: "body",
        optional: true,
        isString: { errorMessage: "description field must be a string" }
    },
    completed: {
        in: "body",
        optional: true,
        isBoolean: { errorMessage: "completed field must be a boolean" },
    }
});

tasks_validator.getAll = checkSchema({
    limit: {
        in: "query",
        optional: true,
        isNumeric: { errorMessage: "title field must be a number" }
    },
    page: {
        in: "query",
        optional: true,
        isNumeric: { errorMessage: "description field must be a number" }
    },
    order: {
        in: "query",
        optional: true,
         isIn: {
                options: [["asc", "desc"]],
                errorMessage: "order must be asc or desc"
            }
        },
    state: {
        in: "query",
        optional: true,
         isIn: {
            options: [["pending", "completed"]],
            errorMessage: "state must be pending or completed"
        }
    }
});

module.exports = tasks_validator;