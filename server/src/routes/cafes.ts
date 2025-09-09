import {
  getCafes,
  getCafeInputs,
  postCafeReview,
} from "../controllers/cafeController";
import { Router } from "express";

const cafeRouter = Router();

cafeRouter.get("/", getCafes);
cafeRouter.get("/:id/inputs", getCafeInputs);
cafeRouter.post("/:id/inputs", postCafeReview);

export default cafeRouter;
