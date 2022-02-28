import { verifyToken } from "@utils/index";
import { RequestHandler } from 'express';


const Auth: RequestHandler = async (req, res, next) => {
    const bearer = req?.headers?.authorization;
    if (!bearer) {
        return res.status(401).json({ error: "unauthorized" });
    }
    const token = bearer.split(" ")[1];
    const payload = verifyToken(token);
    if (!payload) {
        return res.status(401).json({ error: "unauthenticated" });
    }
    next();
};

export { Auth }