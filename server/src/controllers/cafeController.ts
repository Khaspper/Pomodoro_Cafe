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
} from "../db/queries.js";
import { body, param, validationResult } from "express-validator";
import { RequestHandler } from "express";

const validateReview: RequestHandler[] = [
  param("id").isInt().withMessage("Cafe ID must be a valid integer"),
  body().custom((value, { req }) => {
    if (!req.user?.id || isNaN(Number(req.user.id))) {
      throw new Error("User must be authenticated");
    }
    return true;
  }),
  body("wifiStrength")
    .notEmpty()
    .withMessage("Wifi Strength input cannot be empty.")
    .isInt({ min: 1, max: 3 })
    .toInt()
    .withMessage("Wifi Strength has to be or between 1 and 5."),
  body("outlets")
    .notEmpty()
    .withMessage("Outlet input cannot be empty.")
    .isInt({ min: 1, max: 5 })
    .toInt()
    .withMessage("Outlet has to be or between 1 and 5."),
  body("seating")
    .notEmpty()
    .withMessage("Seating input cannot be empty.")
    .isInt({ min: 1, max: 5 })
    .toInt()
    .withMessage("Seating has to be or between 1 and 5."),
  body("freeWifi")
    .notEmpty()
    .withMessage("Free Wifi input cannot be empty.")
    .isInt({ min: 0, max: 1 })
    .toInt()
    .withMessage("Free Wifi has to be either 0 or 1."),
];

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

export const postCafeReview = [
  ...validateReview,
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
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
  },
];

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
  res.status(200).json({ comments });
}
