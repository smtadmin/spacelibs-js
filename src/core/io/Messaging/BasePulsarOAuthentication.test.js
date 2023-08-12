import BasePulsarOAuthentication from "./BasePulsarOAuthentication"
const axios = require("axios");

jest.mock("axios");

it("Doesn't Error on empty config", async () => {
    let p = new BasePulsarOAuthentication();

    expect(p).toBeTruthy();

});


it("Detects a NPE pulsarClient properly", async () => {
  let config = {};
  config.tokenUri = "9876zyxw";
  config.client_id = "zyxw9876";
  config.client_secret = "abcd1234";
  config.scope = "email";
  config.grant_type = "client_credentials";
  config.tlsAllowInsecureConnection = true;

  let oauth = new BasePulsarOAuthentication(config);

  expect(oauth.settings.tokenUri).toBe(config.tokenUri);
  expect(oauth.settings.client_id).toBe(config.client_id);
  expect(oauth.settings.client_secret).toBe(config.client_secret);
  expect(oauth.settings.scope).toBe(config.scope);
  expect(oauth.settings.grant_type).toBe(config.grant_type);
});

it("Uses an offered token when neccesary", async () => {
  let config = {};
  config.jwtToken = "abcd1234";
  config.scope = "email";
  config.grant_type = "client_credentials";
  config.tlsAllowInsecureConnection = true;

  let oauth = new BasePulsarOAuthentication(config);

  oauth.updateToken();

  expect(oauth.token).toBe(config.jwtToken);
});

it("Updates the token properly", async () => {
  let url = "9876zyxw";
  let token = "hereisatoken";
  let config = {};
  config.path = "pulsar://localhost:1000";
  config.tokenUri = url;
  config.client_id = "zyxw9876";
  config.client_secret = "abcd1234";
  config.scope = "email";
  config.authorizationGrantType = "client_credentials";
  config.tlsAllowInsecureConnection = true;


  let postBody = {
    client_id: config.client_id,
    client_secret: config.client_secret,
    scope: config.scope,
    grant_type:config.authorizationGrantType
  }

  axios.post.mockImplementation(() => Promise.resolve({ data: {access_token: token} }));

  let oauth = new BasePulsarOAuthentication(config);

  await oauth.updateToken();

  expect(oauth.token).toBe(token);
});
