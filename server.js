"use strict";

const Hapi = require("hapi");
const HapiPino = require("hapi-pino");
const Inert = require("inert");
const Nes = require('nes');


const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const IP = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";

const server = Hapi.server({
  port: PORT,
  host: IP
});

server.app = require("./utils/settings/app");

const init = async () => {
  await server.register(Inert);
  await server.register(HapiPino);
  await server.register(Nes);

  require("./routes/api/status")(server);
  require("./routes/api/motions")(server);
  require("./routes/api/orientations")(server);

  server.route({
    method: "GET",
    path: "/{path*}",
    handler: {
      directory: {
        path: "ui/build"
      }
    }
  });

  server.ext("onPreResponse", (request, h) => {
    const response = request.response;
    const isNotApi = !/^\/api/g.exec(request.url.path);
    if (isNotApi && response.isBoom &&
      response.output.statusCode === 404) {
      return h.file("ui/build/index.html");
    }

    return h.continue;
  });


  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
