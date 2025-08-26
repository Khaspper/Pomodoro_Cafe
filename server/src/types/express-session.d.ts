import "express";

declare global {
  namespace Express {
    interface UserPayload {
      id: number;
      username: string;
      password?: string;
    }

    interface Request {
      user?: UserPayload;
      // This is for JWT
      token?: string | undefined;
    }
  }
}
