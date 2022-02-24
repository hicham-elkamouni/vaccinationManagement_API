import { User } from "@models/User";
import { Request, Response } from "express";
import { IUser } from "@interfaces/index";
import { appointmentMail, vaccinatedUserMail } from "@utils/index"

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
    const { cin, shot } = req.params
    const shotTaken = Number(shot)

    try {
        const doc: IUser | null = await User.findOne({ cin: cin })

        if (!doc && shotTaken == 1) {
            res.status(201).json({
                status: true,
                exist: false,
                next: true,
                message: "complete your information",
            });
        }
        else if (!doc && shotTaken != 1) {
            res.status(201).json({
                status: false,
                exist: false,
                next: false,
                message: "take a valid shot please",
            });
        }
        else if (doc && await checkShotChoice(doc?.shotTaken, shotTaken)) {
            res.status(201).json({
                status: false,
                exist: true,
                next: true,
                message: doc,
            });
        } else {
            res.status(201).json({
                status: false,
                exist: true,
                next: false,
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
        const doc: any = await User.findOne({ cin: data.cin })

        let date = await appointmentDate()
        if (!doc && data.shotTaken == 1) {
            const user = new User(data)
            await user.save();
            appointmentMail(data, date)
            res.status(201).json({
                status: true,
                message: "You can take your First shot",
            });
        } else {
            await doc.updateOne({ shotTaken: data.shotTaken }, { new: true })
            data.shotTaken != 3 ? appointmentMail(data, date) : vaccinatedUserMail(data)
            res.status(201).json({
                status: true,
                message: `You can take your ${data.shotTaken == 2 ? "Second" : "Third"} shot`,
            });
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

const appointmentDate = async () => {
    let nextMonth = new Date().getTime() + 2.628e+9;
    let date = new Date(nextMonth)
    let appointment = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    return appointment
}

export { getUsers, registerUser, cin_shot_Check }