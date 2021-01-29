/*
 * File: /src/core/io/BaseHTTPService/BaseHTTPService.test.js
 * Version: 0.0.1
 * Project: spacelibs-js
 * Description: Tests for the BaseHTTP Service
 * File Created: Monday, 18th January 2021 3:42 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Friday, 29th January 2021 3:27 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import BaseHTTPService from './BaseHTTPService';


/**
 * Default settings for Generic HTTPService 
 * @type {object}  
 */
const defaultSettings = {
  host: "testHost",
  timeoutInterval: 30,
  requireSSL: true,
};

/** @type {BaseHTTPService} */
const service = new BaseHTTPService(defaultSettings);

/**
 * Attempts to make a read request and asserts that the returned data.message is equal to "The request was successful"
 */
it("Makes a read request without crashing", async () => {
  const cancelToken = service.read(null, null, onSuccess, null);

  function onSuccess(response) {
    expect(response.data.success).toBe(true)
    expect(response.data.message).toBe("The request was successful")
  }

});
 
/**
 * Attempts to make a insert request and asserts that the returned data.message is equal to "The request was successful"
 */
it("Makes a insert request without crashing", () => {
  const cancelToken = service.insert(null, null, onSuccess, null);

  function onSuccess(response) {
    expect(response.data.success).toBe(true)
    expect(response.data.message).toBe("The request was successful")
  }
});

/**
 * Attempts to make a update request and asserts that the returned data.message is equal to "The request was successful"
 */
it("Makes a update request without crashing", () => {
  const cancelToken = service.update(null, null, onSuccess, null);

  function onSuccess(response) {
    expect(response.data.success).toBe(true)
    expect(response.data.message).toBe("The request was successful")
  }
});

/**
 * Attempts to make a delete request and asserts that the returned data.message is equal to "The request was successful"
 */
it("Makes a delete request without crashing", () => {
  const cancelToken = service.delete(null, null, onSuccess, null);

  function onSuccess(response) {
    expect(response.data.success).toBe(true)
    expect(response.data.message).toBe("The request was successful")
  }
});

/**
 * Attempts to make a standard request and asserts that the returned data.message is equal to "The request was successful"
 */
it("Makes a standard request without crashing", () => {
  const cancelToken = service.request("GET", null, null, onSuccess, null, null, {});

  function onSuccess(response) {
    expect(response.data.success).toBe(true)
    expect(response.data.message).toBe("The request was successful")
  }
});

/**
 * Attempts to make a standard request with a non standard method parameter and asserts that an error event took place
 */
it("Gets a warning if the method is undefined", () => {

  const errorEvent = jest
    .spyOn(console, 'error')
    .mockImplementation(() => { });

  service.request("FlufferNutter", null, null, null, null, null, {});
  expect(errorEvent).toHaveBeenCalled();

});

/**
 * Attempts to make a standard request without the options object and asserts that a warn event was thrown but the request was still successful
 */
it("Validates option validation is working", async () => {

  const warnEvent = jest
    .spyOn(console, 'warn')
    .mockImplementation(() => { });

  service.request("GET", null, null, onSuccess, null, null);
  expect(warnEvent).toHaveBeenCalled();

  function onSuccess(response) {
    expect(response.data.success).toBe(true)
    expect(response.data.message).toBe("The request was successful")
  }

});

/**
 * Attempts a standard request with an added header and asserts that the header was added and that the request was successful
 */
it("Validates headers are added properly", async () => {

  const options = {
    headers: "Test-Header"
  }

  service.request("GET", null, null, onSuccess, null, null, options);

  function onSuccess(response) {
    expect(response.data.success).toBe(true)
    expect(response.data.message).toBe("The request was successful")
    expect(response.data.headers).toBe("Test-Header")
  }

});

/**
 * It attempts an uploadFile request with an added header and asserts that the request was successful
 * and that the Content-Type: multipart/form-data header was present. It also asserts that the file was passed as expected
 */
it("Makes a uploadFile request without crashing", () => {
  const options = {
    headers: "Test-Header"
  }

  const cancelToken = service.uploadFile(null, "test", onSuccess, onFailure, null, undefined);

  function onSuccess(response) {
    expect(response.data.success).toBe(true)
    expect(response.data.message).toBe("The request was successful")
    expect(response.data.headers).toStrictEqual({ "Content-Type": "multipart/form-data" })
    expect(response.data.file.get("file")).toBe("test")
  }

  function onFailure(error) {
    console.log(error);
  }

});

/**
 * Attempts a standard request with a data object that has an error. Asserts that an error event was thrown and that the error message was equal to "BOOM"
 */
it("onFailure returns when the request fails", () => {
  const data = {
    error: true
  }

  const options = {
    headers: "Test-Header"
  }

  service.request("GET", null, data, null, onFailure, null, options);

  function onFailure(error) {
    expect(error).toBe("BOOM")
  }

});
