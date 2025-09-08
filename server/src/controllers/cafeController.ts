import type { Request, Response } from "express";
import { getAllCafes, cafeInputs } from "../db/queries";

export async function getCafes(req: Request, res: Response) {
  const cafes = await getAllCafes();
  res.send(cafes);
}

export async function getCafeInputs(req: Request, res: Response) {
  const cafeId = Number(req.params.id);
  const inputs = await cafeInputs(cafeId);

  if (!inputs || (Array.isArray(inputs) && inputs.length === 0)) {
    return res
      .status(204)
      .json({ message: "No reviews for this cafe", inputs: [] });
  }

  return res.status(200).json(inputs); // <-- always JSON
}
