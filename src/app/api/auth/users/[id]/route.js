import { connectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

//get single user by id
export const GET = async (req) => {
  try {
    //logged in check by token
    const token = req.cookies.get("token") || "";
    if (!token) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: 401 }
      );
    }

    const tokenValue = token.value || "";
    const decodedToken = jwt.decode(tokenValue);
    const isAdmin = decodedToken?.admin;

    //admin check by token
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Only admin see details user" },
        { status: 402 }
      );
    }

    await connectDB();
    const id = req.url.split("users/")[1];
    const user = await UserModel.findById(id).select("-password");
    if (!user) {
      return NextResponse.json(
        { error: "User not found this id" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { msg: "user get successfully", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "unable to get users" }, { status: 500 });
  }
};

//delete user by id
export const DELETE = async (req) => {
  try {
    //logged in check by token
    const token = req.cookies.get("token") || "";
    if (!token) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: 401 }
      );
    }

    const tokenValue = token.value || "";
    const decodedToken = jwt.decode(tokenValue);
    const isAdmin = decodedToken?.admin;

    //admin check by token
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Only admin delete this user" },
        { status: 402 }
      );
    }

    await connectDB();
    const id = await req.url.split("users/")[1];
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    return NextResponse.json(
      { msg: "user deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "unable to delete this user" },
      { status: 500 }
    );
  }
};

//update user by id
export const PUT = async (req) => {
  try {
    //logged in check by token
    const token = req.cookies.get("token") || "";
    if (!token) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: 401 }
      );
    }

    const tokenValue = token.value || "";
    const decodedToken = jwt.decode(tokenValue);
    const isAdmin = decodedToken?.admin;

    //admin check
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Only admin update this user" },
        { status: 402 }
      );
    }
    await connectDB();
    const id = req.url.split("users/")[1];
    const { name, email } = await req.json();

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { $set: { name, email } },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "user not found" });
    }
    return NextResponse.json({
      msg: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
