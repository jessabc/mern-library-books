import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  // check email and password field are filled
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // check email is valid
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  // check password is valid
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  // check email not already in database
  const exists = await Users.findOne({ email });

  if (exists) {
    throw Error("User already exists");
  }

  // salt and hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create user in database
  const user = await Users.create({ email, password: hash });

  // return user
  return user;
};

userSchema.statics.login = async function (email, password) {
  // check email and password field are filled
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // check email already in database
  const user = await Users.findOne({ email });

  if (!user) {
    throw Error("User does not exists");
  }

  // check password is correct
  const match = await bcrypt.compare(password, user.password);

  console.log(match);

  if (!match) {
    throw Error("Password is incorrect");
  }

  // return user
  if (match) {
    return user;
  }
};

export const Users = mongoose.model("Users", userSchema);
