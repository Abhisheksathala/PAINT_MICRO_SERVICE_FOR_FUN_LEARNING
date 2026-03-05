import "dotenv/config";
import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import helmet from "helmet";
import authMiddleware from "./middleware/auth-middleware.js";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

// proxy options

const proxyOptions = {
  proxyReqPathResolver: (req) => {
    return req.originalUrl.replace(/^\/v1/, "/api");
  },
  proxyErrorHandler: (err, res, next) => {
    console.error("Proxy error:", err);
    res.status(500).json({ message: "Proxy error", error: err.message });
  },
};

app.use(
  "/v1/designs",
  authMiddleware,
  proxy(process.env.DESIGN || "http:localhost:5001", {
    ...proxyOptions,
  }),
);
app.use(
  "/v1/media",
  authMiddleware,
  proxy(process.env.UPLOADS || "http:localhost:5002", {
    ...proxyOptions,
    parseReqBody: false,
  }),
);

// TODO:add extra logic here
app.use(
  "/v1/subscriptions",
  authMiddleware,
  proxy(process.env.SUBSCRIPTION || "http:localhost:5003", {
    ...proxyOptions,
  }),
);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Design Service: ${process.env.DESIGN || "http:localhost:5001"}`);
  console.log(
    `Upload Service: ${process.env.UPLOADS || "http:localhost:5002"}`,
  );
  console.log(
    `Subscription Service: ${process.env.SUBSCRIPTION || "http:localhost:5003"}`,
  );
});
