import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  dateOfBirth: { type: Date, 
    default: Date.now
  },
  wishlist: {
    type: Array,
    default: [],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", UserSchema);