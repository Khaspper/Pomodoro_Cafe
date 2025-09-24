"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cafeController_1 = require("../controllers/cafeController");
const accountController_1 = require("../controllers/accountController");
const express_1 = require("express");
const cafeRouter = (0, express_1.Router)();
cafeRouter.get("/", cafeController_1.getCafes);
cafeRouter.get("/:id/inputs", cafeController_1.getCafeReviews);
cafeRouter.post("/review/:id", accountController_1.isAuthenticated, cafeController_1.postCafeReview);
cafeRouter.post("/:id/inputs/song", accountController_1.isAuthenticated, cafeController_1.postNewSong);
// Comments
cafeRouter.get("/:id/comments", cafeController_1.getCommentsController);
cafeRouter.post("/:id/comments", accountController_1.isAuthenticated, ...cafeController_1.addNewComment);
exports.default = cafeRouter;
//# sourceMappingURL=cafe.js.map