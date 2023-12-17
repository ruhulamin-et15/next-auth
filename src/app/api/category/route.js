import { connectDB } from "@/lib/config/db";
import { CategoryModel } from "@/lib/models/Category";
import { NextResponse } from "next/server";
import slugify from "slugify";
import jwt from "jsonwebtoken";

//create category
export const POST = async (request) => {
  try {
    //login check
    const token = request.cookies.get("token") || "";
    if (!token) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: 404 }
      );
    }

    // const decodedToken = jwt.verify(token, process.env.AUTH_JWT);

    // const userId = decodedToken._id;

    await connectDB();
    const { name } = await request.json();

    const newCategory = await CategoryModel.create({
      name: name,
      slug: slugify(name),
    });
    return NextResponse.json(
      { msg: "Category Created Successfully", newCategory },
      { payload: newCategory },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create category!" },
      { status: 500 }
    );
  }
};
