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
    method: ["PATCH", "PUT"],
    path: "/api/game",
    handler: require("./patch").handler,
  });

  server.subscription("/api/game");
};

module.exports = addGameRoutes;