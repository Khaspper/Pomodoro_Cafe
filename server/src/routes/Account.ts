import { Router } from "express";

const accountRouter = Router();

accountRouter.get("/", (req, res) => {
  res.json({
    message: "Updated User...",
  });
});

export default accountRouter;
