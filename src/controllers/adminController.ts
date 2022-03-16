import { Admin } from "@models/Admin";
import { createToken } from "@utils/index";
import { RequestHandler } from "express";

const loginAdmin: RequestHandler = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        const doc = await Admin.findOne({ email })
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
        const token = createToken(doc, "ADMIN");
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

const isAdmin: RequestHandler = async (req, res) => {
    // If this function can be accessed, it means that this admin is logged in and his token is valid
    res.status(200).json({
        status: true,
        message: true
    })
}

export { loginAdmin, isAdmin }