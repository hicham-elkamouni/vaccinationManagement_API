import { IManager } from "@interfaces/index";
import { Manager } from "@models/Manager";
import { createToken } from "@utils/index";
import { RequestHandler } from "express";
import { AxiosError } from "axios"
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

const isManager: RequestHandler = async (req, res) => {
    // If this function can be accessed, it means that this manager is logged in
    res.status(200).json({
        status: true,
        message: true
    })
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

const getAllManagers: RequestHandler = async (req, res) => {
    try {
        const docs = await Manager.find()
        const data = await docs.map((e) => {
            return {
                _id: e._id,
                fName: e.fName,
                lName: e.lName,
                email: e.email,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,

            }
        })
        res.status(200).json({
            status: true,
            message: data
        })
    } catch (err: any) {

        res.status(400).json({
            status: false,
            message: err.message
        })
    }
}

const getManager: RequestHandler = async (req, res) => {
    const id = req.params.id
    try {
        const doc = await Manager.findById({ _id: id })
        if (doc) {
            return res.status(200).json({
                status: true,
                message: { fName: doc.fName, lName: doc.lName, createdAt: doc.createdAt, updatedAt: doc.updatedAt, email: doc.email }
            })
        }
        res.status(200).json({
            status: true,
            message: "not Found"
        })
    } catch (err: any) {
        res.status(400).json({
            status: false,
            message: err.message
        })
    }
}
const updateManager: RequestHandler = async (req, res) => {
    try {
        var id = req.params.id
        const filter = { _id: id }
        await Manager.findOneAndUpdate(filter, req.body);
        res.status(200).json({
            status: true,
            message: "Updated successfully",
        })
    } catch (e: any) {
        res.status(400).json({
            status: false,
            message: e.message
        })
    }
}

export { createManager, login, isManager, removeManager, getAllManagers, getManager, updateManager }