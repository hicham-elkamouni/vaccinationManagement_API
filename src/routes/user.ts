import { getUser } from "@controllers/user";
import express from "express";
const router = express.Router();

router.get("/getUser", getUser);

export { router };