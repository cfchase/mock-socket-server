
handler = async (request, h) => {

      return {game: request.server.app.game};
};

module.exports.handler = handler;
