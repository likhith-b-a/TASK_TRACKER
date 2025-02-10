import mongoose from "mongoose";

const dbName = "TASK_TRACKER";

export default async () => {
  try{
    const connectionInstance = await mongoose.connect(`${process.env.mongoDB_URI}/${dbName}`);
    console.log("db connection Established");
  }catch(err){
    console.log("Database connection Failed", err);
    process.exit(1);
  }
}