import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: 
    { type: String, 
        required: true },
    description:
     { type: String, 
        required: true },
    date: 
    { type: Date, 
        required: true },
    user: 
    { type: mongoose.Schema.Types.ObjectId,
         ref: "User", required: true },
  });
  


export default mongoose.model("Task", taskSchema);