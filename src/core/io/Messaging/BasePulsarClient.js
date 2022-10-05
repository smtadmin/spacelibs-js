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
import { Client, AuthenticationToken } from "pulsar-client";

/**
 * Pulsar Message consumer
 */
class BasePulsarClient {
  /**
   * Constructs the consumer with the appropriate host and port
   * @param {object} config Configuration for this app.  Must include the 
   * host param (URL of the pulsar server) and the port of the server
   */
   constructor(config = {}) {
    this.settings = config;
    if(this.settings.host !== undefined && this.settings.port !== undefined) {
      console.log("Building Path");
      this.settings.path = this.settings.host + ":" + this.settings.port;
    }

    if(!this.settings.hasOwnProperty("tlsAllowInsecureConnection")) {
      console.log("Populating Missing TLS AllowInsecureConnection FALSE");
      this.settings.tlsAllowInsecureConnection = false;
    }

    console.log("Settings Generated: ", this.settings);
  }

  /**
   * Connects to the Pulsar server and returns a client
   * @returns New Pulsar Client
   */
  async connect() {

    // Create a Pulsar client
    if(this.settings.jwtToken) {
      console.log("Generating JWT Token Auth Client");
      this.client = new Client({
        serviceUrl: this.settings.path,
        authentication: new AuthenticationToken({token: this.settings.jwtToken}),
        tlsAllowInsecureConnection: this.isTLSAllowInsecureConnection(),
      });
    } else {
      console.log("Generating No Auth Client");
      this.client = new Client({
        serviceUrl: this.settings.path
      });
    }
  }

  isTLSAllowInsecureConnection() {
    return this.settings.tlsAllowInsecureConnection === true || this.settings.tlsAllowInsecureConnection === 'true';
  }
}

export default BasePulsarClient;