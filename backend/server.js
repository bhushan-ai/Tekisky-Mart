import express from "express";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import connectDb from "./db/dbConnection.js";
import "dotenv/config";

import cors from "cors";
import productRoute from "./routes/product.route.js";

const app = express();
const PORT = process.env.PORT || 4000;

//Parsing
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/product", productRoute);

connectDb()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.log(`Server isn't starting `, error);
  });
