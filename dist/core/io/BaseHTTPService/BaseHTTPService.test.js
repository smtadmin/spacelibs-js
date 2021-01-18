

import GenericHTTPService from './BaseHTTPService';

const defaultSettings = {
  host: "testHost",
  timeoutInterval: 30,
  requireSSL: true
};

const service = new GenericHTTPService(defaultSettings);

it("Makes a read request without crashing", async () => {
  const cancelToken = service.read(null, null, onSuccess, null);

  function onSuccess(response) {
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("The request was successful");
  }
});

it("Makes a insert request without crashing", () => {
  const cancelToken = service.insert(null, null, onSuccess, null);

  function onSuccess(response) {
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("The request was successful");
  }
});

it("Makes a update request without crashing", () => {
  const cancelToken = service.update(null, null, onSuccess, null);

  function onSuccess(response) {
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("The request was successful");
  }
});

it("Makes a delete request without crashing", () => {
  const cancelToken = service.delete(null, null, onSuccess, null);

  function onSuccess(response) {
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("The request was successful");
  }
});

it("Makes a standard request without crashing", () => {
  const cancelToken = service.request("GET", null, null, onSuccess, null, null, {});

  function onSuccess(response) {
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("The request was successful");
  }
});

it("Gets a warning if the method is undefined", () => {

  const errorEvent = jest.spyOn(console, 'error').mockImplementation(() => {});

  service.request("FlufferNutter", null, null, null, null, null, {});
  expect(errorEvent).toHaveBeenCalled();
});

it("Validates option validation is working", async () => {

  const warnEvent = jest.spyOn(console, 'warn').mockImplementation(() => {});

  service.request("GET", null, null, onSuccess, null, null);
  expect(warnEvent).toHaveBeenCalled();

  function onSuccess(response) {
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("The request was successful");
  }
});

it("Validates headers are added properly", async () => {

  const options = {
    headers: "Test-Header"
  };

  service.request("GET", null, null, onSuccess, null, null, options);

  function onSuccess(response) {
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("The request was successful");
    expect(response.data.headers).toBe("Test-Header");
  }
});

it("Makes a uploadFile request without crashing", () => {
  const options = {
    headers: "Test-Header"
  };

  const cancelToken = service.uploadFile(null, "test", onSuccess, onFailure, null, undefined);

  function onSuccess(response) {
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("The request was successful");
    expect(response.data.headers).toStrictEqual({ "Content-Type": "multipart/form-data" });
    expect(response.data.file.get("file")).toBe("test");
  }

  function onFailure(error) {
    console.log(error);
  }
});

it("onFailure returns when the request fails", () => {
  const data = {
    error: true
  };

  const options = {
    headers: "Test-Header"
  };

  service.request("GET", null, data, null, onFailure, null, options);

  function onFailure(error) {
    expect(error).toBe("BOOM");
  }
});