import { connectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User";
import { NextResponse } from "next/server";

//get single user
export const GET = async (req) => {
  await connectDB();
  try {
    //logged in check
    const isLoggedIn = req.cookies.get("token") || "";
    if (!isLoggedIn) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: 401 }
      );
    }

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
  await connectDB();
  try {
    //logged in check
    const isLoggedIn = req.cookies.get("token") || "";
    if (!isLoggedIn) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: 401 }
      );
    }

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
    //logged in check
    const isLoggedIn = (await req.cookies.get("token")) || "";
    if (!isLoggedIn) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: 401 }
      );
    }
    await connectDB();
    const id = req.url.split("users/")[1];
    const { name, email } = await req.json();

    // const existUser = await UserModel.find({ email });
    // if (existUser) {
    //   return NextResponse.json(
    //     { error: "this email is already used by another one" },
    //     { status: 401 }
    //   );
    // }
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
