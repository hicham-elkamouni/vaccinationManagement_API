import { addCenter, deleteCenter , getAllCenters , getCenter} from "@controllers/centerController";
import express from "express";
const router = express.Router();

router.get("/getAllCenters", getAllCenters);
router.post("/addCenter", addCenter);
router.get("/getCenter/:id", getCenter);
router.delete("/deleteCenter/:id", deleteCenter);
// router.delete("/updateCenter/:id", updateCenter);

export { router };