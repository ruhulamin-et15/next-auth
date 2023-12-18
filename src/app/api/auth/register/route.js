import { connectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  //logged in checked
  const isLoggedIn = req.cookies.get("token") || "";
  if (isLoggedIn) {
    return NextResponse.json(
      { error: "You alrady logged in" },
      { status: 401 }
    );
  }

  await connectDB();
  const { name, email, password, phone, country } = await req.json();

  //user check
  const existUser = await UserModel.findOne({ email });
  if (existUser) {
    return NextResponse.json({ error: "User already exist!" }, { status: 401 });
  }

  const newUser = await UserModel.create({
    name,
    email,
    password,
    phone,
    country,
  });
  return NextResponse.json(
    { msg: "User Registration Successfully", newUser },
    { status: 201 }
  );
};
