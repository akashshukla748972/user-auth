import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const handleCreateUser = async (req, res) => {
  try {
    const { name, email, phone, gender, password } = req.body;
    const { first_name, last_name } = name;

    // check all field
    if (!first_name || !last_name || !email || !phone || !gender || !password) {
      return res.status(400).json({
        message: `${!first_name ? "First name, " : ""}${
          !last_name ? "Last name, " : ""
        }${!email ? "Email, " : ""}${!phone ? "Phone, " : ""}${
          !gender ? "Gender, " : ""
        }${!password ? "Password, " : ""} Is Required!`,
      });
    }

    // check email or password already exist
    const isExistEmail = await User.findOne({ email });
    const isExistPhone = await User.findOne({ phone });

    if (isExistEmail || isExistPhone) {
      return res.status(409).json({
        message: `${isExistEmail ? "Email already exists. " : ""}${
          isExistPhone ? "Phone number already exists." : ""
        }`,
      });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // save user data in database
    const newUser = new User({
      name: {
        first_name: first_name,
        last_name: last_name,
      },
      email: email,
      phone: phone,
      gender: gender,
      password: hashPassword,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "Success",
      data: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        phone: savedUser.phone,
        gender: savedUser.gender,
        created_at: savedUser.createdAt,
        updated_at: savedUser.updatedAt,
      },
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: true,
    });
  }
};

export const handleGetUser = async (req, res) => {
  res.status(200).json({
    message: "successfully requested",
  });
};
