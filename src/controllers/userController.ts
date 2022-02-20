import { User } from "@models/User";
import { Request, Response } from "express";
import { RegisterUser } from "@interfaces/index";

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

const registerUser = async (req: Request, res: Response) => {
    const data = req.body as RegisterUser
    try {
        const doc = new User(data)
        await doc.save();
        res.status(201).json({
            status: true,
            message: doc,
        });
    } catch (err: any) {
        res.status(400).json({
            status: false,
            message: err.message,
        });
    }
}

export { getUser, registerUser }