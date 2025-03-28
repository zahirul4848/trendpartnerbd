import mongoose, {Schema, Types} from "mongoose";

type Review = {
  userId: string;
  clientName: string;
  comment: string;
  rating: number;
}

type TProduct = {
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
  category: {_id: Types.ObjectId},
  reviews: Review[],
}

const reviewSchema = new Schema<Review>({
  userId: {type: String, required: true},
  clientName: {type: String, required: true},
  comment: {type: String, required: true},
  rating: {type: Number, required: true},
}, {timestamps: true});

const productSchema = new Schema<TProduct>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  imageUrls: [
    {
      public_id: {type: String},
      url: {type: String},
    }
  ],
  description: {
    type: String,
    required: true,
  },
  metaDescription: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  reviews: [reviewSchema],
}, {
  timestamps: true,
});


export default mongoose.model("Product", productSchema);