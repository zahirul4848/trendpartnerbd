import mongoose, {Schema} from "mongoose";
import bcryptjs from "bcryptjs";

interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  wishlist: any;
  resetLink: string;
  matchPassword: (enterPassword: string)=> Promise<boolean>; 
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 30,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    max: 30,
  },
  password: {
    type: String,
    min: 6,
    max: 40,
  },
  role: {
    type: String,
    enum: ["CLIENT", "ADMIN"],
    default: "CLIENT",
  },
  wishlist: {
    type: Array,
    default: [],
  },
  resetLink: {
    type: String,
  }
}, {
  timestamps: true,
});

userSchema.pre("save", async function(next) {
  if(!this.isModified("password")) {
    next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);  
})

userSchema.methods.matchPassword = async function(enterPassword: string) {
  return await bcryptjs.compare(enterPassword, this.password);
};


export default mongoose.model("User", userSchema);