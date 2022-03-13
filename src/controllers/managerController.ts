import { Manager } from "@models/Manager";
import { createToken } from "@utils/index";
import { Request, Response, RequestHandler } from "express";

const login = async (req: Request, res: Response) => {
    const {
        email,
        password
    } = req.body;
    try {
        const doc = await Manager.findOne({ email })
        if (!doc) {
            return res.status(404).json({
                isLogged: false,
                error: 'User not Found with this email@'
            })
        }
        if (!doc.authenticate(password)) {
            return res.status(404).json({
                isLogged: false,
                error: 'Email and Password dont Match !'
            })
        }
        const token = createToken(doc, "MANAGER");
        res.cookie('token', token, {
            expires: new Date(Date.now() + 4 * 3600000)
        })
        return token
            ? res.status(200).json({ isLogged: true, token, doc })
            : res.status(500).json({ isLogged: false, error: "cant create token" });

    } catch (e: any) {
        res.status(400).json({
            status: false,
            message: e.message
        });
    }

}

const createManager = async (req: Request, res: Response) => {

    const data = req.body

    try {
        const manager = new Manager(data);
        await manager.save()

        res.status(201).json({
            status: true,
            message: { manager }
        })
    } catch (e: any) {
        res.status(400).json({
            status: false,
            message: e.message
        })
    }
}

const isManager: RequestHandler = async (req, res) => {
    // If this function can be accessed, it means that this manager is logged in
    res.status(200).json({
        status: true,
        message: true
    })
}
export { createManager, login, isManager }