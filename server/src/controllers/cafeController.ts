import type { Request, Response, NextFunction } from "express";
import {
  getAllCafes,
  reviewCafe,
  getCafeById,
  getCafeStats,
  createCafeStats,
  updateCafeStats,
  getReviewFromUser,
  deleteUsersReview,
  addSong,
  postNewComment,
  getComments,
} from "../db/queries";
import { body, validationResult } from "express-validator";
import { RequestHandler } from "express";

const validateComment: RequestHandler[] = [
  body("comment")
    .trim()
    .notEmpty()
    .withMessage("Comment cannot be empty.")
    .isLength({ min: 1, max: 255 })
    .withMessage("Comment has to be less than 255 characters."),
];

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
  const response = await getCafeStats(cafeId);
  if (!response || response === null) {
    return res
      .status(204)
      .json({ message: "No reviews for this cafe", inputs: [] });
  }
  return res.status(200).send(response);
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
    let message = "Received Review!";
    if (exists) {
      const userReview = await getReviewFromUser(cafeID, userID);
      if (userReview) {
        await deleteUsersReview(cafeID, userID);
        console.log("Previous review has been deleted");
        message = "Previous review has been deleted";
      }
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
        await createCafeStats(cafeID);
      } else {
        await updateCafeStats(cafeID);
      }
      return res.status(201).json({ message });
    } else {
      throw new Error("Error in postCafeReview.");
    }
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

export const addNewComment = [
  validateComment,
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      // Check to see if the cafe even exists
      const cafeID = req.params.id;
      const exists = await getCafeById(Number(cafeID));
      if (!exists) {
        throw new Error("Cafe does not exists");
      }
      // Get usernames by userID
      console.log("cafeController: req.body");
      console.log(req.body);
      await postNewComment(
        Number(cafeID),
        Number(req.user?.id),
        String(req.user?.username),
        req.body.comment
      );
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Cafe doesn't exists" });
    }
  },
];

export async function getCommentsController(req: Request, res: Response) {
  const comments = await getComments(Number(req.params.id));
  if (comments.length === 0) {
    return res.status(200).json({ message: "No comments for this cafe yet!" });
  }
  res.status(200).json({ comments });
}
