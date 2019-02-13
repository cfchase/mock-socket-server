const _init = () => {
  const storage = require("./storage");

  const status = {
    status: "OK",
    started: new Date(),
  };

  return {status, storage};
};

module.exports = _init();