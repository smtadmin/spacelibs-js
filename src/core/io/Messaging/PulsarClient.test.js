import PulsarClient from './PulsarClient';

jest.mock('pulsar-client');

it("Doesn't Error on empty config", async () => {
    let p = new PulsarClient();

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

    let pulsarClient = new PulsarClient(config);

    expect(pulsarClient.settings.host).toBe(config.host);
    expect(pulsarClient.settings.port).toBe(config.port);
    expect(pulsarClient.settings.path).toBe(config.host + ":" + config.port);
    expect(pulsarClient.settings.tlsAllowInsecureConnection).toBe(config.tlsAllowInsecureConnection);
  });

  it("Configures a pulsarClient properly", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";
    config.jwtToken = "1234abcd";
    config.tlsAllowInsecureConnection = true;


    let pulsarClient = new PulsarClient(config);

    expect(pulsarClient.settings.path).toBe(config.path);
    expect(pulsarClient.settings.jwtToken).toBe(config.jwtToken);
    expect(pulsarClient.settings.tlsAllowInsecureConnection).toBe(config.tlsAllowInsecureConnection);
  });


  it("Creates a Client properly with JWT", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";
    config.jwtToken = "1234abcd";


    let pulsarClient = new PulsarClient(config);

    await pulsarClient.connect();
    expect(pulsarClient.client).toBeTruthy();
  });

  it("Creates a Client properly without JWT", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";


    let pulsarClient = new PulsarClient(config);

    await pulsarClient.connect();
    expect(pulsarClient.client).toBeTruthy();
  });


  it("tlsAllowInsecureConnection bool true", async () => {
    let config = {};
    config.host = "pulsar://localhost";
    config.port = 1000;
    config.tlsAllowInsecureConnection = true;

    let pulsarClient = new PulsarClient(config);

    expect(pulsarClient.isTLSAllowInsecureConnection()).toBe(true);
  });

  it("tlsAllowInsecureConnection string true", async () => {
    let config = {};
    config.host = "pulsar://localhost";
    config.port = 1000;
    config.tlsAllowInsecureConnection = "true";

    let pulsarClient = new PulsarClient(config);

    expect(pulsarClient.isTLSAllowInsecureConnection()).toBe(true);
  });

  it("tlsAllowInsecureConnection bool false", async () => {
    let config = {};
    config.host = "pulsar://localhost";
    config.port = 1000;
    config.tlsAllowInsecureConnection = false;

    let pulsarClient = new PulsarClient(config);

    expect(pulsarClient.isTLSAllowInsecureConnection()).toBe(false);
  });

  it("tlsAllowInsecureConnection string false", async () => {
    let config = {};
    config.host = "pulsar://localhost";
    config.port = 1000;
    config.tlsAllowInsecureConnection = "false";

    let pulsarClient = new PulsarClient(config);

    expect(pulsarClient.isTLSAllowInsecureConnection()).toBe(false);
  });

  it("tlsAllowInsecureConnection null", async () => {
    let config = {};
    config.host = "pulsar://localhost";
    config.port = 1000;
    config.tlsAllowInsecureConnection = null;

    let pulsarClient = new PulsarClient(config);

    expect(pulsarClient.isTLSAllowInsecureConnection()).toBe(false);
  });

  it("tlsAllowInsecureConnection 0", async () => {
    let config = {};
    config.host = "pulsar://localhost";
    config.port = 1000;
    config.tlsAllowInsecureConnection = 0;

    let pulsarClient = new PulsarClient(config);

    expect(pulsarClient.isTLSAllowInsecureConnection()).toBe(false);
  });

  it("tlsAllowInsecureConnection 1", async () => {
    let config = {};
    config.host = "pulsar://localhost";
    config.port = 1000;
    config.tlsAllowInsecureConnection = 1;

    let pulsarClient = new PulsarClient(config);

    expect(pulsarClient.isTLSAllowInsecureConnection()).toBe(false);
  });