import mongoose, {Schema, Types} from "mongoose";

export interface ICategory {
  name: string;
  imageUrl: {
    public_id: string;
    url: string;
  };
  products: Types.ObjectId[];
}


const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    }
  },
  products: [
    {
      type: Types.ObjectId,
      ref: "Product"
    },
  ]
}, {
  timestamps: true,
});


export default mongoose.model("Category", categorySchema);