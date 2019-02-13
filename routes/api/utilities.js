const storageErrorResponseBody = (err) => {
  return {
    statusCode: err.statusCode || 500,
    error: err.code,
    message: err.message
  };
};

const asyncStatusFromAiLibrary = (r) =>  {
  let aiLibStatusObj = r.status;
  if (!aiLibStatusObj) {
    return null;
  }

  if (aiLibStatusObj.active) {
    return "in_progress";
  }

  if (aiLibStatusObj.succeeded) {
    return "success";
  }

  console.warn("Async Failure reported", r);
  return "failure"
};

module.exports.storageErrorResponseBody = storageErrorResponseBody;
module.exports.asyncStatusFromAiLibrary = asyncStatusFromAiLibrary;