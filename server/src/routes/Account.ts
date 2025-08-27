import { Router } from "express";

const accountRouter = Router();

accountRouter.get("/", (req, res) => {
  console.log("Inside Account");
  console.log(req.user);

  req.user
    ? res.json({
        message: "Updated User...",
      })
    : res.sendStatus(401);
});

export default accountRouter;
