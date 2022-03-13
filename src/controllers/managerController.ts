import { Manager } from "@models/Manager";
import { createToken } from "@utils/index";
import { RequestHandler } from "express";

const login: RequestHandler = async (req, res) => {
    console.log("inside login route")
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
        res.cookie('token', token, { expires: new Date(Date.now() + 4 * 3600000) })
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

const createManager: RequestHandler = async (req, res) => {

    const data = req.body

    try {
        const manager = new Manager(data);
        await manager.save()

        const docs = await Manager.find({});
        console.log(docs);

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

const removeManager: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params
        const doc = await Manager.findById({ _id: id })//find the Driver
        // check if exists
        if (doc) {
            // delete
            await doc.remove()
            res.status(200).json({
                status: true,
                message: "Deleted successfully"
            })
        } else {
            res.status(404).json({
                status: false,
                message: "Not Found"
            })
        }
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

export { createManager, login, isManager, removeManager }