
handler = async (request, h) => {
  request.server.app.game = request.payload;
  return h.response({
    game: request.server.app.game
  }).code(201);
};

module.exports.handler = handler;

