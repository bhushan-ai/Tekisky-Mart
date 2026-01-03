import express from "express";
import userRoute from "./routes/user.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./db/dbConnection.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

//Parsing
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/user", userRoute);

connectDb()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.log(`Server isn't starting `, error);
  });
