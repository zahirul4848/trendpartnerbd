import mongoose, {Schema} from "mongoose";

type TCounter = {
  _id: Schema.Types.ObjectId;
  seq: number;
}

const CounterSchema = new Schema<TCounter>({
  // _id: {type: String, required: true},
  seq: { type: Number, default: 1000 }
});


export default mongoose.model('Counter', CounterSchema);