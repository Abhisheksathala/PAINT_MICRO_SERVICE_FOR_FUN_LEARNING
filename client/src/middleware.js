import { auth } from "./auth";

export default auth((req) => {
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");
  const isAuthuser = !!req.auth;

  if (isLoginPage) {
    if (isAuthuser) {
      return Response.redirect(new URL("/", req.url));
    }
    return null;
  }
  if(!isAuthuser){
    return  Response.redirect(new URL("/login", req.url));
  }
});


export const config = {
  matcher:['/','/editor/:path',"/login"]
}