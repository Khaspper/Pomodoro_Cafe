import type { Request, Response, NextFunction } from "express";
import {
  getAllCafes,
  cafeInputs,
  reviewCafe,
  getCafeById,
  findReview,
} from "../db/queries";
import { body, validationResult } from "express-validator";
import { RequestHandler } from "express";
import { addSong } from "../db/queries";

const validateSpotifyLink: RequestHandler[] = [
  body("spotifyLink")
    .trim()
    .notEmpty()
    .withMessage("Link cannot be empty.")
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

//TODO: This has to get the average as well remember that!!!
export async function postCafeReview(req: Request, res: Response) {
  const wifiStrength = req.body.wifiStrength;
  const outlets = req.body.outlets;
  const seating = req.body.seating;
  const freeWifi = req.body.freeWifi;
  const cafeID = Number(req.params.id);
  const exists = await getCafeById(cafeID);
  if (exists) {
    const reviews = await findReview(cafeID);
    if (!reviews) {
      reviewCafe(cafeID, wifiStrength, freeWifi, outlets, seating, 1);
    }
  }
  // const cafe = await reviewCafe(
  //   wifiStrength,
  // outlets,
  // seating,
  // freeWifi,
  // cafeID
  // );
  res.status(201).json({ message: "Received Review!" });
}

export const postNewSong = [
  ...validateSpotifyLink,
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).json(errors);
      }
      await addSong(req.body.spotifyLink, req.body.cafeID);
      res.status(201).json({ message: `Updated cafe ${req.body.cafeID}` });
    } catch (error) {
      console.error("Failed to add new song.", error);
    }
  },
];
// in the legend use chairs as a star like remember
// One outlet means 1 pair
// One seating means 4 chairs
// blue light brown
