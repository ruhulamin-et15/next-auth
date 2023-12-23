import { connectDB } from "@/lib/config/db";
import { ProductModel } from "@/lib/models/Product";
import { VerifyToken } from "@/lib/service/Token.service";

import { NextResponse } from "next/server";

//create product
export const POST = async (req) => {
  try {
    //login check
    const token = req.cookies.get("token") || "";
    if (!token) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: 401 }
      );
    }

    const { userId } = await VerifyToken(token.value);

    await connectDB();
    const { name, desc, price, quantity, sold, shipping, image, category } =
      await req.json();
    const product = await ProductModel.create({
      name,
      desc,
      price,
      quantity,
      sold,
      shipping,
      image,
      category,
      userId: userId,
    });
    return NextResponse.json(
      { msg: "Product created successfully", product },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internel server error" },
      { status: 500 }
    );
  }
};

//get products
export const GET = async (req) => {
  try {
    await connectDB();
    const products = await ProductModel.find({}).populate("category");
    if (!products) {
      return NextResponse.json(
        { error: "products not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { msg: "products get success", products },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internel server error" },
      { status: 500 }
    );
  }
};
