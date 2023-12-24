import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name is required"],
      minLength: [3, "The length of category name can be minimum 3 characters"],
    },
    // creatorName: {
    //   type: String,
    // },
    // creatorId: {
    //   type: String,
    // },
    creater: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const CategoryModel =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
