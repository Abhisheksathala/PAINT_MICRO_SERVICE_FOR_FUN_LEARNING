import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.AUTH_GOOGLE_ID);

async function authMiddleware(req, res, next) {
  const autherHeader = req.headers["authorization"];

  const token = autherHeader && autherHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();


    console.log("payload",payload)

    req.user = {
      userId: payload["sub"],
      email: payload["email"],
      name: payload["name"],
    };
    // add user ID to headers for downstream services

    req.headers["x-user-id"] = payload["sub"];
    // optionally add email and name if needed by downstream services
    req.headers["x-user-email"] = payload["email"];
    req.headers["x-user-name"] = payload["name"];
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(403).json({ message: "Forbidden || inavliad token",error:Response.error?.message });
  }
}

export default authMiddleware;
