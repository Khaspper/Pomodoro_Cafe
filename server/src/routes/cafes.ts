import { getCafes, getCafeInputs } from "../controllers/cafeController";
import { Router } from "express";

const cafeRouter = Router();

cafeRouter.get("/", getCafes);
cafeRouter.get("/:id/inputs", getCafeInputs);

export default cafeRouter;
