/*
 * File: /components/message/Consumer.js
 * Version: 0.0.1
 * Project: human-feedback-ui
 * Description: Class to implement the receiving of messages into the provided topic or queue
 * File Created: Wednesday, 20th July 2022 03:50 pm
 * Author: Billy Larsen (billy@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 9th August 2023 1:10pm
 * Modified By: Alex Chung (alex.chung@siliconmtn.com)
 * -----
 * Copyright 2022, Silicon Mountain Technologies, Inc.
 */

// Imports for this class
import { Client, AuthenticationOauth2, AuthenticationToken } from "pulsar-client";

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
      this.settings.path = this.settings.host + ":" + this.settings.port;
    }

    if(!this.settings.hasOwnProperty("tlsAllowInsecureConnection")) {
      this.settings.tlsAllowInsecureConnection = false;
    }

  }

  /**
   * Connects to the Pulsar server and returns a client
   * @returns New Pulsar Client
   */
  async connect() {

    // Create a Pulsar client
    if(this.settings.jwtToken) {
      this.client = new Client({
        serviceUrl: this.settings.path,
        authentication: new AuthenticationToken({token: this.settings.jwtToken}),
        tlsAllowInsecureConnection: this.isTLSAllowInsecureConnection(),
      });
    } else if(this.hasOAuth()) {
      this.client = new Client({
        serviceUrl: this.settings.path,
        authentication: new AuthenticationOauth2({client_id: this.settings.client_id, 
                                                  client_secret: this.settings.client_secret, 
                                                  issuer_url: this.settings.issuer_url}),
        tlsAllowInsecureConnection: this.isTLSAllowInsecureConnection(),
      });
    } else {
      this.client = new Client({
        serviceUrl: this.settings.path
      });
    }
  }

  isTLSAllowInsecureConnection() {
    return this.settings.tlsAllowInsecureConnection === true || this.settings.tlsAllowInsecureConnection === 'true';
  }
  
  hasOAuth(){
    return this.settings.client_id !== undefined && 
            this.settings.client_secret !== undefined &&
            this.issuer_url !== undefined;
  }
}

export default BasePulsarClient;