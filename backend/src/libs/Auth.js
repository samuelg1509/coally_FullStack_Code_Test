"use strict";

const Encrypt = require("./Encrypt");
const JWToken = require("./Jwt");
const userService = require("../Services/user");

/** Manage header authenthication.
 * @author Samuel Flores
 */
class Auth extends JWToken {

    /**
     * @constructor
     * @param {string} parseHeader - Request header.
    */
    #authHeader;
    #userInfo;
    #encrypt;
    constructor(parseHeader) {
        super();
        this.#authHeader = this.#parseHeader(parseHeader);
        this.#userInfo = this.#setUserInfo();
        this.#encrypt = new Encrypt();
    }

    /**
     * Find the user info.
     * @method
     * @private
     * @returns {object} -> User data.
     * @author Samuel Flores
    */
    #setUserInfo = async () => {
        let username;

        if (this.#authHeader.scheme.toLowerCase() == "basic") {
            //basic
            username = this.#authHeader['username'];

        } else {
            //bearer
            const token = this.#authHeader.token;
            const tokenData = this.verifyJwt(token);
            username = tokenData.username;
        }

        return await userService.findOne({
            username
        }, 'username password email');
    };

    /**
     * Decrypt the request header.
     * @method
     * @private
     * @returns {object} -> Scheme, header data.
     * @author Samuel Flores
    */
    #parseHeader = (header) => {
        const parsed = {};
        let parts = [];

        if (!header || typeof header !== "string") return parsed;

        try {
            parts = header.split(" ");
            if (parts[0].toLowerCase() === "bearer") {
                parsed.scheme = "bearer";
                parsed.token = parts[1];

                return parsed;
            }

            const basicCredentials = Buffer.from(parts.pop(), "base64")
            .toString("binary")
            .split(":");
            parsed.scheme = "basic";
            parsed.username = basicCredentials[0];
            parsed.password = basicCredentials[1];


            return parsed;

        } catch (e) {
            return parsed;
        }
    };


    /**
         * Get authorization scheme.
         * @readonly
         * @returns {string} -> Authorization scheme.
         * @author Samuel Flores
     */
    get authorization () {
        return this.#authHeader.scheme.toLowerCase();
    };

    /**
         * Get user info.
         * @readonly
         * @returns {object} -> User information in the request header.
         * @author Samuel Flores
     */
    get getUserInfo() {
        return this.#userInfo;
    }

    /**
     * Validate the password in the request header.
     * @method
     * @returns {boolean} -> Operation result.
     * @author Samuel Flores
    */
    validate = async () => {
        
        const user = await this.#userInfo;
        if (!user) return false;

        this.#encrypt.set_str = this.#authHeader.password;
        return await this.#encrypt.compare_str(user.password);

    };

    /**
         * Generate the json web token with the user information.
         * @method
         * @returns {string} -> Json web token.
         * @author Samuel Flores
     */
    setAuthToken = async () => {
        const user = await this.#userInfo;

        const payload = {
            id: user["id"],
            email: user["email"],
            username: user["username"],
        };

        return this.parseJwt(payload);
    };

}

module.exports = Auth;