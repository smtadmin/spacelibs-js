import Producer from './Producer';

jest.mock('pulsar-client');

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


  it("Handle Error Properly", async () => {
    let p = new Producer();

    const errorEvent = jest.spyOn(console, 'error');

    await p.sendMessage("BOOM", "Hello World");

    expect(errorEvent).toHaveBeenCalled();
  });