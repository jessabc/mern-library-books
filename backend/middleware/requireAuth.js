import jwt from "jsonwebtoken";
import { Users } from "../models/userModels.js";

export const requireAuth = async (req, res, next) => {
  const { authorization } = await req.headers;

  const token = authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "auth token required" });
  }

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await Users.findOne({ _id }).select("_id");
  } catch (error) {
    res.status(401).json({ error: "request not verified" });
  }

  next();
};
