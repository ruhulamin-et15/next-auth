import { connectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User";
import { GenerateToken } from "@/lib/service/Token.service";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  //login checked by token from cookies
  const isLoggedIn = req.cookies.get("token") || "";

  if (isLoggedIn) {
    return NextResponse.json(
      { error: "You alrady logged in" },
      { status: 401 }
    );
  }

  // // token decoded formula from cookies
  // const tokenValue = isLoggedIn.value || "";
  // const decodedToken = jwt.decode(tokenValue);
  // const isBanned = decodedToken?.banned;

  //this formula for POST use
  await connectDB();
  const { email, password } = await req.json();
  const existUser = await UserModel.findOne({ email });

  //exist user check
  if (!existUser) {
    return NextResponse.json(
      { error: "User not found this email!" },
      { status: 401 }
    );
  }

  //bannned user check
  if (existUser.isBanned) {
    return NextResponse.json(
      { error: "You are Banned! Please contact Admin" },
      { status: 401 }
    );
  }

  //password check
  const isMatch = await existUser.ConfirmPassword(password);
  if (!isMatch) {
    return NextResponse.json({ error: "Wrong Password!" }, { status: 400 });
  }

  //generate token
  const token = await GenerateToken(existUser);

  const response = NextResponse.json(
    { msg: "User Login Successfully" },
    { status: 200 }
  );

  //cookies set
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
  });

  return response;
};
