import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

const corsOptions = {
  origin: 'http://localhost:5173', // The frontend's origin
  method: 'POST',
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use("/api/v1/reservation", reservationRouter);

// Handle POST request
app.post('/reservation/send', (req, res) => {
  const { firstName, lastName, email, phone, date, time } = req.body;
  // Process reservation data here

  // Example response
  res.json({ message: "Reservation received successfully", data: req.body });
});

  dbConnection();

  app.use(errorMiddleware);

export default app;