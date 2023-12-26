import { connectDB, isAdmin, isLoggedIn } from "@/lib/config/db";
import { CategoryModel } from "@/lib/models/Category";
import { NextResponse } from "next/server";

// get single category
export const GET = async (req) => {
  try {
    await connectDB();
    const id = req.url.split("category/")[1];
    const category = await CategoryModel.findById(id).populate("creater");

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
    //check login user
    const loggedInResponse = await isLoggedIn(req);
    if (loggedInResponse) {
      return loggedInResponse;
    }

    //check admin
    const adminResponse = await isAdmin(req);
    if (adminResponse) {
      return adminResponse;
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
    //check login user
    const loggedInResponse = await isLoggedIn(req);
    if (loggedInResponse) {
      return loggedInResponse;
    }

    //check admin
    const adminResponse = await isAdmin(req);
    if (adminResponse) {
      return adminResponse;
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
