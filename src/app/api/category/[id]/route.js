import { connectDB } from "@/lib/config/db";
import { CategoryModel } from "@/lib/models/Category";
import { VerifyToken } from "@/lib/service/Token.service";
import { NextResponse } from "next/server";

// get single category
export const GET = async (req) => {
  try {
    await connectDB();
    const id = req.url.split("category/")[1];
    const category = await CategoryModel.findById(id);

    if (!category) {
      return NextResponse.json(
        { error: "category not found this id" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { msg: "category get successfully", category },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to get category!" },
      { status: 500 }
    );
  }
};

// delete category
export const DELETE = async (req) => {
  try {
    const token = (await req.cookies.get("token")) || "";
    if (!token) {
      return NextResponse.json(
        { error: "Please Login First" },
        { status: 401 }
      );
    }

    const { admin } = await VerifyToken(token.value);

    if (!admin) {
      return NextResponse.json(
        { errro: "Only admin delete category" },
        { status: 401 }
      );
    }
    await connectDB();
    const id = req.url.split("category/")[1];
    const deleteCategory = await CategoryModel.findByIdAndDelete(id);

    if (!deleteCategory) {
      return NextResponse.json(
        { error: "Category deleted failed" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { msg: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to delete category!" },
      { status: 500 }
    );
  }
};

// update category
export const PUT = async (req) => {
  try {
    const token = req.cookies.get("token") || "";
    if (!token) {
      return NextResponse.json(
        { error: "Please Login First" },
        { status: 401 }
      );
    }

    const { admin } = await VerifyToken(token.value);

    if (!admin) {
      return NextResponse.json(
        { errro: "Only admin update category" },
        { status: 401 }
      );
    }

    await connectDB();
    const id = req.url.split("category/")[1];
    const { name } = await req.json();
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
        },
      },
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return NextResponse.json(
        { errro: "Cannot updated category" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { msg: "Category updated successfully", updatedCategory },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to update category!" },
      { status: 500 }
    );
  }
};
