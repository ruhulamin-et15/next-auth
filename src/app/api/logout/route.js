import { NextResponse } from "next/server";

export const POST = async (request) => {
  const res = NextResponse.json(
    { msg: "Logout successfully" },
    { status: 200 }
  );

  res.cookies.delete("token");
  return res;
};
