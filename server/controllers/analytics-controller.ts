import { Request, Response } from "express";
import expressAsync from "express-async-handler";
import OrderModel from "../models/order-model";
import CategoryModel from "../models/category-model";
import ProductModel from "../models/product-model";
import UserModel from "../models/user-model";



// get all analytics // api/analytics // get // protected by admin
export const getAllAnalytics = expressAsync(async(req: Request, res: Response)=> {
  let year = new Date().getFullYear();
  try {
    const thisYearSale = await OrderModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $year: "$createdAt" }, year],
          },
          isPaid : true
        }
      },
      {
        $group: {
          _id: { $year: "$createdAt"},
          itemsPrice: { $sum: { $toInt: "$itemsPrice" } }
        }
      }
    ]);
    const totalCategories = await CategoryModel.aggregate([
      {
        $group: {
          _id: null,
          numberOfCategories: {$sum: 1}
        }
      }
    ]);
    const totalProducts = await ProductModel.aggregate([
      {
        $group: {
          _id: null,
          numberOfProducts: {$sum: 1}
        }
      }
    ]);
    const totalUsers = await UserModel.aggregate([
      {
        $group: {
          _id: null,
          numberOfUsers: {$sum: 1}
        }
      }
    ]);

    // monthly sales
    const monthlySales = await OrderModel.aggregate([
      {
        $match: {
          isPaid: true,
        }
      },
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt"
            }
          },
          totalSales: {$sum: '$itemsPrice'}
        }
      }
    ]).limit(12);
    const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const monthlySalesArray = monthlySales.map((monthlySale)=> {
      return {...monthlySale, month: monthArray[monthlySale._id.month - 1]};
    });
    
    // pending order list
    const pendingOrders = await OrderModel.find({orderActions: {$size: 1}}).limit(5);
    
    res.status(200).json({thisYearSale, totalCategories, totalProducts, totalUsers, pendingOrders, monthlySalesArray, });
  } catch (err: any) {
    res.status(400);
    throw new Error(err.message);
  }
})