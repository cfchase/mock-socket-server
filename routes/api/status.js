handler = (server) => {
  server.route({
    method: "GET",
    path: "/api/status",
    handler: (request, h) => {
      let serverTime = new Date();
      return {
        ...request.server.app.status,
        serverTime,
        s3Endpoint: request.server.app.storage.s3Endpoint,
        s3Bucket: request.server.app.storage.s3Bucket,
        s3Prefix: request.server.app.storage.s3Prefix,
        game: request.server.app.game
      };
    }
  });
};

module.exports = handler;