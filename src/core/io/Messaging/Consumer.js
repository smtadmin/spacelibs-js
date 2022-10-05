/*
 * File: /components/message/Consumer.js
 * Version: 0.0.1
 * Project: human-feedback-ui
 * Description: Class to implement the receiving of messages into the provided topic or queue
 * File Created: Wednesday, 20th July 2022 03:50 pm
 * Author: Billy Larsen (billy@siliconmtn.com)
 * -----
 * Last Modified: 
 * Modified By: 
 * -----
 * Copyright 2022, Silicon Mountain Technologies, Inc.
 */

// Imports for this class
import PulsarClient from "./PulsarClient";

/**
 * Pulsar Message consumer
 */
class Consumer extends PulsarClient {
  /**
   * Constructs the consumer with the appropriate host and port
   * @param {object} config Configuration for this app.  Must include the 
   * host param (URL of the pulsar server) and the port of the server
   */
   constructor(config = {}) {
    super(config);
  }

  /**
   * Sends a message to a topic or queue
   * @param {string} topic pulsar topic to connect.  Ex: persistent://public/default/my-topic
   * @param {string} subscription Message to be placed onto the topic/queue
   * @param {function} listener Function to call when a message is received
   */
  async listen(topic, subscription, listener) {
    // Create a producer
    await super.connect();

    try {

      // Create a consumer
      this.consumer = await this.client.subscribe({
          topic: topic,
          subscription: subscription,
          subscriptionType: 'Exclusive',
          listener: listener
      });
    } catch(ex) {
      console.error("Error", ex);
    }
  }

  async disconnect(closeClient) {
    try {
      // Buffer and close te connection
      await this.consumer.close();
      this.consumer = null;
      if(closeClient) {
        this.client.close();
        this.client = null;
      }
    } catch(ex) {
      console.error("Error", ex);
    }
  }
}

export default Consumer;