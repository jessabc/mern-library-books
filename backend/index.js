import express from "express";
import "dotenv/config";
import { router as adminRoutes } from "./routes/admin.js";
import { router as usersRoutes } from "./routes/users.js";
import { router as membersRoutes } from "./routes/members.js";
import { router as booksRoutes } from "./routes/books.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// middleware
const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.use("/api/books", (req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// routes
app.use("/api/books", booksRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/members", membersRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`app listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.status(201).json({ message: "connected to backend" });
});
