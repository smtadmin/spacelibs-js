import Consumer from './Consumer';
import {Client, AuthenticationToken} from 'pulsar-client';

jest.mock('pulsar-client');

/**
 * Attempts to make a read request and asserts that the returned data.message is equal to "The request was successful"
 */
 it("Generates Path Properly", async () => {
    let config = {};
    config.host = "pulsar://localhost";
    config.port = 1000;
    config.tlsAllowsInsecureConnection = false;

    let consumer = new Consumer(config);

    expect(consumer.settings.host).toBe(config.host);
    expect(consumer.settings.port).toBe(config.port);
    expect(consumer.settings.path).toBe(config.host + ":" + config.port);
    expect(p.settings.tlsAllowsInsecureConnection).toBe(config.tlsAllowsInsecureConnection);
  });

  it("Configures a Consumer properly", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";
    config.jwtToken = "1234abcd";
    config.tlsAllowsInsecureConnection = true;


    let consumer = new Consumer(config);

    expect(consumer.settings.path).toBe(config.path);
    expect(consumer.settings.jwtToken).toBe(config.jwtToken);
    expect(p.settings.tlsAllowsInsecureConnection).toBe(config.tlsAllowsInsecureConnection);
  });


  it("Creates a Client properly with JWT", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";
    config.jwtToken = "1234abcd";


    let consumer = new Consumer(config);

    await consumer.connect();
    expect(consumer.client).toBeTruthy();
  });

  it("Creates a Client properly without JWT", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";


    let consumer = new Consumer(config);

    await consumer.connect();
    expect(consumer.client).toBeTruthy();
  });

  it("Sends a subscribes Properly", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";
    config.jwtToken = "1234abcd";


    let consumer = new Consumer(config);

    await consumer.listen();

    expect(consumer.client).toBeTruthy();
    expect(consumer.consumer).toBeTruthy();
  });

  it("Subscripe Fails Properly", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";
    config.jwtToken = "1234abcd";


    let consumer = new Consumer(config);

    await consumer.listen("BUST");

    expect(consumer.client).toBeTruthy();
    expect(consumer.consumer).toBeTruthy();
  });

  it("Closes just the subscriber", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";
    config.jwtToken = "1234abcd";


    let consumer = new Consumer(config);

    await consumer.listen();

    await consumer.disconnect();

    expect(consumer.client).toBeTruthy();
    expect(consumer.consumer).toBeFalsy();
  });

  it("Closes everything", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";
    config.jwtToken = "1234abcd";


    let consumer = new Consumer(config);

    await consumer.listen();

    await consumer.disconnect(true);

    expect(consumer.client).toBeFalsy();
    expect(consumer.consumer).toBeFalsy();
  });

  it("Disconnect Handle Error Properly", async () => {
    let consumer = new Consumer();

    const errorEvent = jest.spyOn(console, 'error');

    await consumer.listen("BOOM", "Hello World");

    await consumer.disconnect(true);

    expect(errorEvent).toHaveBeenCalled();
  });