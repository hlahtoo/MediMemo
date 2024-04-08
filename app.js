import express from "express";
import morgan from "morgan";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";

import passport from "passport";

import session from "express-session";

import patientRouter from "./routes/patientrecordRoutes.js";
import indexRouter from "./routes/index.js";
import userRouter from "./routes/userRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();

app.use(logger("dev"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
  session({
    secret: "hla hla hla",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));

app.use("/api/appointments", indexRouter);
app.use("/api/patients", patientRouter);
app.use("/api/users", userRouter);

app.use(express.static(path.join(__dirname, "front", "dist")));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "front", "dist", "index.html"));
});

export default app;
