import express from "express";
//import errorHandler from "./utils/error-handler.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
// #region route imports
import authRoute from "./routes/auth_r";
import announcementRoute from "./routes/announcement_r";
import chatRoute from "./routes/chat_r";
import playerRoute from "./routes/player_r";
import teamRoute from "./routes/team_r";
import adminRoute from "./routes/admin_r";
import matchRoute from "./routes/match_r";
import { getApp, initializeApp, ServiceAccount } from "firebase-admin/app";
import admin from "firebase-admin";

require("dotenv").config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS!);
const fire: ServiceAccount = {
  projectId: process.env.FIRABASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

initializeApp({
  credential: admin.credential.cert(fire),
});
app.get("/test", (req, res, next) => res.json({ message: "annen" }));

// #region route registers
app.use("/auth", authRoute);
app.use("/announcement", announcementRoute);
app.use("/chat", chatRoute);
app.use("/player", playerRoute);
app.use("/team", teamRoute);
app.use("/admin", adminRoute);
app.use("/match", matchRoute);
// #endregion<

console.log(process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI || "error")
  .then((result) => {
    // console.log(result);
    app.listen(process.env.PORT || 8080);

    console.log("server is active");
  })
  .catch((err) => {
    console.log("db error");
    console.log(err);
  });
