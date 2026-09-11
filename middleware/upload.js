
///import multer from "multer";
//import cloudinary from "../config/cloudinary.js";
//import { CloudinaryStorage } from "multer-storage-cloudinary";

/*
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "events",
        allowed_formats: ["jpeg", "png", "jpg", "gif", "svg", "webp"],
        public_id: (req, file) => Date.now() + "-" + file.originalname
    },
});

 
const upload = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024 ,
    },
})

export default upload

*/


import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "IMAGES",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default upload;