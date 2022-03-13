import express from "express";
const router = express.Router();

import {
    loginAdmin,
    createManager,
    removeManager
} from "@controllers/index";

router.post("/loginAdmin", loginAdmin);
router.post("/createManager", createManager);
router.delete("/removeManager/:id", removeManager);

export { router };