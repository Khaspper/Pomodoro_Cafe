import {
  getCafes,
  getCafeReviews,
  postCafeReview,
  postNewSong,
  addNewComment,
  getCommentsController,
} from "../controllers/cafeController.js";

import { isAuthenticated } from "../controllers/accountController.js";

import { Router } from "express";

const cafeRouter = Router();

cafeRouter.get("/", getCafes);
cafeRouter.get("/:id/inputs", getCafeReviews);
cafeRouter.post("/review/:id", isAuthenticated, postCafeReview);
cafeRouter.post("/:id/inputs/song", isAuthenticated, postNewSong);
// Comments
cafeRouter.get("/:id/comments", getCommentsController);
cafeRouter.post("/:id/comments", isAuthenticated, ...addNewComment);
export default cafeRouter;
