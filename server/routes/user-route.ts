import express from "express";
import { isAdmin, isAuth } from "../middleware/auth-middleware";
import { 
  registerUser, 
  loginUser, 
  toggleWishlist, 
  getUserProfile, 
  getWishlist, 
  updateUserProfile, 
  forgotPassword, 
  resetPassword, 
  getAllUsers, 
  deleteUser,
  deleteMyAccount,
  socialAuth,
  getUserById,
  updateUserById,
  addToWishlist,
  removeFromWishlist
 } from "../controllers/user-controller";

const router = express.Router();

router.route("/").post(registerUser).get(isAuth, isAdmin, getAllUsers);
router.route("/login").post(loginUser);
router.route("/social-auth").post(socialAuth);
router.route("/forgotPassword").put(forgotPassword);
router.route("/resetPassword").put(resetPassword);
router.route("/wishlist").put(isAuth, toggleWishlist).get(isAuth, getWishlist);
router.route("/add-wishlist").put(isAuth, addToWishlist);
router.route("/remove-wishlist").put(isAuth, removeFromWishlist);
router.route("/profile").get(isAuth, getUserProfile).put(isAuth, updateUserProfile);
router.route("/deleteme").delete(isAuth, deleteMyAccount);
router.route("/:id").delete(isAuth, isAdmin, deleteUser).get(isAuth, isAdmin, getUserById).put(isAuth, isAdmin, updateUserById);


export default router;