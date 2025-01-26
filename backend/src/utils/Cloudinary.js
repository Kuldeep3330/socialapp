import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCLoudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.error("No file path provided for upload.");
      return null;
    }

    //Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detects the file type
    });
    //file has been successfully uploaded
    console.log("File has been successfully uploaded to Cloudinary", response.url);
    // Delete the local file after successful upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return response;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error.message);
    // Ensure local file is cleaned up even on failure
    if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    return null;
  }
};

export { uploadOnCLoudinary };
