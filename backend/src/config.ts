import dotenv from "dotenv";
dotenv.config();

export default {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET,
};
