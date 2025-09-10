import type { Request, Response, NextFunction } from "express";
import { getAllCafes, cafeInputs } from "../db/queries";
import { body, validationResult } from "express-validator";
import { RequestHandler } from "express";

const validateSpotifyLink: RequestHandler[] = [
  body("spotifyLink")
    .isURL({ protocols: ["http", "https"], require_protocol: true })
    .withMessage("spotifyLink must be a valid URL")
    .matches(/^https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+/)
    .withMessage("Must be a valid Spotify track link"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

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

export async function postCafeReview(req: Request, res: Response) {
  console.log("Received Review!");
  res.status(201).json({ message: "Received Review!" });
}

export const postNewSong = [
  ...validateSpotifyLink,
  async (req: Request, res: Response) => {
    try {
      console.log("Received New Song!");
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).json(errors);
      }
      res.sendStatus(201);
    } catch (error) {
      console.error("Failed to add new song.", error);
    }
  },
];
