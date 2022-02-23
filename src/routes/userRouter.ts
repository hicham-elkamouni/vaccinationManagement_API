import { getUsers , registerUser , cin_shot_Check} from "@controllers/userController";
import { addCenter } from "@controllers/centerController";
import express from "express";
const router = express.Router();

router.get("/getUsers", getUsers);
router.post("/registerUser", registerUser);
router.post("/check", cin_shot_Check);
router.post("/addCenter", addCenter);

export { router };