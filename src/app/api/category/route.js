import { connectDB } from "@/lib/config/db";
import { CategoryModel } from "@/lib/models/Category";
import { NextResponse } from "next/server";
import { VerifyToken } from "@/lib/service/Token.service";

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

    const { admin } = await VerifyToken(token.value);

    //admin check
    if (!admin) {
      return NextResponse.json(
        { error: "Only admin create category" },
        { status: 401 }
      );
    }

    await connectDB();
    const { name } = await request.json();

    //exist category check
    const existUser = await CategoryModel.findOne({ name });
    if (existUser) {
      return NextResponse.json(
        { error: "Category already exist!" },
        { status: 400 }
      );
    }

    const newCategory = await CategoryModel.create({
      name,
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

//get all categories
export const GET = async (req) => {
  try {
    await connectDB();
    const categories = await CategoryModel.find({});
    return NextResponse.json(
      { msg: "get categories success", categories },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to get all categories!" },
      { status: 500 }
    );
  }
};
