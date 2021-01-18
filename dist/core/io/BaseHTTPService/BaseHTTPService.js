"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HTTPMethod = _interopRequireDefault(require("./HTTPMethod"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseHTTPService = function () {
  function BaseHTTPService(config) {
    _classCallCheck(this, BaseHTTPService);

    this.axiosInstance = _axios["default"].create({
      baseURL: config.host,
      timeout: config.timeoutInterval
    });
    this.settings = {
      requireSSL: config.requireSSL
    };
  }

  _createClass(BaseHTTPService, [{
    key: "read",
    value: function read(url, data, onSuccess, onFailure) {
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      this.request(_HTTPMethod["default"].GET, url, data, onSuccess, onFailure, undefined, options);
    }
  }, {
    key: "insert",
    value: function insert(url, data, onSuccess, onFailure) {
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      this.request(_HTTPMethod["default"].POST, url, data, onSuccess, onFailure, undefined, options);
    }
  }, {
    key: "update",
    value: function update(url, data, onSuccess, onFailure) {
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      this.request(_HTTPMethod["default"].PATCH, url, data, onSuccess, onFailure, undefined, options);
    }
  }, {
    key: "delete",
    value: function _delete(url, data, onSuccess, onFailure) {
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      this.request(_HTTPMethod["default"].DELETE, url, data, onSuccess, onFailure, undefined, options);
    }
  }, {
    key: "uploadFile",
    value: function uploadFile(url, file, onSuccess, onFailure, onUploadProgress) {
      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      options.headers = {
        "Content-Type": "multipart/form-data"
      };
      var formData = new FormData();
      formData.append("file", file);
      this.request(_HTTPMethod["default"].POST, url, formData, onSuccess, onFailure, onUploadProgress, options);
    }
  }, {
    key: "request",
    value: function request(method, url, data, onSuccess, onFailure, onUploadProgress, options) {
      if (_HTTPMethod["default"][method] === undefined) {
        console.error("HTTP Method " + method + " is not valid.");
        return;
      }

      var requestConfig = {
        url: url,
        method: method
      };

      if (options === undefined || options === null) {
        console.warn("Request options was null, by default it should be an empty object {}");
      } else if (options["headers"] !== undefined) {
        requestConfig.headers = options.headers;
      }

      if (data !== undefined && data !== null) {
        if (method === _HTTPMethod["default"].POST || method === _HTTPMethod["default"].PATCH || method === _HTTPMethod["default"].PUT || method === _HTTPMethod["default"].DELETE) {
          requestConfig.data = data;
        } else {
          requestConfig.params = data;
        }
      }

      if (onUploadProgress !== undefined) {
        requestConfig.onUploadProgress = onUploadProgress;
      }

      var cancelTokenSource = _axios["default"].CancelToken.source();

      requestConfig.cancelToken = cancelTokenSource.token;

      _axios["default"].request(requestConfig).then(function (response) {
        onSuccess(response);
      })["catch"](function (error) {
        onFailure(error);
      });

      return cancelTokenSource;
    }
  }]);

  return BaseHTTPService;
}();

exports["default"] = BaseHTTPService;