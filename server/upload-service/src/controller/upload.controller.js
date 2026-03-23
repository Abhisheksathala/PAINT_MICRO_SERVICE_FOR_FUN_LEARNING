import { uploadMediaToCloudinary } from "../util/cloudinary.js";
import uploadModel from "../models/medis.js";

export const uploadMedia = async (req, res) => {
  try {
    const userId = req.userId;
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        success: false,
        message: "no file found bro",
      });
    }

    const { originalname, mimetype, size, width, height } = req.file;

    const cloudinaryresults = await uploadMediaToCloudinary(req.file);

    const newCreatedMedia = new uploadModel({
      userId: userId,
      name: originalname,
      cloudinaryId: cloudinaryresults.public_id,
      url: cloudinaryresults.secure_url,
      mimetype: mimetype,
      size,
      height,
      width,
    });

    await newCreatedMedia.save();

    return res.status(200).json({
      success: true,
      data: newCreatedMedia,
      message: "featched successfuly ",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: error.message || "featched successfuly ",
    });
  }
};

export const getallmediabyuser = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is requried",
      });
    }
    const media = await uploadModel.find({ userId: userId });

    if (!media) {
      return res.status(400).json({
        success: false,
        message: "uploads Found",
      });
    }

    return res.status(200).json({
      success: false,
      data: media,
      message: error.message || "featched successfuly ",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: error.message || "featched successfuly ",
    });
  }
};
