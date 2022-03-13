import express from "express";
const router = express.Router();

import {
    loginAdmin,
    createManager
} from "@controllers/index";

router.post("/loginAdmin", loginAdmin);
router.post("/createManager", createManager);

export { router };