
import authenticatedRequest from "../middleware/auth.middleware.js";
import express from "express";
import {getsubscribtion} from "../controller/subscrintion.controller.js";

const subscriptionRoute = express.Router();

subscriptionRoute.use(authenticatedRequest);

subscriptionRoute.get("/", getsubscribtion);



export default subscriptionRoute;
