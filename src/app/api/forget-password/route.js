import { UserModel } from "@/lib/models/User";
import { SendEmail } from "@/lib/service/Mail.service";
import { GenerateForgetToken } from "@/lib/service/Token.service";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { email } = await request.json();
  const existUser = await UserModel.findOne({ email });

  if (!existUser) {
    return NextResponse.json(
      { error: "User not found this email!" },
      { status: 404 }
    );
  }

  //token
  const token = await GenerateForgetToken(existUser, email);
  const mailResponse = await SendEmail(existUser.name, token, email);
  const response = NextResponse.json(
    {
      msg: "Email Successfully send, check your mail",
    },
    { status: 200 }
  );

  // response.cookies.set("forget-token", token, {
  //   httpOnly: true,
  //   secure: true,
  // });

  return response;
};
