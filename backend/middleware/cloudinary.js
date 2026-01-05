import cloudinary from "cloudinary";
import multer from "multer";

console.log("api", process.env.CLOUDINARY_API_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

const imageUploadToCloudinary = async (b64) => {
  try {
    const result = await cloudinary.uploader.upload(b64);
    console.log("upload successful", result.secure_url);
    return result;
  } catch (error) {
    console.error("Upload failed:", error);
  }
};

const upload = multer({ storage });

export { upload, imageUploadToCloudinary };
