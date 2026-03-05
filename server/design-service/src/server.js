import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
// import dotenv from "dotenv";
import designRoute from "./routes/design.routes.js";

// dotenv.config();

const app = express();
const PORT = process.env?.PORT || 5001;
const MONGO =
  process.env?.MONGO_URI || "mongodb://localhost:27017/design-service";

mongoose
  .connect(MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("DB:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
app.get("/", (req, res) => {
  res.send("Design Service is running");
});

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/designs", designRoute);

async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Design Service is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

// Define routes here

startServer();
