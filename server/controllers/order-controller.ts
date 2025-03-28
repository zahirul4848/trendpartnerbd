import { Request, Response } from "express";
import expressAsync from "express-async-handler";
import OrderModel from "../models/order-model";
import CounterModel from "../models/counter-model";
import { emailTemplateOrderCreate, mg } from "../utils/mailgun";
//import { io } from "../socket/socket";


// get all orders // api/order // get // protected by admin
export const getAllOrders = expressAsync(async(req: Request, res: Response)=> {
  const pageSize = Number(req.query.pageSize) || 0;
  const page = Number(req.query.pageNumber) || 1;
  const orderNumber = req.query.orderNumber || "";
  const orderNumberFilter = orderNumber ? {orderNumber} : {};
  try {
    const count = await OrderModel.countDocuments({...orderNumberFilter});
    const orders = await OrderModel.find({...orderNumberFilter}).populate("user", "name").sort({createdAt: -1}).skip(pageSize * (page - 1)).limit(pageSize);
    res.status(201).json({orders, pages: Math.ceil(count / pageSize)});
  } catch (err: any) {
    res.status(400);
    throw new Error(err.message);
  }
})

// get user's orders // api/order/profile // get // protected by user
export const getUserOrders = expressAsync(async(req: Request, res: Response)=> {
  try {
    const orders = await OrderModel.find({user: req.user._id}).sort({createdAt: -1}).limit(20);
    res.status(201).json(orders);
  } catch (err: any) {
    res.status(400);
    throw new Error(err.message);
  }
})

// get user wise orders // api/order/user/:userId // get // protected by admin
export const getUserWiseOrders = expressAsync(async(req: Request, res: Response)=> {
  try {
    const orders = await OrderModel.find({user: req.params.userId}).sort({createdAt: -1});
    res.status(201).json(orders);
  } catch (err: any) {
    res.status(400);
    throw new Error(err.message);
  }
})

// get order by id // api/order/:id // get // not protected
export const getOrder = expressAsync(async(req: Request, res: Response)=> {
  try {
    const order = await OrderModel.findById(req.params.id);
    res.status(201).json(order);
  } catch (err: any) {
    res.status(400);
    throw new Error(err.message);
  }
})

// create new order // api/order // post // not protected
export const createOrder = expressAsync(async(req: Request, res: Response)=> {
  if(req.body.orderItems.length === 0) {
    res.status(400);
    throw new Error("Cart is empty");
  } else {
    try {
      const counter = await CounterModel.findOneAndUpdate( {}, {$inc: { seq: 1} },);
      if(!counter) {
        await CounterModel.create({seq: 1000});
        res.status(200).json({message: "Order not completed. Please try again"});      
        return;
      }

      const orderAction = {
        title: "Pending",
        description: "Order placed successfully"
      }
     
      const order = new OrderModel({
        orderNumber: counter?.seq,
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        deliveryMethod: req.body.deliveryMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
        comment: req.body.comment,
        user: req.body.userId,
      });
      order.orderActions.push(orderAction);
      const createdOrder = await order.save();
      const messageData = {
        from: "Sailors <johirul016@gmail.com>",
        to: req.body.shippingAddress.email,
        subject: 'Order Placed Successfully',
        html: emailTemplateOrderCreate(createdOrder, req.body.shippingAddress.fullName),
      }
      mg.messages.create(process.env.MAILGUN_DOMAIN as string, messageData).then().catch(
        err=> console.log(err)
      );
      res.status(201).json({message: "Order Placed Successfully", orderId: createdOrder._id, orderNumber: createdOrder.orderNumber});      
    } catch (err: any) {
      res.status(400);
      throw new Error(err.message);
    }  
  }
});

// update order action // api/order/action/:id // put // protected by admin
export const updateOrderAction = expressAsync(async(req: Request, res: Response)=> {
  const title = req.body.title;
  const orderAction = {
    title,
    description: req.body.description,
  }

  const order = await OrderModel.findById(req.params.id);
  if(order) {
    if(title == "Completed" || title == "Paid") {
      order.isPaid = true;
    }
    order.orderActions.unshift(orderAction);
    await order.save();
    // const messageData = {
    //   from: "Sailors <johirul016@gmail.com>",
    //   to: req.body.shippingAddress.email,
    //   subject: 'Order Placed Successfully',
    //   html: emailTemplateOrderCreate(createdOrder, req.body.shippingAddress.fullName),
    // }
    // mg.messages.create(process.env.MAILGUN_DOMAIN as string, messageData).then().catch(
    //   err=> console.log(err)
    // );
    res.status(201).json({message: "Order Updated Successfully"});
  } else {
    res.status(400);
    throw new Error("Order Not Found");
  }
  
});

// delete order by id // api/order/:id // delete // protected by admin
export const deleteOrder = expressAsync(async(req: Request, res: Response)=> {
  try {
    await OrderModel.findByIdAndDelete(req.params.id);
    res.status(201).json({message: "Order Successfully deleted"});
  } catch (err: any) {
    res.status(400);
    throw new Error(err.message);
  }
})

// pay order by id // api/order/paid/:id // put // protected by admin
export const payOrder = expressAsync(async(req: Request, res: Response)=> {
  const order = await OrderModel.findById(req.params.id);
  if(order) {
    order.isPaid = true,
    order.paidAt = new Date();
    // order.paymentResult =
    await order.save();
    res.status(201).json({message: "Order Updated as Paid"});
  } else {
    res.status(400);
    throw new Error("Order Not Found");
  }  
})

// deliver order by id // api/order/deliver/:id // put // protected by admin
export const deliverOrder = expressAsync(async(req: Request, res: Response)=> {
  const order = await OrderModel.findById(req.params.id);
  if(order) {
    order.isDelivered = true,
    order.deliveredAt = new Date();
    await order.save();
    res.status(201).json({message: "Order Updated as Delivered"});
  } else {
    res.status(400);
    throw new Error("Order Not Found");
  }  
})



// payment order by id // api/order/deliver/:id // put // protected by user
export const paymentOrder = expressAsync(async(req: Request, res: Response)=> {
  const order = await OrderModel.findById(req.params.id);
  
  if(order) {
    const data: any = {
      total_amount: order.totalPrice as number,
      currency: 'BDT',
      tran_id: order.orderNumber as string, // use unique tran_id for each api call
      success_url: `http://localhost:5001/api/order/success/${order.orderNumber}`,
      fail_url: 'http://localhost:5173/fail',
      cancel_url: 'http://localhost:5173/cancel',
      ipn_url: 'http://localhost:5173/ipn',
      shipping_method: 'Courier',
      product_name: 'Computer.',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: req.user.name,
      cus_email: req.user.name,
      cus_add1: order.shippingAddress.address,
      cus_phone: order.shippingAddress.mobile,
      ship_name: order.shippingAddress.fullName,
      ship_add1: order.shippingAddress.address,
    };
    
    // const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    // sslcz.init(data).then(apiResponse => {
    //   // Redirect the user to payment gateway
    //   let GatewayPageURL = apiResponse.GatewayPageURL
    //   res.status(201).json({url: GatewayPageURL})
    //   console.log('Redirecting to: ', GatewayPageURL)
    // });
    res.status(201).json({url: "https://www.trendpeakbd.com"})
  } else {
    res.status(400);
    throw new Error("Order Not Found");
  }
})



// payment order by id // api/order/success/:id // put // protected by user
export const orderSuccess = expressAsync(async(req: Request, res: Response)=> {
  console.log("Here i am")
  const order = await OrderModel.findOne({orderNumber: req.params.tranId});
  if(order) {
    order.isPaid = true,
    order.paidAt = new Date;
    // order.paymentResult =
    await order.save();
    console.log("Order Paid Success");
    res.status(201).json({message: "Order Updated as Paid"});
    res.redirect("http://localhost:5173/order/100029");
  } else {
    res.status(400);
    throw new Error("Order Not Found");
  }
})



// get user's orders // api/order/profile // get // protected by user
// export const getNotification = expressAsync(async(req: Request, res: Response)=> {
//   try {
//     io.emit('newOrderNotification', "New Order Placed");
//     res.status(201).json({message: "New Order Placed"});
//   } catch (err: any) {
//     res.status(400);
//     throw new Error(err.message);
//   }
// })