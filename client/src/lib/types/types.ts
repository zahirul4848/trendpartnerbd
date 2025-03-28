import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name must contain at least 3 characters").max(40, "Name must contain not more than 40 characters"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data)=> data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

export type TRegisterSchema = z.infer<typeof registerSchema>;

export const profileSettingSchema = z.object({
  name: z.string().min(3, "Name must contain at least 3 characters").max(40, "Name must contain not more than 40 characters"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  confirmPassword: z.string().optional(),
}).refine((data)=> data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

export type TProfileSettingSchema = z.infer<typeof profileSettingSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;


export const forgetPasswordSchema = z.object({
  email: z.string().email(),
});

export type TForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;


export const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data)=> data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const reviewSchema = z.object({
  // rating: z.number().min(1).max(5),
  rating: z.preprocess((a) => parseInt(z.string().parse(a),10),
  z.number().min(1).max(5)),
  comment: z.string().min(6, "comment must be at least 3 characters"),
  
});

export type TReviewSchema = z.infer<typeof reviewSchema>;

export const addressSchema = z.object({
  fullName: z.string().min(3, "Name must contain at least 3 characters").max(40, "Name must contain not more than 40 characters"),
  email: z.string().email(),
  address: z.string().min(6, "Address must be at least 6 characters"),
  mobile: z.string().length(11, "Invalid Mobile Number"),
  comment: z.string().optional(),
  paymentMethod: z.enum(["cash", "online"]),
  deliveryMethod: z.enum(["regular", "express"]),
});

export type TAddressSchema = z.infer<typeof addressSchema>;

export type TUserProfile = {
  name: string;
  email: string;
  password: string;
  role: string;
  wishlist: string[];
}

export type TUser = {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export type TCategory = {
  _id: string;
  name: string;
  imageUrl: {
    public_id: string;
    url: string;
  };
  products: string[];
}

export type TProduct = {
  _id: string;
  title: string;
  slug: string;
  price: number;
  brand: string;
  color: string;
  size: string;
  imageUrls: {
    public_id: string;
    url: string;
  }[];
  description: string;
  metaDescription: string;
  rating: number;
  stock: number;
  category: {
    _id: string;
    name: string;
  },
  reviews: TReview[],
}

export type TReview = {
  _id: string;
  userId: string;
  clientName: string;
  comment: string;
  rating: number;
  createdAt: string;
}

export type TCart = {
  slug: string;
  stock: number;
  count: number;
  productId: string;
  productTitle: string;
  image: {
    public_id: string;
    url: string;
  },
  price: number;
}

export type TAddress = {
  fullName: string;
  address: string;
  mobile: string;
  email: string;
  comment?: string;
  paymentMethod: "cash" | "online";
  deliveryMethod: "regular" | "express";
}

export type TOrderAction = {
  _id: string;
  createdAt: string;
  title: string;
  description: string;
}

export type TOrder = {
  _id: string;
  orderItems: TCart[];
  orderNumber: string;
  orderActions: TOrderAction[],
  shippingAddress: {
    fullName: string;
    address: string;
    mobile: string;
    email: string;
  },
  paymentMethod: "cash" | "online";
  deliveryMethod: "regular" | "express";
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  comment?: string;
  user?: string;
  isPaid: boolean;
  paidAt: Date;
  // paymentResult: {}
  isDelivered: boolean;
  deliveredAt: Date;
  createdAt: string;
}

export type TOrderBody = {
  orderItems: TCart[];
  shippingAddress: {
    fullName: string;
    address: string;
    mobile: string;
    email: string;
  },
  paymentMethod: "cash" | "online";
  deliveryMethod: "regular" | "express";
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  comment?: string;
  userId?: string;
}