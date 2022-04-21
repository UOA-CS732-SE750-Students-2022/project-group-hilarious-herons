const { Storage } = require("@google-cloud/storage");
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("funter_image");
exports.bucket = bucket;
