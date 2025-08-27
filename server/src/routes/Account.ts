import { Router } from "express";
import { logout } from "../controllers/account";

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

accountRouter.post("/logout", logout);

export default accountRouter;
