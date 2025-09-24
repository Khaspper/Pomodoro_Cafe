import type { Request, Response, NextFunction } from "express";
export declare const loginUser: (import("express-validator").ValidationChain | ((req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined))[];
export declare function sendLoginErrors(err: Error, req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=loginController.d.ts.map