import { Request, Response } from "express";
import expressAsync from "express-async-handler";
import jwt, { Secret } from "jsonwebtoken";
import { generateToken } from "../utils/generate-token";
import UserModel from "../models/user-model";
import ProductModel from "../models/product-model";
import { emailTamplateForgotPassword, mg } from "../utils/mailgun";
import { validateEmail } from "../utils/utils";


// create new user // api/user // post    // not protected
export const registerUser = expressAsync(async(req: Request, res: Response)=> {
  const {name, email, password} = req.body;
  const userExists = await UserModel.findOne({email});
  if(!userExists && validateEmail(email)) {
    try {
      const user = await UserModel.create({name, email, password});
      const token = generateToken(user);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      });
    } catch (err: any) {
      res.status(400);
      throw new Error(err.message);
    }
  } else {
    res.status(400);
    throw new Error("User already exists with this email");
  }
});

// login user // api/user/login // post  // not protected
export const loginUser = expressAsync(async(req: Request, res: Response)=> {
  const {email, password} = req.body;
  const user = await UserModel.findOne({email});
  if(user && (await user.matchPassword(password))) {
    const token = generateToken(user);
    
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid user or password");
  }
});


export const socialAuth = expressAsync(async(req: Request, res: Response)=> {
  try {
    const {email, name} = req.body;
    const user = await UserModel.findOne({email});
    if(user) { 
      const token = generateToken(user);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      });
    } else {
      const newUser = await UserModel.create({email, name});
      const newUserToken = generateToken(newUser);
      res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token: newUserToken,
      });
    }
  } catch (error: any) {
    res.status(401);
    throw new Error(error.message || error.error);
  }
});


// forgot password // api/user/forgotpassword // put  // not protected
export const forgotPassword = expressAsync(async(req: Request, res: Response)=> {
  const {email} = req.body;
  const user = await UserModel.findOne({email});
  if(user) {
    const token = generateToken(user);
    const messageData = {
      from: "TrendPartnerBD <johirul016@gmail.com>",
      to: user.email,
      subject: "Password Reset Link",
      html: emailTamplateForgotPassword(user.name, token),
    }
    await user.updateOne({resetLink: token});
    mg.messages.create(
      process.env.MAILGUN_DOMAIN as string, 
      messageData
    ).then(msg => {
      //console.log(msg)
      res.status(200).json({message: 'Password reset link has been sent to your email address, please check your email'});
    }
    ).catch(err => {
      res.status(400);
      throw new Error(err.message || err.error);
    }
    );
  } else {
    res.status(401);
    throw new Error("Invalid Email");
  }
});

// forgot password // api/user/forgotpassword // put  // not protected
export const resetPassword = expressAsync(async(req: Request, res: Response)=> {
  const {password, token} = req.body;
  if(token && password) {
    jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY as Secret, async(err: any, decode: any)=> {
      if(err) {
        res.status(401);
        throw new Error("Invalid or expired token");
      } else {
        //const {id} = decode as JwtPayload;
        const user = await UserModel.findOne({resetLink: token});
        if(user) {
          user.password = password;
          user.resetLink = "";
          await user.save();

          const messageData = {
            from: "TrendPartnerBD <johirul016@gmail.com>",
            to: user.email,
            subject: "Password Reset Successful",
            text: 'Your password has been reset successfully.',
          }
          mg.messages.create(
            process.env.MAILGUN_DOMAIN as string, 
            messageData
          ).then(msg => {
            //console.log(msg)
            res.status(200).json({message: 'Password Reset Successful'});
          }
          ).catch(err => {
            res.status(401);
            throw new Error(err.message || err.error);
          }
          );

        } else {
          res.status(401);
          throw new Error("User Not Found");
        }
      }
    })
  } else {
    res.status(401);
    throw new Error("No reset link or password Found");
  }
});

// edit user profile // api/user/profile // put // protected by user
export const updateUserProfile = expressAsync(async(req: Request, res: Response)=> {
  const user = await UserModel.findById(req.user._id);
  if(!user?.password) {
    res.status(401);
    throw new Error("Your account created by social provider. Can not be updated");
    return;
  }
  if(user) {
    user.name = req.body.name || user.name;
    if(validateEmail(req.body.email)) {
      user.email = req.body.email;
    }
    if(req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    const token = generateToken(updatedUser);
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// user wishlist // api/user/wishlist // put  // protected by user
export const toggleWishlist = expressAsync(async(req: Request, res: Response)=> {
  const {productId} = req.body;
  const user = await UserModel.findById(req.user._id);
  if(user && productId) {
    if(user.wishlist.includes(productId)) {
      await user.updateOne({
        $pull: {wishlist: productId}
      });
      res.status(200).json({message: "Removed from wishlist"});
    } else {
      await user.updateOne({
        $push: {wishlist: productId}
      });
      res.status(200).json({message: "Added to wishlist"});
    }
  } else {
    res.status(400);
    throw new Error("User or product id not found");
  }
});

// add to wishlist // api/user/add-wishlist // put  // protected by user
export const addToWishlist = expressAsync(async(req: Request, res: Response)=> {
  const {productId} = req.body;
  const user = await UserModel.findById(req.user._id);
  if(user && productId) {
    if(user.wishlist.includes(productId)) {
      res.status(200).json({message: "Already Added to wishlist"});
    } else {
      await user.updateOne({
        $push: {wishlist: productId}
      });
      res.status(200).json({message: "Added to wishlist"});
    }
  } else {
    res.status(400);
    throw new Error("User or product id not found");
  }
});

// remove from wishlist // api/user/remove-wishlist // put  // protected by user
export const removeFromWishlist = expressAsync(async(req: Request, res: Response)=> {
  const {productId} = req.body;
  const user = await UserModel.findById(req.user._id);
  if(user && productId) {
    if(user.wishlist.includes(productId)) {
      await user.updateOne({
        $pull: {wishlist: productId}
      });
      res.status(200).json({message: "Removed from wishlist"});
    } else {
      res.status(200).json({message: "Already removed from wishlist"});
    }
  } else {
    res.status(400);
    throw new Error("User or product id not found");
  }
});

// get user profile // api/user/profile // get  // protected by user
export const getUserProfile = expressAsync(async(req: Request, res: Response)=> {
  try {
    const user = await UserModel.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (err: any) {
    res.status(401);
    throw new Error(err.message);
  }
});

// get user wishlist // api/user/wishlist // get  // protected by user
export const getWishlist = expressAsync(async(req: Request, res: Response)=> {
  const user = await UserModel.findById(req.user._id);
  if(user) {
    let wishlist: any = [];
    const products = await Promise.all(user.wishlist.map((productId: any)=> {
      return ProductModel.findById(productId);
    }));
    res.status(200).json(wishlist.concat(...products).filter((x: any)=> x !== null));
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

// get all users // api/user // get  // protected by admin
export const getAllUsers = expressAsync(async(req: Request, res: Response)=> {
  const pageSize = Number(req.query.pageSize) || 0;
  const page = Number(req.query.pageNumber) || 1;
  const name = req.query.name || "";
  const nameFilter = name ? {name: {$regex: name, $options: "i"}} : {};
  try {
    const count = await UserModel.countDocuments({...nameFilter});
    const users = await UserModel.find({...nameFilter}).sort({createdAt: -1}).skip(pageSize * (page - 1)).limit(pageSize).select("-password");
    res.status(200).json({users, pages: Math.ceil(count / pageSize)});
  } catch (err: any) {
    res.status(401);
    throw new Error(err.message);
  }
});

// get user by id // api/user/:id // get  // protected by admin
export const getUserById = expressAsync(async(req: Request, res: Response)=> {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(401);
    throw new Error(err.message);
  }
});

// get user by id and update // api/user/:id // put  // protected by admin
export const updateUserById = expressAsync(async(req: Request, res: Response)=> {
  const user = await UserModel.findById(req.params.id);
  if(user) {
    user.role = req.body.role || user.role;
    await user.save();
    res.status(200).json({message: "User role updated successfully"});
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// delete user by id // api/user/:id // delete  // protected by admin
export const deleteUser = expressAsync(async(req: Request, res: Response)=> {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "User deleted successfully"});
  } catch (err: any) {
    res.status(401);
    throw new Error(err.message);
  }
});

// delete user // api/user/deleteme // delete  // protected by user
export const deleteMyAccount = expressAsync(async(req: Request, res: Response)=> {
  const {email, password} = req.body;
  const user = await UserModel.findOne({email});
  if(user && (await user.matchPassword(password))) {
    await UserModel.findByIdAndDelete(user._id);
    res.status(200).json({message: "Account deleted successfully"});
  } else {  
    res.status(401);
    throw new Error("Invalid User or Password");
  }
});