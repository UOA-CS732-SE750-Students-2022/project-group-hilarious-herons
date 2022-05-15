const processFile = require("../utils/middleware/multerImage");
const { upload } = require("../utils/middleware/upload");
const { bucket } = require("../utils/googleApi/googleCloudStorage");

/**
 * Upload image to google cloud storage
 * Ref: https://www.bezkoder.com/google-cloud-storage-nodejs-upload-file/#Nodejs_upload_File_to_Google_Cloud_Storage_example
 * @param {*} req
 * @param {*} res
 * @returns 200 success, 400 no file is attached, 500 internal error
 */
exports.upload = async (req, res) => {
  try {
    await processFile(req, res);
    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);
    const imageStream = blob.createWriteStream({
      resumable: false,
    });
    await upload(imageStream, req.file.originalname, (publicUrl) => {
      res.send(publicUrl);
    });
    imageStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${err}`,
    });
  }
};
