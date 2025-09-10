import {
  getCafes,
  getCafeInputs,
  postCafeReview,
} from "../controllers/cafeController";

import { isAuthenticated } from "../controllers/accountController";

import { Router } from "express";

const cafeRouter = Router();

cafeRouter.get("/", getCafes);
cafeRouter.get("/:id/inputs", getCafeInputs);
cafeRouter.post("/:id/inputs", isAuthenticated, postCafeReview);
cafeRouter.post("/:id/inputs/song", isAuthenticated, postCafeReview);

export default cafeRouter;
