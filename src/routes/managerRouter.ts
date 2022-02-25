import { addCenter, deleteCenter , getAllCenters } from "@controllers/centerController";
import express from "express";
const router = express.Router();

router.post("/addCenter", addCenter);
router.delete("/deleteCenter/:id", deleteCenter);
router.get("/getAllCenters", getAllCenters);
// router.get("/getCenter/:id", getCenter);
// router.delete("/updateCenter/:id", updateCenter);

export { router };