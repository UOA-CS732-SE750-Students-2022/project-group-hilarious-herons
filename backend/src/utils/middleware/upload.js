const { bucket } = require("../../config/googleCloudStorage");
const { format } = require("util");
exports.upload = (imageStream, filename, cb) => {
  try {
    imageStream.on("error", (err) => {
      throw err;
    });
    imageStream.on("finish", async (data) => {
      // Create URL for directly file access via HTTP.
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${filename}`
      );
      cb(publicUrl);
    });
  } catch (err) {
    throw err;
  }
};
