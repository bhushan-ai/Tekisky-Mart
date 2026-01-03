import express from "express";
import cors from "cors";
import "dotenv/config";
import connectdb from "./db/dbConnection.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 7000;

//parsing middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/user", userRoutes);

connectdb()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.log(`Server isn't starting `, error);
  });
