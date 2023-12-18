import { connectDB } from "@/lib/config/db";
import { VerifyToken } from "@/lib/service/Token.service";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserModel } from "@/lib/models/User";

export const PUT = async (req) => {
  try {
    //logged in check
    const isLoggedIn = req.cookies.get("token") || "";
    if (!isLoggedIn) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: 401 }
      );
    }

    const { password, cpassword } = await req.json();
    if (cpassword !== password) {
      return NextResponse.json(
        {
          error: "New Password & Confirm Password are not match",
        },
        { status: 401 }
      );
    }

    //token check
    const { userId } = await VerifyToken(isLoggedIn.value);
    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await connectDB();
    await UserModel.findByIdAndUpdate(userId, {
      $set: {
        password: hashPassword,
      },
    });

    return NextResponse.json(
      { msg: "User Password Updated Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "User Password Update failed" },
      { status: 500 }
    );
  }
};
