import { NextResponse } from "next/server";

export const middleware = (request) => {
  const pathVariable = request.nextUrl.pathname;

  //all user acces this route
  const publicRoute = [
    "/",
    "/auth/forget-password",
    "/auth/update-password",
    "/auth/register",
    "/auth/login",
  ];
  const isLoggedIn = request.cookies.get("token");
  if (publicRoute.includes(pathVariable) && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!publicRoute.includes(pathVariable) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
};

export const config = {
  //protected route
  matcher: [
    "/auth/profile",
    "/auth/update-profile",
    "/auth/updatepassword",
    "/auth/users/:path*",
  ],
};
