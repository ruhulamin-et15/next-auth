import { connectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User";
import { VerifyToken } from "@/lib/service/Token.service";
import { NextResponse } from "next/server";

export const PUT = async (request) => {
  //logged in check
  const isLoggedIn = request.cookies.get("token") || "";
  if (!isLoggedIn) {
    return NextResponse.json({ error: "Please login first" }, { status: 401 });
  }

  //token verify
  const { userId } = await VerifyToken(isLoggedIn.value);
  if (!userId) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }

  await connectDB();
  const { name, email, phone, country } = await request.json();

  //user update using id from cookies
  const existUser = await UserModel.findByIdAndUpdate(userId, {
    $set: {
      name,
      email,
      phone,
      country,
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
