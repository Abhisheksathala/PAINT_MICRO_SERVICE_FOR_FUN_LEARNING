import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";

const app = express();
const PORT = process.env?.PORT || 5003;
const MONGO =
  process.env?.MONGO_URI || "mongodb://localhost:27017/design-service";

mongoose
  .connect(MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
app.get("/", (req, res) => {
  res.send("subscribtion Service is running");
});

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`upload Service is running on port ${PORT}${MONGO}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

// Define routes here

startServer();
