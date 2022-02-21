import { getUsers , registerUser } from "@controllers/userController";
import express from "express";
const router = express.Router();

router.get("/getUsers", getUsers);
router.post("/registerUser", registerUser);

export { router };