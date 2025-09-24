"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signupController_1 = require("../controllers/signupController");
const signupRouter = (0, express_1.Router)();
signupRouter.get("/", (_req, res) => {
    res.json({ message: "Signup" });
});
// Apply both: per-IP + per-email
signupRouter.post("/", ...signupController_1.addNewUser);
exports.default = signupRouter;
//# sourceMappingURL=signup.js.map