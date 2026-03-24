import axios from "axios";
import { uploadMediaToCloudinary } from "../util/cloudinary.js";
import uploadModel from "../models/medis.js";

const STABILITYAI_API_KEY = process.env.STABILITYAI_API_KEY;
const STABILITYAI_ENGINE_ID = "stable-diffusion-v1-6";
const STABILITYAI_API_HOST = "https://api.stability.ai";

export const genrateImageFromAIAndUpload = async (req, res) => {
  const { prompt } = req.body;
  const userId = req.userId;
  try {
    const response = await axios.post(
      `${STABILITYAI_API_HOST}/v1/generation/${STABILITYAI_ENGINE_ID}/text-to-image`,
      {
        text_prompts: [
          {
            text: prompt,
          },
        ],
        height: 1024,
        width: 1024,
        steps: 30,
        samples: 1,
        cfg_scale: 7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${STABILITYAI_API_KEY}`,
        },
      },
    );

    const genratedImage = response.data.artifacts[0];

    if (!genratedImage) {
      throw new Error("no image is genrated from ai ");
    }

    const imageBuffer = Buffer.from(genratedImage.base64, "base64");

    const file = {
      buffer: imageBuffer,
      originalname: `ai-genrated-${Date.now()}.png`,
      mimetype: "image/png",
      size: imageBuffer.length,
      height: 1024,
      width: 1024,
    };

    const cloudinaryresults = await uploadMediaToCloudinary(file);

    const newCreatedMedia = new uploadModel({
      userId: userId,
      name: `ai GenratedImage ${prompt.substring(0, 50)}`,
      cloudinaryId: cloudinaryresults.public_id,
      url: cloudinaryresults.secure_url,
      mimetype: "image/png",
      size: imageBuffer.length,
      height: 1024,
      width: 1024,
    });

    await newCreatedMedia.save();

    return res.status(200).json({
      success: true,
      data: newCreatedMedia,
      prompt,
      seed: genratedImage.seed,
      message: "AI image genrated and uploaded to db successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "creation failed",
    });
  }
};
