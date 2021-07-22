import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      res.status(404).json({ message: "InValid Credential" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    console.log(existingUser);
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const signup = async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) res.status(404).json("User Already Exist");
    if (password !== confirmPassword)
      res.status(404).json("Password must same as confirm Password");
    const hashPassword = await bcryptjs.hash(password, 12);
    const result = await User.create({
      name: `${firstname} ${lastname}`,
      email,
      password: hashPassword,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
