import Consumer from './Consumer';

jest.mock('pulsar-client');

  it("Sends a subscribes Properly", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";
    config.jwtToken = "1234abcd";


    let consumer = new Consumer(config);

    await consumer.listen();

    expect(consumer.client).toBeTruthy();
    expect(consumer.consumer).toBeTruthy();
  });

  it("Subscribe Fails Properly", async () => {
    let config = {};
    config.path = "pulsar://localhost:1000";
    config.jwtToken = "1234abcd";


    let consumer = new Consumer(config);

    await consumer.listen("BUST");

    expect(consumer.client).toBeTruthy();
    expect(consumer.consumer).toBeFalsy();
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