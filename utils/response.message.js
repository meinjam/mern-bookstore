const successResponse = (data, status_code = 200, message = 'Success') => {
  return {
    status: true,
    status_code: status_code,
    message: message,
    data: data,
  };
};

const errorResponse = (errors, status_code = 400, message = 'Error') => {
  return {
    status: false,
    status_code: status_code,
    message: message,
    errors: errors,
  };
};

const formatJoiError = (errors) => {
  const manipulateError = errors.map((error) => {
    return {
      key: error.path[0],
      error: `${error.message}.`,
    };
  });

  return manipulateError;
};

module.exports = { successResponse, errorResponse, formatJoiError };
