import express from "express";
const router = express.Router();

import {
    loginAdmin,
    createManager,
    removeManager,
    getManager,
    getAllManagers,
    updateManager,
    isAdmin
} from "@controllers/index";
import { Auth } from "@middlewares/index";

router.get("/isAdmin", Auth("ADMIN"), isAdmin);
router.post("/login", loginAdmin);
router.post("/createManager", createManager);
router.delete("/removeManager/:id", removeManager);
router.get("/getManager/:id", getManager);
router.get("/getAllManagers", getAllManagers);
router.patch("/updateManager/:id", updateManager);

export { router };