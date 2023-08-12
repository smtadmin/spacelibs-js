import BasePulsarClient from './BasePulsarClient';

jest.mock('pulsar-client');

it("Doesn't Error on empty config", async () => {
    let p = new BasePulsarClient();

    expect(p).toBeTruthy();
});

/**
 * Attempts to make a read request and asserts that the returned data.message is equal to "The request was successful"
 */
 it("Generates Path Properly", async () => {
    let config = {};
    config.host = "pulsar://localhost";
    config.port = 1000;
    config.tlsAllowInsecureConnection = false;

    let pulsarClient = new BasePulsarClient(config);

    expect(pulsarClient.settings.host).toBe(config.host);
    expect(pulsarClient.settings.port).toBe(config.port);
    expect(pulsarClient.settings.path).toBe(config.host + ":" + config.port);
    expect(pulsarClient.settings.tlsAllowInsecureConnection).toBe(config.tlsAllowInsecureConnection);
  });

  it("Configures a JWT pulsarClient properly", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";
    config.jwtToken = "1234abcd";
    config.tlsAllowInsecureConnection = true;


    let pulsarClient = new BasePulsarClient(config);

    expect(pulsarClient.settings.path).toBe(config.path);
    expect(pulsarClient.settings.jwtToken).toBe(config.jwtToken);
    expect(pulsarClient.settings.tlsAllowInsecureConnection).toBe(config.tlsAllowInsecureConnection);
  });

  it("Configures a NPE pulsarClient properly", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";
    config.tokenUri = "9876zyxw";
    config.client_id = "zyxw9876";
    config.client_secret = "abcd1234";
    config.scope = "email";
    config.grant_type = "client_credentials";
    config.tlsAllowInsecureConnection = true;


    let pulsarClient = new BasePulsarClient(config);

    expect(pulsarClient.settings.path).toBe(config.path);
    expect(pulsarClient.auth.settings.tokenUri).toBe(config.tokenUri);
    expect(pulsarClient.auth.settings.client_id).toBe(config.client_id);
    expect(pulsarClient.auth.settings.client_secret).toBe(config.client_secret);
    expect(pulsarClient.auth.settings.scope).toBe(config.scope);
    expect(pulsarClient.auth.settings.grant_type).toBe(config.grant_type);
    expect(pulsarClient.settings.tlsAllowInsecureConnection).toBe(config.tlsAllowInsecureConnection);
  });


  it("Creates a Client properly with JWT", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";
    config.jwtToken = "1234abcd";


    let pulsarClient = new BasePulsarClient(config);

    await pulsarClient.connect();
    expect(pulsarClient.client).toBeTruthy();
  });

  it("Creates a Client properly with NPE", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";
    
    //Insert proper credentials
    config.tokenUri = "token"
    config.client_id = "1234abcd";
    config.client_secret = "abcd1234";
    
    config.scope = "email";
    config.grant_type = "client_credentials";


    let pulsarClient = new BasePulsarClient(config);

    await pulsarClient.connect();
    expect(pulsarClient.client).toBeTruthy();
  });

  it("Creates a Client properly without JWT", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";


    let pulsarClient = new BasePulsarClient(config);

    await pulsarClient.connect();
    expect(pulsarClient.client).toBeTruthy();
  });


  it("tlsAllowInsecureConnection bool true", async () => {
    let config = {};
    config.host = "pulsar://localhost";
    config.port = 1000;
    config.tlsAllowInsecureConnection = true;

    let pulsarClient = new BasePulsarClient(config);

    expect(pulsarClient.isTLSAllowInsecureConnection()).toBe(true);
  });

  it("tlsAllowInsecureConnection string true", async () => {
    let config = {};
    config.host = "pulsar://localhost";
    config.port = 1000;
    config.tlsAllowInsecureConnection = "true";

    let pulsarClient = new BasePulsarClient(config);

    expect(pulsarClient.isTLSAllowInsecureConnection()).toBe(true);
  });

  it("tlsAllowInsecureConnection bool false", async () => {
    let config = {};
    config.host = "pulsar://localhost";
    config.port = 1000;
    config.tlsAllowInsecureConnection = false;

    let pulsarClient = new BasePulsarClient(config);

    expect(pulsarClient.isTLSAllowInsecureConnection()).toBe(false);
  });

  it("tlsAllowInsecureConnection string false", async () => {
    let config = {};
    config.host = "pulsar://localhost";
    config.port = 1000;
    config.tlsAllowInsecureConnection = "false";

    let pulsarClient = new BasePulsarClient(config);

    expect(pulsarClient.isTLSAllowInsecureConnection()).toBe(false);
  });

  it("tlsAllowInsecureConnection null", async () => {
    let config = {};
    config.host = "pulsar://localhost";
    config.port = 1000;
    config.tlsAllowInsecureConnection = null;

    let pulsarClient = new BasePulsarClient(config);

    expect(pulsarClient.isTLSAllowInsecureConnection()).toBe(false);
  });

  it("tlsAllowInsecureConnection 0", async () => {
    let config = {};
    config.host = "pulsar://localhost";
    config.port = 1000;
    config.tlsAllowInsecureConnection = 0;

    let pulsarClient = new BasePulsarClient(config);

    expect(pulsarClient.isTLSAllowInsecureConnection()).toBe(false);
  });

  it("tlsAllowInsecureConnection 1", async () => {
    let config = {};
    config.host = "pulsar://localhost";
    config.port = 1000;
    config.tlsAllowInsecureConnection = 1;

    let pulsarClient = new BasePulsarClient(config);

    expect(pulsarClient.isTLSAllowInsecureConnection()).toBe(false);
  });