import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./configs/database.js";
import userRoutes from "./routes/userRouter.js";
import scrapeRoutes from "./routes/scrapeRouter.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import "dotenv/config";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
sequelize
  .sync()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/scrape", scrapeRoutes);

// Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
