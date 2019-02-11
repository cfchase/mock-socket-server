handler = (server) => {
  server.route({
    method: "GET",
    path: "/api/status",
    handler: (request, h) => {
      let serverTime = new Date();
      return {...request.server.app.status, serverTime};
    }
  });
};

module.exports = handler;