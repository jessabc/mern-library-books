import { Users } from "../models/userModels.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "1d" });
};

// register
// api/users/signup
export const userSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.signup(email, password);
    const role = user.isAdmin ? "admin" : "member";
    const token = createToken(user._id);
    res.status(200).json({ email, token, role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login
// api/users/login
export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.login(email, password);
    const role = user.isAdmin ? "admin" : "member";
    const token = createToken(user._id);
    res.status(200).json({ email, token, role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
