import {
  getUserDesigns,
  getUserDesignByID,
  saveDesign,
  DeletDesign,
} from "./../controller/design.comtroller.js";
import authenticatedRequest from "../middleware/auth.middleware.js";
import express from "express";

const designRoute = express.Router();

designRoute.use(authenticatedRequest);

designRoute.get("/", getUserDesigns);
designRoute.get("/:id", getUserDesignByID);
designRoute.post("/", saveDesign);
designRoute.delete("/:id", DeletDesign);

export default designRoute;
