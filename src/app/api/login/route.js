import { connectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User";
import { GenerateToken } from "@/lib/service/Token.service";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  //login checked
  const isLoggedIn = req.cookies.get("token") || "";

  if (isLoggedIn) {
    return NextResponse.json(
      { error: "You alrady logged in" },
      { status: 401 }
    );
  }

  await connectDB();
  const { email, password } = await req.json();
  const existUser = await UserModel.findOne({ email });

  //user check
  if (!existUser) {
    return NextResponse.json(
      { error: "User not found this email!" },
      { status: 400 }
    );
  }

  //password check
  const isMatch = await existUser.ConfirmPassword(password);
  if (!isMatch) {
    return NextResponse.json({ error: "Wrong Password!" }, { status: 400 });
  }

  //token
  const token = await GenerateToken(existUser);

  const response = NextResponse.json(
    { msg: "User Login Successfully" },
    { status: 200 }
  );
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
  });

  return response;
};
