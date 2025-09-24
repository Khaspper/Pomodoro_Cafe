import type { Request, Response, NextFunction } from "express";
export declare function isAuthenticated(req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
export declare function logout(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function checkForErrors(req: Request): import("express-validator").Result<import("express-validator").ValidationError>;
export declare const updateAccount: (import("express-validator").ValidationChain | typeof isAuthenticated | ((req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>))[];
//# sourceMappingURL=accountController.d.ts.map