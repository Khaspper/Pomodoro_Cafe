import type { Request, Response } from "express";
import { getAllCafes } from "../db/queries";

export async function getCafes(req: Request, res: Response) {
  const cafes = await getAllCafes();
  res.send(cafes);
}
