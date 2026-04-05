const User = require("../model/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../tools/generateToken");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone_number, adress, region } = req.body;
    const image = req.file ? req.file.filename : null;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone_number,
      adress,
      region,
      image,
    });

    res.status(201).json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = req.user;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateUserInfo = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, email, phone_number, adress, region } = req.body;
    const image = req.file ? req.file.filename : undefined;

    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.phone_number = phone_number ?? user.phone_number;
    user.adress = adress ?? user.adress;
    user.region = region ?? user.region;
    user.image = image ?? user.image;

    await user.save();

    user.password = undefined;

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = req.user;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    await user.deleteOne();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.userProfile = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user)
      return res
        .status(400)
        .json({ message: "unexpected error wen fetching user info" });
    res.status(200).json({
      message: "user data fetched succsessfuly",
      user: {
        name: user.name,
        email: user.email,
        image: user.image,
        region: user.region,
        adress: user.address,
        phone_number: user.phone_number,
      },
    });
  } catch (error) {
    next(error);
  }
};
