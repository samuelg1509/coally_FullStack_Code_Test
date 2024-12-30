const { checkSchema } = require("express-validator");

let authValidator = {};

authValidator.register = checkSchema({
    username: {
        in: "body",
        isString: { errorMessage: "Username must be a string" },
        matches: {
            options:new RegExp(
                        /^[0-9A-Za-z]{1,16}$/
                    ),
            errorMessage: "The username must contain 4 to 15 characters, it must not begin or end with a special symbol, it should not contain uppercase",
        },
    },
    password: {
        in: "body",
        isString: { errorMessage: "Password must be a string" },
        matches: {
            options:new RegExp(
                        /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~])[a-zA-Z0-9!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~]{6,}$/
                    ),
            errorMessage: "The password must be minimum 6 characters long and have at least one lowercase, one uppercase, one number and one special symbol",
        },
    },
    email: {
        in: "body",
        isString: { errorMessage: "Email must be a string" },
        matches: {
            options:new RegExp(
                        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                    ),
            errorMessage: "Enter a valid email address",
        },
    }
});

module.exports = authValidator;