import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const middleware = (request) => {
  const pathVariable = request.nextUrl.pathname;

  const publicRoute = [
    //public routes also login users
    "/",
    "/auth/forget-password",
    "/auth/update-password",
    "/auth/register",
    "/auth/login",
    "/products/:path*",
  ];

  //user logic
  const isLoggedIn = request.cookies.get("token");

  //the route is public and the user is logged in
  if (publicRoute.includes(pathVariable) && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //the route is protected and the user is not logged in
  if (!publicRoute.includes(pathVariable) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  //admin logic
  const token = request.cookies.get("token");
  const tokenValue = token.value;
  const decodedToken = jwt.decode(tokenValue);
  const isAdmin = decodedToken?.admin;

  // the route is an admin route and the user is not an admin
  // all route access for admin
  if (!isAdmin && pathVariable.startsWith("/auth/admin/")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
};

export const config = {
  matcher: [
    // users login route also admin
    "/auth/profile",
    "/auth/update-profile",
    "/auth/updatepassword",

    // only admin route
    "/auth/admin/:path*",
  ],
};
