/* eslint-disable linebreak-style */
class GenericHandler {
  static success(res, data, code, message) {
    return res.status(code).json({
      status: code,
      data,
      message,
    });
  }

  static error(res, status, message) {
    return res.status(status).json({
      status,
      message,
    });
  }

  static correct(res, code, message) {
    return res.status(code).json({
      status: code,
      message,
    });
  }
}

export default GenericHandler;
