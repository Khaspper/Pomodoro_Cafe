"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accountController_1 = require("../controllers/accountController");
const accountRouter = (0, express_1.Router)();
accountRouter.get("/", accountController_1.isAuthenticated, (req, res) => {
    res.status(200).json(req.user);
});
accountRouter.post("/", accountController_1.isAuthenticated, ...accountController_1.updateAccount);
// accountRouter.post("/", isAuthenticated, (req, res) => {
//   const username = req.body.username;
//   const email = req.body.email;
//   const password = req.body.password;
//   console.log(username);
//   console.log(email);
//   console.log(password);
//   res.sendStatus(400);
// });
accountRouter.post("/logout", accountController_1.isAuthenticated, accountController_1.logout);
exports.default = accountRouter;
//# sourceMappingURL=account.js.map