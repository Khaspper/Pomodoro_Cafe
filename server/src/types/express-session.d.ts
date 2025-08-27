import "express";

declare global {
  namespace Express {
    interface UserPayload {
      id: number;
      username: string;
      password?: string;
    }
  }
}
