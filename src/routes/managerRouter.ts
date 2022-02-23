import { addCenter } from "@controllers/centerController";
import express from "express";
const router = express.Router();

router.post("/addCenter", addCenter);

export { router };