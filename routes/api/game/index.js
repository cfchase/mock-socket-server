addGameRoutes = (server) => {
  server.route({
    method: ["GET"],
    path: "/api/game",
    handler: require("./get").handler
  });

  server.route({
    method: ["POST"],
    path: "/api/game",
    handler: require("./post").handler,
  });

  server.route({
    method: ["PUT"],
    path: "/api/game",
    handler: require("./put").handler,
  });
};

module.exports = addGameRoutes;