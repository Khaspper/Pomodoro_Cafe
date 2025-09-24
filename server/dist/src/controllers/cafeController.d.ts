import type { Request, Response } from "express";
import { RequestHandler } from "express";
export declare function getCafes(req: Request, res: Response): Promise<void>;
export declare function getCafeReviews(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare const postCafeReview: RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>[];
export declare const postNewSong: RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>[];
export declare const addNewComment: (RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>[] | ((req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>))[];
export declare function getCommentsController(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=cafeController.d.ts.map