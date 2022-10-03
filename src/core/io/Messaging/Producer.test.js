import Producer from './Producer';
import {Client, AuthenticationToken} from 'pulsar-client';

jest.mock('pulsar-client');

/**
 * Attempts to make a read request and asserts that the returned data.message is equal to "The request was successful"
 */
 it("Generates Path Properly", async () => {
    let config = {};
    config.host = "pulsar://localhost";
    config.port = 1000;

    let p = new Producer(config);

    expect(p.settings.host).toBe(config.host);
    expect(p.settings.port).toBe(config.port);
    expect(p.settings.path).toBe(config.host + ":" + config.port);  
  });

  it("Configures a Producer properly", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";
    config.jwtToken = "1234abcd";


    let p = new Producer(config);

    expect(p.settings.path).toBe(config.path);
    expect(p.settings.jwtToken).toBe(config.jwtToken);
  });


  it("Creates a Client properly with JWT", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";
    config.jwtToken = "1234abcd";


    let p = new Producer(config);

    expect(await p.connect()).toBeTruthy();
  });

  it("Creates a Client properly without JWT", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";

    let p = new Producer(config);

    expect(await p.connect()).toBeTruthy();
  });

  it("Produce Message Properly", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";
    config.jwtToken = "1234abcd";

    let p = new Producer(config);

    const id = await p.sendMessage("destTopic", "Hello World", {'Data': 'data'});

    expect(id).toBeTruthy();
  });

  it("Produce Message Properly No Props", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";
    config.jwtToken = "1234abcd";

    let p = new Producer(config);

    const id = await p.sendMessage("destTopic", "Hello World");

    expect(id).toBeTruthy();
  });