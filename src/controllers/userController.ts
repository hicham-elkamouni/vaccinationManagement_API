import { User } from "@models/User";
import { Request, Response } from "express";
import { IUser } from "@interfaces/index";

const getUsers = async (req: Request, res: Response) => {

    try {
        const docs = await User.find({});
        res.status(200).json({
            status: true,
            message: docs,
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: err,
        });
    }
};

const cin_shot_Check = async (req: Request, res: Response) => {
    const {cin , shot} = req.params
    const shotTaken = Number(shot)

    try {
        const doc: IUser | null = await User.findOne({ cin:cin })

        if (!doc && shotTaken == 1) {
            res.status(201).json({
                status: true,
                exist: false,
                next:true,
                message: "complete your information",
            });
        }
        else if (!doc && shotTaken != 1) {
            res.status(201).json({
                status: false,
                exist: false,
                next:false,
                message: "take a valid shot please",
            });
        }
        else if (doc && await checkShotChoice(doc?.shotTaken, shotTaken)) {
            res.status(201).json({
                status: false,
                exist: true,
                next:true,
                message: doc,
            });
        } else {
            res.status(201).json({
                status: false,
                exist: true,
                next:false,
                message: "take a valid shot please ",
            });
        }

    } catch (err: any) {
        res.status(400).json({
            status: false,
            message: err.message,
        });
    }
}

const registerUser = async (req: Request, res: Response) => {
    const data = req.body as IUser

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

export { getUsers, registerUser, cin_shot_Check }