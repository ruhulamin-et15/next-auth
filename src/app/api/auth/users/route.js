import { connectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User";
import { NextResponse } from "next/server";
import { VerifyToken } from "@/lib/service/Token.service";

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

    const { admin } = await VerifyToken(token.value);

    //admin check by token
    if (!admin) {
      return NextResponse.json(
        { error: "Only admin see users list" },
        { status: 401 }
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
