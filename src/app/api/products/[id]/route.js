import { connectDB } from "@/lib/config/db";
import { ProductModel } from "@/lib/models/Product";
import { NextResponse } from "next/server";

//get single product for everyone
export const GET = async (req) => {
  try {
    const id = req.url.split("products/")[1];
    const singleProduct = await ProductModel.findById(id)
      .populate("category")
      .populate("creater");
    if (!singleProduct) {
      return NextResponse.json({ error: "product not found" }, { status: 401 });
    }
    return NextResponse.json(
      { msg: "Get single product success", singleProduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internel server error" },
      { status: 500 }
    );
  }
};

//product update
export const PUT = async (req) => {
  try {
    const token = req.cookies.get("token") || "";
    if (!token) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: 401 }
      );
    }

    const id = await req.url.split("products/")[1];
    const { name, desc, price, quantity, sold, shipping, image, category } =
      await req.json();

    await connectDB();
    const updateProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          desc,
          price,
          quantity,
          sold,
          shipping,
          image,
          category,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateProduct) {
      return NextResponse.json(
        { error: "product update failed" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { msg: "Prouduct updated successfully", updateProduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internel server error" },
      { status: 500 }
    );
  }
};

//product delete
export const DELETE = async (req) => {
  try {
    const token = req.cookies.get("token") || "";
    if (!token) {
      return NextResponse.json(
        { error: "please login first" },
        { status: 401 }
      );
    }
    const id = await req.url.split("products/")[1];
    await ProductModel.findByIdAndDelete(id);
    return NextResponse.json(
      { msg: "Product Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internel server error" },
      { status: 500 }
    );
  }
};
