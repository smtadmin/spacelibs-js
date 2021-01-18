"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = {
  get: jest.fn(function (url) {
    if (url === '/something') {
      return Promise.resolve({
        data: 'data'
      });
    }
  }),
  post: jest.fn(function (url) {
    if (url === '/something') {
      return Promise.resolve({
        data: 'data'
      });
    }

    if (url === '/something2') {
      return Promise.resolve({
        data: 'data2'
      });
    }
  }),
  create: jest.fn(function () {
    return this;
  }),
  CancelToken: {
    source: function source() {
      return {
        token: "test"
      };
    }
  },
  request: function () {
    var _request = _asyncToGenerator(regeneratorRuntime.mark(function _callee(data) {
      var headers, file;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              headers = null;
              file = null;

              if (!data.params) {
                _context.next = 5;
                break;
              }

              if (!data.params.error) {
                _context.next = 5;
                break;
              }

              throw "BOOM";

            case 5:
              if (data.headers) {
                headers = data.headers;
              }

              if (data.data) {
                file = data.data;
              }

              return _context.abrupt("return", Promise.resolve({
                data: {
                  file: file,
                  headers: headers,
                  success: true,
                  message: "The request was successful"
                }
              }));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function request(_x) {
      return _request.apply(this, arguments);
    }

    return request;
  }()
};