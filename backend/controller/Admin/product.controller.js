import { imageUploadToCloudinary } from "../../middleware/cloudinary.js";

export const handleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    const bufferFile = req.file;
    const b64 = Buffer.from(bufferFile.buffer).toString("base64");
    const url = `data:${bufferFile.mimetype};base64,${b64}`;
    const imgUrl = await imageUploadToCloudinary(url);

    if (imgUrl === null) {
      return res
        .status(404)
        .json({ success: false, message: "Image url not created" });
    }
    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      url: imgUrl.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server side error occur while uploading image",
      error: error.message,
    });
  }
};
