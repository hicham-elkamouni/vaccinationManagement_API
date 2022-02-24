import { addCenter, deleteCenter } from "@controllers/centerController";
import express from "express";
const router = express.Router();

router.post("/addCenter", addCenter);
router.delete("/deleteCenter/:id", deleteCenter);
// router.get("/getCenter/:id", getCenter);
// router.get("/getCenters", getCenter);
// router.delete("/updateCenter/:id", updateCenter);

export { router };