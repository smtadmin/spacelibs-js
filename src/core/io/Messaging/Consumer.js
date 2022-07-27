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
import { Client } from "pulsar-client";

/**
 * Pulsar Message consumer
 */
class Consumer {
  /**
   * Constructs the consumer with the appropriate host and port
   * @param {object} config Configuration for this app.  Must include the 
   * host param (URL of the pulsar server) and the port of the server
   */
  constructor(config) {
    this.settings = config;
    this.settings.path = this.settings.host + ":" + this.settings.port;
  }

  /**
   * Connects to the Pulsar server and returns a client
   * @returns New Pulsar Client
   */
  async connect() {

    // Create a Pulsar client
    return new Client({
      serviceUrl: this.settings.path
    });
  }

  /**
   * Sends a message to a topic or queue
   * @param {string} topic pulsar topic to connect.  Ex: persistent://public/default/my-topic
   * @param {string} subscription Message to be placed onto the topic/queue
   * @param {function} listener Function to call when a message is received
   */
  async sendMessage(topic, subscription, listener) {
    // Create a producer
    let client = await this.connect();

    // Create a consumer
    const consumer = await client.subscribe({
        topic: topic,
        subscription: subscription,
        subscriptionType: 'Exclusive',
        listener: listener,
    });

    // Buffer and close te connection
    await consumer.close();
    await client.close();
  }

}

export default Consumer;