import { connectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User";
import { VerifyToken } from "@/lib/service/Token.service";
import { NextResponse } from "next/server";

export const PUT = async (request) => {
  connectDB();

  const { name, email } = await request.json();

  //logged in check
  const auth = request.cookies.get("token") || "";

  if (!auth) {
    return NextResponse.json({ error: "Please login first" }, { status: 401 });
  }

  //token check
  const { userId } = await VerifyToken(auth.value);
  if (!userId) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }

  const existUser = await UserModel.findByIdAndUpdate(userId, {
    $set: {
      name,
      email,
    },
  });

  //user check by id
  if (!existUser) {
    return NextResponse.json({ error: "User does not found" }, { status: 401 });
  }

  return NextResponse.json(
    { msg: "Profile Updated Successfully" },
    { status: 201 }
  );
};
