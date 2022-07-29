/*
 * File: /components/message/Producer.js
 * Version: 0.0.1
 * Project: human-feedback-ui
 * Description: Class to implement the sending of messages into the provided topic or queue
 * File Created: Saturday, 16th July 2022 11:25 pm
 * Author: James Camire james@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 26th July 2022 1:35 pm
 * Modified By: James Camire (james@siliconmtn.com)
 * -----
 * Copyright 2022, Silicon Mountain Technologies, Inc.
 */

// Imports for this class
import { Client } from "pulsar-client";

/**
 * Producer Class
 */
class Producer {
  /**
   * Initializes the Producer with the host and port supplied
   * @param {object} config Configuration for this app.  Must include the 
   * host param (URL of the pulsar server) and the port of the server
   */
  constructor(config) {
    this.settings = config;
    this.settings.path = this.settings.host + ":" + this.settings.port;
  }

  /**
   * Connects to the Pulsar server and returns a client
   * @returns {object} New Pulsar Client
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
   * @param {object} message Message to be placed onto the topic/queue
   */
  async sendMessage(topic, message) {
    // Create a producer
    let client = await this.connect();

    try {
      console.log("Got a MESSAGE request for the human feedback", message);
      const producer = await client.createProducer({
        topic: topic
      });

      // Send messages
      producer.send({ data: Buffer.from(JSON.stringify(message)) });

      // Buffer and close the connection
      await producer.flush();
      await producer.close();
      await client.close();
    } catch (ex) {
      console.log("Error", ex);
    }
  }
}

export default Producer;