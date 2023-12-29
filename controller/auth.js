import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Role from "../models/Role.js";

export const register = async (req, res, next) => {
  try {
      // Kiểm tra tên đăng nhập đã tồn tại
      const userExists = await User.findOne({ username: req.body.username });
      if (userExists) {
          return res.status(400).send("Tên đăng nhập đã tồn tại!");
      }

      // Kiểm tra email đã tồn tại
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
          return res.status(400).send("Email đã tồn tại!");
      }

      // Kiểm tra số điện thoại đã tồn tại
      const phoneNumberExists = await User.findOne({ phoneNumber: req.body.phoneNumber });
      if (phoneNumberExists) {
          return res.status(400).send("Số điện thoại đã tồn tại!");
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const role = await Role.findOne({ name: req.body.role || 'user' });

      if(!role) {
        return res.status(400).send("Role không tồn tại")
      }
      
      const newUser = new User({
          ...req.body,
          password: hash,
          role: role._id,
      })
      
      await newUser.save()
      
      res.status(200).send("User has been created.")
  } catch (err) {
      next(err)
  }
}


export const login = async (req, res, next) => {
try {
  const user = await User.findOne({ username: req.body.username }).populate('role');
  if (!user) return next(createError(404, "User not found!"));

  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect)
    return next(createError(400, "Wrong password or username!"));

  const token = jwt.sign(
    { id: user._id, role: user.role.name },
    process.env.JWT
  );

  const { password, role, ...otherDetails } = user._doc;
  res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json({ details: { ...otherDetails }, role });
} catch (err) {
  next(err);
}
};