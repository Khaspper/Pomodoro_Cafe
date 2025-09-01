import type { Request, Response, NextFunction } from "express";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.sendStatus(401);
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  req.logOut((error) => {
    if (error) {
      return res.status(400).json({ message: "Logout failed" });
    }

    // Destroy the session (this should remove it from the database via connect-pg-simple)
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error:", err);
        return res.status(500).json({ message: "Session destruction failed" });
      }

      // Clear the cookie
      res.clearCookie("connect.sid", {
        httpOnly: true,
        secure: false, // Set to true in production with HTTPS
        sameSite: "lax",
      });

      res.status(200).json({ message: "Logged out successfully" });
    });
  });
}
