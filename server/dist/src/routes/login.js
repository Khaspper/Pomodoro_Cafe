"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
require("../config/passport");
const passport_1 = __importDefault(require("passport"));
const loginController_1 = require("../controllers/loginController");
const loginRouter = (0, express_1.Router)();
loginRouter.post("/", passport_1.default.authenticate("local", { failWithError: true }), loginController_1.sendLoginErrors, loginController_1.loginUser);
exports.default = loginRouter;
//# sourceMappingURL=login.js.map