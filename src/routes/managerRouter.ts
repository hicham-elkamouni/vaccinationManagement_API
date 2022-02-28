import express from "express";
const router = express.Router();
import {
    addCenter,
    deleteCenter,
    getAllCenters,
    getCenter,
    updateCenter,
    createManager,
    login
} from "@controllers/index";
import { Auth } from "@middlewares/index";



router.get("/getAllCenters", Auth, getAllCenters);
router.post("/addCenter", addCenter);
router.get("/getCenter/:id", getCenter);
router.delete("/deleteCenter/:id", deleteCenter);
router.put("/updateCenter/:id", updateCenter);
router.post("/createManager", createManager);
router.post("/login", login);

export { router };