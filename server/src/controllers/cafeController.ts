import type { Request, Response, NextFunction } from "express";
import {
  getAllCafes,
  cafeReviews,
  reviewCafe,
  getCafeById,
  getCafeStats,
  createCafeStats,
  updateCafeStats,
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

export async function getCafeReviews(req: Request, res: Response) {
  const cafeId = Number(req.params.id);
  const inputs = await cafeReviews(cafeId);

  if (!inputs || (Array.isArray(inputs) && inputs.length === 0)) {
    return res
      .status(204)
      .json({ message: "No reviews for this cafe", inputs: [] });
  }

  return res.status(200).json(inputs); // <-- always JSON
}

export async function postCafeReview(req: Request, res: Response) {
  try {
    //?⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄ This is reviews and user and cafe id to tie the reviews to ⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄
    const userID = Number(req.user?.id);
    const cafeID = Number(req.params.id);
    const wifiStrength = req.body.wifiStrength;
    const outlets = req.body.outlets;
    const seating = req.body.seating;
    const freeWifi = req.body.freeWifi;
    //?^^^^^^^^^^^^^^^ This is reviews and user and cafe id to tie the reviews to ^^^^^^^^^^^^^^^

    // Checks to see if the cafe even exists
    const exists = await getCafeById(cafeID);
    if (exists) {
      await reviewCafe(
        userID,
        cafeID,
        wifiStrength,
        freeWifi,
        outlets,
        seating
      );
      // After adding the review we need to update the CafeStats model
      const cafe = await getCafeStats(cafeID);
      if (!cafe) {
        await createCafeStats(cafeID, wifiStrength, outlets, seating, freeWifi);
      } else {
        await updateCafeStats(
          cafeID,
          cafe.wifiCount + wifiStrength,
          cafe.outletCount + outlets,
          cafe.seatingCount + seating,
          freeWifi
        );
      }
    } else {
      throw new Error("Error in postCafeReview.");
    }
    res.status(201).json({ message: "Received Review!" });
  } catch (error) {
    console.error("Cafe doesn't exist", error);
  }
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
