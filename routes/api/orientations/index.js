addOrientationRoutes = (server) => {
  server.route({
    method: ["POST"],
    path: "/api/orientations",
    handler: require("./post").handler,
  });
};

module.exports = addOrientationRoutes;