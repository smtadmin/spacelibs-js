"use strict";

var _BaseHTTPService = _interopRequireDefault(require("./BaseHTTPService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var defaultSettings = {
  host: "testHost",
  timeoutInterval: 30,
  requireSSL: true
};
var service = new _BaseHTTPService["default"](defaultSettings);
it("Makes a read request without crashing", _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
  var cancelToken, onSuccess;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          onSuccess = function _onSuccess(response) {
            expect(response.data.success).toBe(true);
            expect(response.data.message).toBe("The request was successful");
          };

          cancelToken = service.read(null, null, onSuccess, null);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
it("Makes a insert request without crashing", function () {
  var cancelToken = service.insert(null, null, onSuccess, null);

  function onSuccess(response) {
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("The request was successful");
  }
});
it("Makes a update request without crashing", function () {
  var cancelToken = service.update(null, null, onSuccess, null);

  function onSuccess(response) {
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("The request was successful");
  }
});
it("Makes a delete request without crashing", function () {
  var cancelToken = service["delete"](null, null, onSuccess, null);

  function onSuccess(response) {
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("The request was successful");
  }
});
it("Makes a standard request without crashing", function () {
  var cancelToken = service.request("GET", null, null, onSuccess, null, null, {});

  function onSuccess(response) {
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("The request was successful");
  }
});
it("Gets a warning if the method is undefined", function () {
  var errorEvent = jest.spyOn(console, 'error').mockImplementation(function () {});
  service.request("FlufferNutter", null, null, null, null, null, {});
  expect(errorEvent).toHaveBeenCalled();
});
it("Validates option validation is working", _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
  var warnEvent, onSuccess;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          onSuccess = function _onSuccess2(response) {
            expect(response.data.success).toBe(true);
            expect(response.data.message).toBe("The request was successful");
          };

          warnEvent = jest.spyOn(console, 'warn').mockImplementation(function () {});
          service.request("GET", null, null, onSuccess, null, null);
          expect(warnEvent).toHaveBeenCalled();

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
it("Validates headers are added properly", _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
  var options, onSuccess;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          onSuccess = function _onSuccess3(response) {
            expect(response.data.success).toBe(true);
            expect(response.data.message).toBe("The request was successful");
            expect(response.data.headers).toBe("Test-Header");
          };

          options = {
            headers: "Test-Header"
          };
          service.request("GET", null, null, onSuccess, null, null, options);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
it("Makes a uploadFile request without crashing", function () {
  var options = {
    headers: "Test-Header"
  };
  var cancelToken = service.uploadFile(null, "test", onSuccess, onFailure, null, undefined);

  function onSuccess(response) {
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("The request was successful");
    expect(response.data.headers).toStrictEqual({
      "Content-Type": "multipart/form-data"
    });
    expect(response.data.file.get("file")).toBe("test");
  }

  function onFailure(error) {
    console.log(error);
  }
});
it("onFailure returns when the request fails", function () {
  var data = {
    error: true
  };
  var options = {
    headers: "Test-Header"
  };
  service.request("GET", null, data, null, onFailure, null, options);

  function onFailure(error) {
    expect(error).toBe("BOOM");
  }
});