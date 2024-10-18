const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dzzuwntsd",
  api_key: "147651355921311",
  api_secret: "T5vaW49Ic9lYrHCv4F0yEY-uw1o",
});

const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error("Upload image error");
  }
};

module.exports = { uploadImage };
