import express from "express";
import morgan from "morgan";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";

import indexRouter from "./routes/index.js";
// commented out based on class video, but can use for login stuff?
// import usersRouter from "./routes/users.js";

// Copiolet generated code from class
// import { fileURLToPath } from "url"; moved to line 5
// import { dirname } from "path"; moved to line 2

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();

app.use(logger("dev"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
// changed from "public" to "front", "dist"
// vite is going to take the react code and covert it into code that can be served into as standard html
app.use(express.static(path.join(__dirname, "front", "dist")));

app.use("/api/appointments", indexRouter);
// commented out based on class video,but can use for login stuff?
// app.use("/users", usersRouter);

// app.delete("/api/appointments/:appointmentId", async (req, res) => {
//   try {
//     const result = await myDBInstance.deleteAppointment(
//       req.params.appointmentId
//     );
//     if (result.deletedCount === 1) {
//       res.status(204).send(); // No content to send back, but signifies success
//     } else {
//       res.status(404).send({ message: "Appointment not found" }); // Appointment not found
//     }
//   } catch (error) {
//     res.status(500).send({ message: "Error deleting appointment", error }); // Internal Server Error
//   }
// });

export default app;
