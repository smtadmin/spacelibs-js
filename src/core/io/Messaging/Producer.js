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
import { Client, AuthenticationToken } from "pulsar-client";

/**
 * Producer Class
 */
class Producer {
  constructor(config) {
    this.settings = config;
    if(this.settings.host !== undefined && this.settings.port !== undefined) {
      this.settings.path = this.settings.host + ":" + this.settings.port;
    }
  }

  /**
   * Connects to the Pulsar server and returns a client
   * @returns {object} New Pulsar Client
   */
  async connect() {
    // Create a Pulsar client
    if(this.settings.jwtToken !== undefined) {
      return new Client({
        serviceUrl: this.settings.path,
        authentication: new AuthenticationToken({"token": this.settings.jwtToken})
      });
    } else {
      return new Client({
        serviceUrl: this.settings.path
      });
    }
  }

  /**
   * Sends a message to a topic or queue
   * @param {string} topic pulsar topic to connect.  Ex: persistent://public/default/my-topic
   * @param {object} message Message to be placed onto the topic/queue
   */
  async sendMessage(topic, message, props = {}) {
    // Create a producer
    let client = await this.connect();

    try {
      const producer = await client.createProducer({
        topic: topic,
        properties: props
      });

      // Send messages
      let id = await producer.send({ data: Buffer.from(JSON.stringify(message)), properties: props });

      // Buffer and close the connection
      await producer.flush();
      await producer.close();
      await client.close();

      return id;
    } catch (ex) {
      console.log("Error", ex);
    }
  }
}

export default Producer;