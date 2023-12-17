import { connectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User";
import { VerifyToken } from "@/lib/service/Token.service";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  await connectDB();
  try {
    const auth = request.cookies.get("token") || "";
    if (!auth) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: 401 }
      );
    }

    const { userId } = await VerifyToken(auth.value);

    if (!userId) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

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
