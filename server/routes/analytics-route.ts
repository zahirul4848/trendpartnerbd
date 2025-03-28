import express from "express";
import {isAuth, isAdmin} from "../middleware/auth-middleware";
import { getAllAnalytics } from "../controllers/analytics-controller";

const router = express.Router();

router.route("/").get(isAuth, isAdmin, getAllAnalytics);


export default router;