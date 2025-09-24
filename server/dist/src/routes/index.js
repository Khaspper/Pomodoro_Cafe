"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accountController_1 = require("../controllers/accountController");
const indexRouter = (0, express_1.Router)();
indexRouter.get("/api/authorized", accountController_1.isAuthenticated, (req, res) => {
    res.json({ message: "Updated User..." });
});
exports.default = indexRouter;
//# sourceMappingURL=index.js.map