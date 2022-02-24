import { getUsers , registerUser , cin_shot_Check} from "@controllers/userController";
import express from "express";
const router = express.Router();

router.get("/getUsers", getUsers);
router.post("/registerUser", registerUser);
router.get("/check/:cin/:shot", cin_shot_Check);

export { router };