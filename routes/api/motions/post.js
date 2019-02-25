const storageErrorResponseBody = require("../utilities").storageErrorResponseBody;

handler = async (request, h) => {
  const storage = request.server.app.storage;
  const {captureId, id, data} = request.payload;
  const dateSubdir = getDateString();
  const fileKey = `motions/${dateSubdir}/${captureId}/${id}.json`;

  console.log("motions post", request.payload);

  try {
    if (storage) {
      await storage.writeJson(fileKey, data);
    }

    return h.response({
      data
    }).code(201);
  }
  catch (err) {
    console.error(err);
    let responseBody = storageErrorResponseBody(err);
    return h.response(responseBody).code(responseBody.statusCode);
  }
};

function getDateString() {
  const now = new Date();
  const year = '' + now.getFullYear();
  const month = ('' + now.getMonth() + 1).padStart(2,0);
  const date = ('' + now.getDate()).padStart(2,0);

  return `${year}-${month}-${date}`;
}

module.exports.handler = handler;

