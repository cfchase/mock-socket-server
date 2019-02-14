
handler = async (request, h) => {
  let game = request.server.app.game;
  request.server.publish("/api/game", { game });
  return { game };
};

module.exports.handler = handler;
