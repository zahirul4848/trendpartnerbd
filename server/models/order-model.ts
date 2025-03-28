import mongoose, {Schema, Types} from "mongoose";

type TOrderItem = {
  slug: string;
  count: number;
  productId: string;
  productTitle: string;
  image: {
    public_id: string;
    url: string;
  },
  price: number;
}

type TAddress = {
  fullName: string;
  address: string;
  mobile: string;
  email: string;
  // comment?: string;
  // paymentMethod: "cash" | "online";
  // deliveryMethod: "regular" | "express";
}

type TOrderAction = {
  title: string;
  description: string;
}

const orderActionSchema = new Schema<TOrderAction>({
  title: {type: String, required: true},
  description: {type: String, required: true},
}, {timestamps: true});

export type TOrder = {
  orderItems: TOrderItem[];
  orderNumber: string;
  orderActions: TOrderAction[],
  shippingAddress: TAddress,
  paymentMethod: "cash" | "online";
  deliveryMethod: "regular" | "express";
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  comment?: string;
  user: Types.ObjectId;
  isPaid: boolean;
  paidAt: Date;
  // paymentResult: {}
  isDelivered: boolean;
  deliveredAt: Date;
  createdAt: string;
}

const orderSchema = new Schema<TOrder>({
  orderItems: [
    {
      slug: {
        type: String, 
        required: true,
      },
      count: {
        type: Number, 
        required: true,
      },
      productId: {
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
      },
      productTitle: {
        type: String, 
        required: true,
      },
      image: {
        public_id: {
          type: String, 
          required: true,
        },
        url: {
          type: String, 
          required: true,
        },
      },
      price: {
        type: Number, 
        required: true,
      },
    }
  ],
  orderNumber: {
    type: String,
    unique: true,
  },
  orderActions: [orderActionSchema],
  shippingAddress: {
    fullName: {
      type: String, 
      required: true,
    },
    address: {
      type: String, 
      required: true,
    },
    mobile: {
      type: String, 
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  paymentMethod: {
    type: String, 
    required: true,
  },
  deliveryMethod: {
    type: String, 
    required: true,
  },
  itemsPrice: {
    type: Number, 
    required: true,
  },
  shippingPrice: {
    type: Number, 
    required: true
  },
  totalPrice: {
    type: Number, 
    required: true,
  },
  comment: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
  },
  isPaid: {
    type: Boolean, 
    default: false
  },
  paidAt: {type: Date},
  // paymentResult: {}
  isDelivered: {
    type: Boolean, 
    default: false
  },
  deliveredAt: {
    type: Date
  }
}, {
  timestamps: true
})



export default mongoose.model("Order", orderSchema);