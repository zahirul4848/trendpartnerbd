import express from "express";
import {isAuth, isAdmin} from "../middleware/auth-middleware";
import {categoryUpload, productUpload} from "../controllers/upload-controller";
import { upload } from "../middleware/upload-middleware";

const router = express.Router();

router.route("/categoryUpload").post(isAuth, isAdmin, upload.single("image"), categoryUpload);
router.route("/productUpload").post(isAuth, isAdmin, upload.array("images", 4), productUpload);

// router.route("/categoryUpload").post(isAuth, isAdmin, categoryUpload);
// router.route("/productUpload").post(isAuth, isAdmin, productUpload);


export default router;