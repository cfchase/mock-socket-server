const _init = () => {
  const status = {
    status: "OK",
    started: new Date(),
  };

  const storage = require("./storage");
  const game = require("./game");

  return {status, storage, game};
};

module.exports = _init();