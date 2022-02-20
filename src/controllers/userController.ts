import { User } from "@models/User";
import { Request, Response } from "express";

const getUser = async (req: Request, res: Response) => {
    
    try {
        const doc = await User.find({ name: "hicham" });
        res.status(200).json({
            status: true,
            message: doc,
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: err,
        });
    }
};


export { getUser }