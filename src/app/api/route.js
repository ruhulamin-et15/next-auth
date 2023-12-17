import { NextResponse } from "next/server";

export const GET = async (req) => {
  return NextResponse.json(
    { msg: "this api is working properly" },
    { status: 200 }
  );
};
