import { Request, Response } from "express";
import expressAsync from "express-async-handler";
import CategoryModel from "../models/category-model";
import {v2 as cloudinary} from 'cloudinary';
// import { redis } from "../utils/redis";

// get all category // api/category // get // not protected
export const getAllCategory = expressAsync(async(req: Request, res: Response)=> {
  const pageSize = Number(req.query.pageSize) || 0;
  const page = Number(req.query.pageNumber) || 1;
  const name = req.query.name || "";
  const nameFilter = name ? {name: {$regex: name, $options: "i"}} : {};
  try {
    const count = await CategoryModel.countDocuments({...nameFilter});
    const categories = await CategoryModel.find({...nameFilter}).sort({createdAt: -1}).skip(pageSize * (page - 1)).limit(pageSize);
    res.status(200).json({categories, pages: Math.ceil(count / pageSize)});
  } catch (err: any) {
    res.status(400);
    throw new Error(err.message);
  }
})

// get all category // api/category/redis // get // not protected
// export const getAllCategoryFromRedis = expressAsync(async(req: Request, res: Response)=> {
//   try {
//     const redisData = await redis.get("allCategories");
//     if(redisData) {
//       res.status(200).json(JSON.parse(redisData));
//     } else {
//       const categories = await CategoryModel.find().sort({createdAt: -1});
//       await redis.set("allCategories", JSON.stringify(categories), "EX", 10800);
//       res.status(200).json(categories);
//     }
//   } catch (err: any) {
//     res.status(400);
//     throw new Error(err.message);
//   }
// })

// get a category // api/category/:id // get // protected by admin
export const getCategory = expressAsync(async(req: Request, res: Response)=> {
  try {
    const category = await CategoryModel.findById(req.params.id);
    res.status(201).json(category);
  } catch (err: any) {
    res.status(400);
    throw new Error(err.message);
  }
})

// create new category // api/category // post // protected by admin
export const createCategory = expressAsync(async(req: Request, res: Response)=> {
  const {name, imageUrl} = req.body;
  try {
    await CategoryModel.create({
      name, 
      imageUrl
    });
    res.status(201).json({message: "Category Created Successfully"});
  } catch (err: any) {
    res.status(400);
    throw new Error(err.message);
  }  
})

// create new category // api/category/:id // delete // protected by admin
export const deleteCategory = expressAsync(async(req: Request, res: Response)=> {
  const category = await CategoryModel.findById(req.params.id);
  if(category && category?.products.length > 0) {
    res.status(400);
    throw new Error("Category Cannot be deleted as it has associated products");
    return;
  }

  if(category) {
    const public_id = category.imageUrl.public_id;
    if(public_id) {
      await cloudinary.uploader.destroy(public_id);
    }
    await CategoryModel.findOneAndDelete(category._id);
    res.status(201).json({message: "Category Deleted Successfully"})
  } else {
    res.status(400);
    throw new Error("Category Not Found with this ID");
  }  
})


// update category // api/category/:id // put // protected by admin
export const updateCategory = expressAsync(async(req: Request, res: Response)=> {
  const category = await CategoryModel.findById(req.params.id);
  if(category) {
    category.name = req.body.name || category.name;
    if (req.body.imageUrl) {
      const public_id = category.imageUrl.public_id;
      if(public_id) {
        await cloudinary.uploader.destroy(public_id);
        category.imageUrl = req.body.imageUrl;
      }
    }
    await category.save();
    res.status(201).json({message: "Category Updated Successfully"});
  } else {
    res.status(400);
    throw new Error("Category Not Found with this ID");
  }  
})