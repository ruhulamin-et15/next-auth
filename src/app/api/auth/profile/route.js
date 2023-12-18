import { connectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User";
import { VerifyToken } from "@/lib/service/Token.service";
import { NextResponse } from "next/server";

//this formula is perfect for get data
export const GET = async (request) => {
  try {
    //login check by token
    const isLoggedIn = request.cookies.get("token") || "";
    if (!isLoggedIn) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: 401 }
      );
    }

    //verify token
    const { userId } = await VerifyToken(isLoggedIn.value);
    if (!userId) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    // user find by id from cookies id
    await connectDB();
    const existUser = await UserModel.findById(userId).select("-password");

    if (!existUser) {
      return NextResponse.json(
        { error: "User does not found" },
        { status: 401 }
      );
    }
    return NextResponse.json({
      msg: "data fetch successfully",
      user: existUser,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
};
