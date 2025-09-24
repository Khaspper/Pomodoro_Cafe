"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const queries_1 = require("../db/queries");
const bcrypt_1 = __importDefault(require("bcrypt"));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await (0, queries_1.getUserById)(Number(id));
        if (user === null) {
            throw new Error("User was not found");
        }
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
});
exports.default = passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
        const user = await (0, queries_1.getUserByEmail)(email);
        if (user === null) {
            throw new Error("Email not found.");
        }
        const match = await bcrypt_1.default.compare(password, user.password);
        if (!match) {
            throw new Error("Incorrect Password.");
        }
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
}));
//# sourceMappingURL=passport.js.map