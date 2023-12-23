import { connectDB } from "@/lib/config/db";
import { ProductModel } from "@/lib/models/Product";
import { NextResponse } from "next/server";

// get all products an user
export const GET = async (req) => {
  try {
    await connectDB();
    const userId = req.url.split("user-products/")[1];

    const products = await ProductModel.find({ userId }).populate("category");
    if (!products) {
      return NextResponse.json({ error: "not found products" });
    }

    return NextResponse.json(
      { msg: "user get products success", products },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "unable to get user products" },
      { status: 500 }
    );
  }
};
