import { verifyToken } from "@utils/index";
import { RequestHandler } from 'express';
import { Request, Response, NextFunction } from 'express';

const Auth = (role = "") => async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req?.headers?.authorization;

    if (!bearer) {
        return res.status(401).json({ status: false, error: "unauthorized" });
    }
    const token = bearer.split(" ")[1];
    const payload = verifyToken(token, role);
    if (!payload) {
        return res.status(401).json({ status: false, error: "unauthenticated" });
    }
    next();
};

export { Auth }