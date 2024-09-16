class ResponseHandler {
  static success(res, data = {}, statusCode = 200) {
    res.status(statusCode).json({
      status: 'success',
      data,
    });
  }

  static error(res, message, statusCode = 500) {
    res.status(statusCode).json({
      status: 'error',
      message,
    });
  }
}

module.exports = ResponseHandler;