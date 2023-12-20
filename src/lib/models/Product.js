import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    minlength: [3, "The length of product name can be minimum 3 characters"],
  },
  desc: {
    type: String,
    required: [true, "Product desc is required"],
    trim: true,
    minlength: [3, "The length of product desc can be minimum 3 characters"],
  },

  price: {
    type: Number,
    required: [true, "Product price is required"],
    trim: true,
    validate: {
      validator: (v) => v > 0,
      message: (props) =>
        `${props.value} is not a valid price, price must be greater than 0`,
    },
  },
  quantity: {
    type: Number,
    required: [true, "Product quantity is required"],
    trim: true,
    validate: {
      validator: (v) => v > 0,
      message: (props) =>
        `${props.value} is not a valid quantity, quantity must be greater than 0`,
    },
  },
  sold: {
    type: Number,
    trim: true,
    default: 0,
  },
  shipping: {
    type: Number,
    trim: true,
    default: 0, //shipping free or paid amount
  },
  image: {
    type: Buffer,
    contentType: String,
    // required: [true, "Product image is required"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export const ProductModel =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
