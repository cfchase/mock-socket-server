
handler = async (request, h) => {
  request.server.app.game = {...request.server.app.game, ...request.payload};

  let game = request.server.app.game;
  request.server.publish("/api/game", { game });
  return h.response({game}).code(200);
};

module.exports.handler = handler;

