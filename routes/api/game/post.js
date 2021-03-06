
handler = async (request, h) => {
  request.server.app.game = require("../../../utils/settings/game");

  let game = request.server.app.game;
  request.server.publish("/api/game", { game });
  return h.response({game}).code(201);
};

module.exports.handler = handler;

