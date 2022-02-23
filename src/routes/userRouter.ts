import { getUsers , registerUser , cinCheck} from "@controllers/userController";
import { addCenter } from "@controllers/centerController";
import express from "express";
const router = express.Router();

router.get("/getUsers", getUsers);
router.post("/registerUser", registerUser);
router.post("/cinCheck", cinCheck);
router.post("/addCenter", addCenter);

export { router };