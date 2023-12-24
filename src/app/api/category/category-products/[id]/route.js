import { connectDB } from "@/lib/config/db";
import { ProductModel } from "@/lib/models/Product";
import { NextResponse } from "next/server";

// get all products by category
export const GET = async (req) => {
  try {
    await connectDB();
    const category = req.url.split("category-products/")[1];
    const products = await ProductModel.find({ category })
      .populate("category")
      .populate("creater");
    return NextResponse.json({ msg: "success", products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "unable to get user products" },
      { status: 500 }
    );
  }
};
