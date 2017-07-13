
const ERROR_CODES = {
  0: {
    message: 'no internet connection',
  },
  402: {
    message: 'CUSTOM_MESSAGE',
  },
};

const parseWellKnownErrorCodes = (errorData) => {
  const error = ERROR_CODES[errorData.error_code];
  if (error) {
    return {
      errorCode: errorData.error_code,
      errorMessage: error.message,
    };
  }
  return null;
};

const generalErrors = (e) => {
  const errorData = e.response.data;
  const status = e.response.status;
  const error = new Error(status);
  error.status = status;

  const knowError = parseWellKnownErrorCodes(errorData);
  if (knowError) {
    error.body = knowError;
  } else {
    try {
      error.body = {};
      error.body.errorCode = errorData.error_code;
      error.body.errorMessage = errorData.error_message;
    } catch (e) {
      error.body = {};
      error.body.errorCode = null;
      error.body.errorMessage = null;
    }
  }

  return error;
};


const ApiUtils = {
  checkStatus(status) {
    return status >= 200 && status < 300;
  },
  generalErrors,
};

export default ApiUtils;
