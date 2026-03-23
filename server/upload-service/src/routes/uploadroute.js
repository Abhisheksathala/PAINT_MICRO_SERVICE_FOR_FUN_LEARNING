import express from "express";
import multer from "multer";
import {
  uploadMedia,
  getallmediabyuser,
} from "../controller/upload.controller.js";
import authenticatedRequest from "../middleware/auth.middleware.js";

const mediaRoute = express.Router();

const upload = multer({
  storage: multer.memoryStorage,
  limits: 10 * 1024 * 1024,
}).single("file");

mediaRoute.use(authenticatedRequest);

mediaRoute.post(
  "/upload",
  (req, res, next) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          success: false,
          message: err.message || "",
        });
      } else if (err) {
        return res.status(500).json({
          success: false,
          message: err.message || "",
        });
      }
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "file not found ",
        });
      }
    });
    next();
  },
  uploadMedia,
);

mediaRoute.get("/get", getallmediabyuser);

export default mediaRoute;
