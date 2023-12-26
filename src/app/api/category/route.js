import { connectDB, isAdmin, isLoggedIn } from "@/lib/config/db";
import { CategoryModel } from "@/lib/models/Category";
import { NextResponse } from "next/server";
import { VerifyToken } from "@/lib/service/Token.service";

//create category
export const POST = async (request) => {
  try {
    //check login user
    const loggedInResponse = await isLoggedIn(request);
    if (loggedInResponse) {
      return loggedInResponse;
    }

    //check admin
    const adminResponse = await isAdmin(request);
    if (adminResponse) {
      return adminResponse;
    }

    const token = request.cookies.get("token" || "");
    const { userId } = await VerifyToken(token.value);

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
      creater: userId,
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
    const categories = await CategoryModel.find({}).populate("creater");
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
