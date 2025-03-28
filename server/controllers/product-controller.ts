import { Request, Response } from "express";
import expressAsync from "express-async-handler";
import ProductModel from "../models/product-model";
import slugify from "slugify";
import CategoryModel from "../models/category-model";
import {v2 as cloudinary} from 'cloudinary';
// import { redis } from "../utils/redis";


// get all products // api/product // get // not protected
export const getAllProducts = expressAsync(async(req: Request, res: Response)=> {
  const pageSize = Number(req.query.pageSize) || 0;
  const page = Number(req.query.pageNumber) || 1;
  const order = req.query.order || "";
  const name = req.query.name || "";
  let categoryId = req.query.categoryId || "";
  const categoryName = req.query.categoryName;
  if(categoryName) {
    const category = await CategoryModel.findOne({name: {$regex: categoryName, $options: "i"}});
    if(category) {
      categoryId = category._id.toString();
    }
  }
  const sortOrder: any = order == "newArrivals" ? {createdAt: 1} : order === 'dcba' ? {title: -1} : order === 'abcd' ? {title: 1} : order === 'lowest' ? {price: 1} : order === 'highest' ? {price: -1} : order === 'topRated' ? {rating: -1} : {_id: -1};
  const categoryFilter = categoryId ? {category: categoryId} : {};
  const nameFilter = name ? {title: {$regex: name, $options: "i"}} : {};
  try {
    const count = await ProductModel.countDocuments({...categoryFilter, ...nameFilter});
    const products = await ProductModel.find({...categoryFilter, ...nameFilter}).populate("category").sort(sortOrder).skip(pageSize * (page - 1)).limit(pageSize);
    res.status(201).json({products, pages: Math.ceil(count / pageSize)});
  } catch (err: any) {
    res.status(400);
    throw new Error(err.message);
  }
})

// get all product // api/product/redis // get // not protected
// export const getAllProductFromRedis = expressAsync(async(req: Request, res: Response)=> {
//   try {
//     const redisData = await redis.get("allProducts");
//     if(redisData) {
//       res.status(200).json(JSON.parse(redisData));
//     } else {
//       const products = await ProductModel.find();
//       await redis.set("allProducts", JSON.stringify(products), "EX", 10800);
//       res.status(200).json(products);
//     }
//   } catch (err: any) {
//     res.status(400);
//     throw new Error(err.message);
//   }
// })

// get product by id // api/product/:id // get // not protected
export const getProduct = expressAsync(async(req: Request, res: Response)=> {
  try {
    const product = await ProductModel.findById(req.params.id).populate("category");
    res.status(201).json(product);
  } catch (err: any) {
    res.status(400);
    throw new Error(err.message);
  }
})
// get product by slug // api/product/slug/:slug // get // not protected
export const getProductBySlug = expressAsync(async(req: Request, res: Response)=> {
  try {
    const product = await ProductModel.findOne({slug: req.params.slug}).populate("category");
    res.status(201).json(product);
  } catch (err: any) {
    res.status(400);
    throw new Error(err.message);
  }
})

// create new product // api/product // post // protected by admin
export const createProduct = expressAsync(async(req: Request, res: Response)=> {
  const {
    title,
    price,
    brand,
    color,
    size,
    model,
    condition,
    description,
    metaDescription,
    category,
    stock,
    imageUrls,
  } = req.body;
  const slug = slugify(title).toLowerCase();
  try {
    const newProduct = await ProductModel.create({
      title,
      price,
      brand,
      color,
      size,
      model,
      condition,
      description,
      metaDescription,
      category,
      stock,
      imageUrls,
      slug
    });
    await CategoryModel.updateOne(
      {_id: newProduct.category},
      {$push: {products: [newProduct._id]}},
      {new: true},
    );
    res.status(201).json({message: "Product Created Successfully"});
  } catch (err: any) {
    res.status(400);
    throw new Error(err.message);
  }  
})

// create product by id // api/product/:id // put // protected by admin
export const updateProduct = expressAsync(async(req: Request, res: Response)=> {
  const product = await ProductModel.findById(req.params.id);
  if(product) {
    product.title = req.body.title || product.title;
    product.price = req.body.price || product.price;
    product.brand = req.body.brand || product.brand;
    product.color = req.body.color || product.color;
    product.size = req.body.size || product.size;
    product.description = req.body.description || product.description;
    product.metaDescription = req.body.metaDescription || product.metaDescription;
    product.stock = req.body.stock || product.stock;
    product.slug = req.body.title ? slugify(req.body.title).toLowerCase() : product.slug;
    if (req.body.imageUrls) {
      const imageUrls = product.imageUrls;
      imageUrls.forEach(async(imageUrl)=> {
        const public_id = imageUrl.public_id;
        if(public_id) {
          await cloudinary.uploader.destroy(public_id);
        }
      })
      product.imageUrls = req.body.imageUrls;
    }
    if(req.body.category && req.body.category !== product.category.toString()) {
      await CategoryModel.updateOne(
        {_id: product.category},
        {$pull: {products: product._id}},
        {new: true},
      )
      await CategoryModel.updateOne(
        {_id: req.body.category},
        {$push: {products: [product._id]}},
        {new: true},
      )
      product.category = req.body.category;
    }
    await product.save();
    res.status(201).json({message: "Product Updated Successfully"});
  } else {
    res.status(400);
    throw new Error("Product Not Found");
  }
})


// delete product by id // api/product/:id // delete // protected by Admin
export const deleteProduct = expressAsync(async(req: Request, res: Response)=> {
  const product = await ProductModel.findById(req.params.id);
  if(product) {
    await CategoryModel.updateOne(
      {_id: product.category},
      {$pull: {products: {$in: [product._id]}}},
      {new: true},
    )
    
    await ProductModel.deleteOne({_id: product._id});
    res.status(200).json({message: "Product Deleted Successfully"});
  } else {
    res.status(400);
    throw new Error("Product Not Found");
  }
})

// review product by id // api/product/:id/review // post // protected by user
export const createReview = expressAsync(async(req: Request, res: Response)=> {
  const product = await ProductModel.findById(req.params.id);
  if(product) {
    const isReviewed = product.reviews.find(x=> x.userId === req.user._id);
    if(isReviewed) {
      res.status(400);
      throw new Error("You have already submitted a review");
    } else {
      const review = {
        userId: req.user._id,
        clientName: req.user.name,
        comment: req.body.comment,
        rating: req.body.rating,
      };
      product.reviews.push(review);
      product.rating = product.reviews.reduce((a, c)=> c.rating + a, 0) / product.reviews.length;
      await product.save();
      res.status(201).json({message: "You have successfully create a rating"});
    }
  } else {
    res.status(400);
    throw new Error("Product Not Found");
  }
})