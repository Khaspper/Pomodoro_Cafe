import type { Request, Response, NextFunction } from "express";
import { postNewUser } from "../db/queries";

export async function addNewUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const response = await postNewUser(req.body);
    if (!response) {
      res.status(201).send(req.body);
    }
    throw response;
  } catch (error) {
    console.error("Could not create users", error);
    res.sendStatus(400);
  }
}
