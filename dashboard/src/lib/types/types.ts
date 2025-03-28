import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;


export const categorySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 carecters"),
  // image: z
  //   .custom<File>((v) => v instanceof File, {
  //     message: 'Image is required',
  //   })
});

export type TCategorySchema = z.infer<typeof categorySchema>;


export const productSchema = z.object({
  title: z.string().min(3, "Name must be at least 3 carecters").trim(),
  price: z.preprocess((a) => parseInt(z.string().parse(a),10),
  z.number()),
  brand: z.string().trim().optional(),
  color: z.string().trim().optional(),
  size: z.string().trim().optional(),
  description: z.string().trim().optional(),
  metaDescription: z.string().trim().optional(),
  stock: z.preprocess((a) => parseInt(z.string().parse(a),10),
  z.number()),
  category: z.string(),
});

export type TProductSchema = z.infer<typeof productSchema>;


export const userSchema = z.object({
  role: z.enum(["ADMIN", "CLIENT"]),
});

export type TUserSchema = z.infer<typeof userSchema>;

export const orderActionBodySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(6, "Description must be at least 6 characters"),
});

export type TOrderActionBody = z.infer<typeof orderActionBodySchema>;

export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "CLIENT";
  wishlist?: string[];
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
  category: {_id: string},
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

export type TAnalytics = {
  thisYearSale: {
    _id: number;
    itemsPrice: number;
  }[];
  totalProducts: {
    numberOfProducts: number;
  }[];
  totalUsers: {
    numberOfUsers: number;
  }[];
  totalCategories: {
    numberOfCategories: number;
  }[];
  monthlySalesArray: {
    month: string;
    totalSales: number
  }[];
  pendingOrders: TOrder[];
}