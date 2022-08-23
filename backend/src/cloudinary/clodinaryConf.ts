import { v2 as cloudinary } from "cloudinary";
import config from "../config";
// const { CloudinaryStorage } = require("multer-storage-cloudinary");


// console.log(uploadedImages)
// const imageUpload = cloudinaryConfig.uploader.upload(
//   args.eventInput.images,
//   {
//     folder: "eventers",
//   }
// );
export default cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_KEY,
  api_secret: config.CLOUDINARY_SECRET,
});

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
    // folder: "Eventers",
    // allowedFormats: ["jpeg", "png", "jpg"],
//   },
// });

