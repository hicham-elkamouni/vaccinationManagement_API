import { getUsers , registerUser } from "@controllers/userController";
import { addCenter } from "@controllers/centerController";
import express from "express";
const router = express.Router();

router.get("/getUsers", getUsers);
router.post("/registerUser", registerUser);
router.post("/addCenter", addCenter);

export { router };