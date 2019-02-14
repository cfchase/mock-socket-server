
handler = async (request, h) => {
  request.server.app.game = request.payload;
  return h.response().code(204);
};

module.exports.handler = handler;

