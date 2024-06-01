import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categories: {
      type: [String], // Define the categories as an array of strings
      required: true,
      enum: ["In-Person Consultation", "Video Consultation", "Home Care Service"] // Specify the allowed values
    }
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
