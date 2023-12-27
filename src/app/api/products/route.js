import { connectDB, isLoggedIn } from "@/lib/config/db";
import { ProductModel } from "@/lib/models/Product";
import { VerifyToken } from "@/lib/service/Token.service";

import { NextResponse } from "next/server";

//create product for login user
export const POST = async (req) => {
  try {
    //check login user
    const loggedInResponse = await isLoggedIn(req);
    if (loggedInResponse) {
      return loggedInResponse;
    }

    const token = req.cookies.get("token" || "");
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
      creater: userId,
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

//get products for all users
export const GET = async (req) => {
  try {
    await connectDB();
    const products = await ProductModel.find({})
      .populate("creater")
      .populate("category")
      .limit(4)
      .exec();

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
