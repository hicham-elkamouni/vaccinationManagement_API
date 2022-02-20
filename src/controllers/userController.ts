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
        const userExists: any = await User.findOne({ cin: data.cin })

        if (!userExists && data.shotTaken == 1) {
            const doc = new User(data)
            await doc.save();
            res.status(201).json({
                status: true,
                message: "You can take your First shot",
            });

        } else {
            if (await checkShotChoice(userExists?.shotTaken, data.shotTaken)) {
                await userExists.updateOne({ shotTaken: data.shotTaken }, { new: true })
                res.status(201).json({
                    status: true,
                    message: `You can take your ${data.shotTaken == 2 ? "Second" : "Third"} shot`,
                });
            } else {
                res.status(201).json({
                    status: false,
                    message: "take a valid shot please ",
                });
            }

        }
    } catch (err: any) {
        res.status(400).json({
            status: false,
            message: err.message,
        });
    }
}

const checkShotChoice = async (existShot: number, newShot: number) => {
    if (existShot + 1 == newShot)
        return true;
    else
        return false
}

export { getUser, registerUser }