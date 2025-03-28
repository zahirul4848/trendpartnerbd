import express from "express";
import {isAuth, isAdmin} from "../middleware/auth-middleware";
import { createProduct, createReview, deleteProduct, getAllProducts, getProduct, getProductBySlug, updateProduct } from "../controllers/product-controller";

const router = express.Router();

router.route("/").post(isAuth, isAdmin, createProduct).get(getAllProducts);
// router.route("/redis").get(getAllProductFromRedis);
router.route("/slug/:slug").get(getProductBySlug);
router.route("/:id").delete(isAuth, isAdmin, deleteProduct).put(isAuth, isAdmin, updateProduct).get(getProduct);
router.route("/:id/review").post(isAuth, createReview);


export default router;