import { connectDB, isLoggedIn } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User";
import { VerifyToken } from "@/lib/service/Token.service";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    //check login user
    const loggedInResponse = await isLoggedIn(req);
    if (loggedInResponse) {
      return loggedInResponse;
    }

    const token = req.cookies.get("token") || "";
    const { userId } = await VerifyToken(token.value);

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
