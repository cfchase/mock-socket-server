const utilities = require("./utilities");
const S3Storage = require("../s3Storage");

const _init = () => {
  let storage;

  try {

    const s3Endpoint = utilities.getEnv("S3_ENDPOINT");
    const s3Bucket = utilities.getEnv("S3_BUCKET");
    const s3Prefix = utilities.getEnv("S3_PREFIX");
    const s3AccessKeyId = utilities.getEnv("S3_ACCESS_KEY_ID");
    const s3SecretAccessKey = utilities.getEnv("S3_SECRET_ACCESS_KEY");

    storage = new S3Storage(s3Endpoint, s3Bucket, s3Prefix, s3AccessKeyId, s3SecretAccessKey);
  }
  catch (e) {
    console.error(e);
    return {};
  }

  return storage;
};

module.exports = _init();