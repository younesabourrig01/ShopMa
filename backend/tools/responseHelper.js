//succes
const sendSuccess = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

//error
const sendError = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    error: message,
  });
};

// 404 not found
const sendNotFound = (res, resource = "Ressource") => {
  return res.status(404).json({
    success: false,
    error: `${resource} non trouvée`,
  });
};

module.exports = {
  sendSuccess,
  sendError,
  sendNotFound,
};
