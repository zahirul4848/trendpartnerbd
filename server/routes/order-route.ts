import express from "express";
import {isAuth, isAdmin} from "../middleware/auth-middleware";
import { createOrder, deleteOrder, deliverOrder, getAllOrders, getOrder, getUserOrders, getUserWiseOrders, orderSuccess, payOrder, paymentOrder, updateOrderAction } from "../controllers/order-controller";

const router = express.Router();

router.route("/").post(createOrder).get(isAuth, isAdmin, getAllOrders);
router.route("/profile").get(isAuth, getUserOrders);

//router.route("/notification").get(getNotification);

router.route("/user/:userId").get(isAuth, isAdmin, getUserWiseOrders);
router.route("/paid/:id").put(isAuth, isAdmin, payOrder);
router.route("/action/:id").put(isAuth, isAdmin, updateOrderAction);
router.route("/payment/:id").post(isAuth, isAdmin, paymentOrder);
router.route("/deliver/:id").put(isAuth, isAdmin, deliverOrder);
router.route("/success/:tranId").get(orderSuccess);
router.route("/:id").get(getOrder).delete(isAuth, isAdmin, deleteOrder);


export default router;