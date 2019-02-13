addMotionRoutes = (server) => {
  server.route({
    method: ["POST"],
    path: "/api/motions",
    handler: require("./post").handler,
  });
};

module.exports = addMotionRoutes;