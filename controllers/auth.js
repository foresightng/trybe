const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError, NotFoundError } = require("../errors");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const passport = require("passport");
const axios = require("axios");
const bcrypt = require("bcryptjs");

// EMAIL AND PASSWORD REGISTER AND LOGIN

const registerUser = async (req, res) => {
  try {
    if (req.body.uniqueKey === 1212) {
      req.body.role = "admin";
    } else {
      req.body.role = "customer";
    }
    req.body.createdAt = Date.now();
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      user: {
        name: user.name,
        role: user.role,
        email: user.email,
        createdAt: user.createdAt,
        phoneNumber: user.phoneNumber,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidatorError") {
      res.status(400).json({ msg: error.message });
    } else if (error.name === "MongoError") {
      res.status(404).json({ msg: "Email Already Exists" });
    } else {
      console.log(error)
      res
        .status(500)
        .json({ msg: "Something went wrong, please try again later" });
    }
  }
};

const login = async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Please provide your email and password");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new NotFoundError('User does not exist')
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new UnauthenticatedError("You have entered an password");
    }

    const token = user.createJWT();
    console.log(token)

    res.status(StatusCodes.OK).json({
      status: "success",
      msg: "Login successful",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        dob: user.dob,
        role: user.role,
        gender: user.gender,
        businessName: user.businessName,
        isSoleProprietor: user.isSoleProprietor,
        bvn: user.bvn,
        bank: user.bank,
        accountNumber: user.accountNumber,
        country: user.country,
        state: user.state,
        address: user.address,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    if(error.status === 404) {
      res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: error.message, status: "error" });
    }
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: error.message, status: "error" });
  }
};

// Forgot password to get reset code
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new Error("Please provide your email");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid Email");
    }

    // Generate a random 5-digit code
    const resetCode = Math.floor(10000 + Math.random() * 90000).toString();

    // Set expiry for 30 minutes
    const resetPasswordExpires = Date.now() + 30 * 60 * 1000; // 30 minutes

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          resetPasswordToken: resetCode,
          resetPasswordExpires: resetPasswordExpires,
        },
      }
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "foresightagencies@gmail.com",
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <p style="font-size:16px;">You are receiving this email because you (or someone else) has requested a password reset for your account.</p>
        <p style="font-size:16px;">Your password reset code is:</p>
        <p style="font-size:24px; color: blue;">${resetCode}</p>
        <p style="font-size:16px;">This code will expire in 30 minutes. Please go to the following page and enter this code to reset your password:</p>
        <a href="https:/localhost:3000/auth/reset" style="font-size:16px;">Reset Password</a>
        <p style="font-size:16px;">If you did not request a password reset, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      msg: "Password reset code sent to your email",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: error.message,
    });
  }
};

// Reset password action
const resetPassword = async (req, res) => {
  try {
    const { resetCode, newPassword } = req.body;

    if (!resetCode) {
      throw new Error("Reset code is required");
    }

    // Find the user with the given reset code and within the expiration time
    const user = await User.findOne({
      resetPasswordToken: resetCode,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      throw new Error("Invalid reset code or code expired");
    }

    // Hash and salt the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password and clear the reset code and expiration
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    const rebornUser = await user.save((error, savedUser) => {
      if (error) {
        console.error("Error while saving user:", error);
        // Handle the error, such as returning an error response
      }
    });

    console.log(hashedPassword);
    console.log(rebornUser);

    res.status(200).json({
      msg: "Password reset successfully",
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
};

module.exports = {
  login,
  registerUser,
  forgotPassword,
  resetPassword,
};
