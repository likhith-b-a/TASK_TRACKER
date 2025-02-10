import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  details: [
    {
      type: String,
    }
  ],
  image:{
    type:String,
  },
  streak:{
    type: Number,
    default: 0,
  },
  title:{
    type: String,
  },
  description:{
    type:String
  },
  completedDays:[
    {
      type:Date,
    }
  ],
}, { timestamps: true });

export const User = mongoose.model("User", userSchema)