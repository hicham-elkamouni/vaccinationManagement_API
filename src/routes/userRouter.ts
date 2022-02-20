import { getUser , registerUser } from "@controllers/userController";
import express from "express";
const router = express.Router();

router.get("/getUser", getUser);
router.post("/registerUser", registerUser);

export { router };