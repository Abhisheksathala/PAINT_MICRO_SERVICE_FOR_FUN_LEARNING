import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
};

export { cloudinary, connectCloudinary };

export const uploadMediaToCloudinary = (file) => {
  return new Promise((resove, reject) => {
    const uploadStram = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resove(result);
        }
      },
    );
    uploadStram.end(file.buffer);
  });
};
