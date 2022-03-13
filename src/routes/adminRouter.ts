import express from "express";
const router = express.Router();

import {
    loginAdmin
} from "@controllers/index";

router.post("/loginAdmin", loginAdmin);

export { router };