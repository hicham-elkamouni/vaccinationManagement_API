import express from "express";
const router = express.Router();

import {
    loginAdmin,
    createManager,
    removeManager,
    getManager,
    getAllManagers,
    updateManager
} from "@controllers/index";

router.post("/loginAdmin", loginAdmin);
router.post("/createManager", createManager);
router.delete("/removeManager/:id", removeManager);
router.get("/getManager/:id", getManager);
router.get("/getAllManagers", getAllManagers);
router.patch("/updateManager/:id", updateManager);

export { router };