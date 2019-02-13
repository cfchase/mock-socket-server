const storageErrorResponseBody = require("../utilities").storageErrorResponseBody;

handler = async (request, h) => {
  const storage = request.server.app.storage;
  const {sessionId, id, data} = request.payload;
  const fileKey = `motions/${sessionId}/${id}.json`;


  try {
    await storage.writeJson(fileKey, data);
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

module.exports.handler = handler;

