import type { Request, Response, NextFunction } from "express";
export declare function checkForErrors(req: Request): import("express-validator").Result<import("express-validator").ValidationError>;
export declare const addNewUser: (import("express-validator").ValidationChain[] | ((req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>))[];
//# sourceMappingURL=signupController.d.ts.map