// Setup google cloud storage
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
  keyFilename: "src/config/google-cloud-key.json",
});
const bucket = storage.bucket("funter_image");
exports.bucket = bucket;
