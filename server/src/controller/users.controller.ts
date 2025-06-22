import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.ts";
import { ApiError } from "../utils/ApiError.ts";
import { User } from "../models/users.model.ts";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import type { UploadApiResponse } from "cloudinary";

const userRegistrationController = asyncHandler(
  async (req: Request, res: Response) => {
    //get info from request body
    const { name, email, password } = req.body;

    //validate the input
    if ([name, email, password].some((field) => field.trim() === ""))
      throw new ApiError(400, "All fields are required");

    //check if user already exists & throw error if exists
    if (!email.includes("@")) throw new ApiError(400, "Invalid email address");
    const existingUser = await User.findOne({ email: email });
    if (existingUser) throw new ApiError(400, "User already exist");

    //get the avatar from the request
    const avatarLocalPath = (
      req.files as { [fieldname: string]: Express.Multer.File[] }
    )?.avatar[0].path;
    if (!avatarLocalPath) throw new ApiError(400, "Avatar is required");

    //upload the avatar to cloudinary
    let avatar: UploadApiResponse | null;
    try {
      avatar = await uploadOnCloudinary(avatarLocalPath);
      console.log("Uploaded avatar", avatar);
    } catch (error) {
      console.error("Error uploading avatar to Cloudinary:", error);
      throw new ApiError(500, "Failed to upload avatar");
    }

    try {
      //create a new user
      const user = await User.create({
        name,
        email,
        password,
        avatar: avatar?.url,
      });

      // check if user created
      const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
      );
      if (!createUser) throw new ApiError(500, "User not created");
      //send response
      return res
        .status(201)
        .json(new ApiResponse(201, createUser, "User created successfully"));
    } catch (error) {
      console.log("Error creating user", error);
      if (avatar) await deleteFromCloudinary(avatar.public_id);
      throw new ApiError(
        500,
        "something went wrong when creating user and deleted avatar from cloudinary"
      );
    }
  }
);

export { userRegistrationController };
