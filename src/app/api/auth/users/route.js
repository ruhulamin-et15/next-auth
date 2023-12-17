import { connectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

//admin create/get/update/delete all users,
//create user

//get all users
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
        { error: "Only admin see users list" },
        { status: 402 }
      );
    }
    await connectDB();
    const users = await UserModel.find({});
    return NextResponse.json(
      { msg: "get all users successfully", users },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "unable to get users" }, { status: 500 });
  }
};
