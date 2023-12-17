import { connectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  //logged in checked
  const isLoggedIn = req.cookies.get("token") || "";
  if (isLoggedIn) {
    return NextResponse.json(
      { error: "You alrady logged in, please logged out & try it" },
      { status: 401 }
    );
  }

  await connectDB();
  const { name, email, password } = await req.json();

  //user check
  const existUser = await UserModel.findOne({ email });
  if (existUser) {
    return NextResponse.json({ error: "User already exist!" }, { status: 400 });
  }
  await UserModel.create({
    name,
    email,
    password,
  });
  return NextResponse.json(
    { msg: "User Registration Successfully" },
    { status: 201 }
  );
};
