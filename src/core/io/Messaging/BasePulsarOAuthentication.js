/*
 * File: core/io/Messaging/BasePulsarAuthentication.js
 * Version: 0.0.1
 * Project: human-feedback-ui
 * Description: Class to configure Pulsar authentication
 * File Created: Friday, 11th August 2023 11:00 am
 * Author: Alex Chung (alex.chung@siliconmtn.com)
 * -----
 * Last Modified: 
 * Modified By: 
 * -----
 * Copyright 2023, Silicon Mountain Technologies, Inc.
 */


// Imports for this class
import BaseHTTPService from "../BaseHTTPService/BaseHTTPService";

class BasePulsarOAuthentication {
    constructor(config = {}) {
        this.settings = config;
		this.updateToken();
    }

    //Returns JWT token
    get() {
		return this.token;
	}

	/**
	 * Updates NPE KeyCloak token for the PulsarClient.
	 *
	 * If enabled on the application, supports scheduling via a Spring Cron expression
	 */
	updateToken() {
		if(this.hasNPEAuth()) {
			this._retrieveNPEJWTToken();
		} else {
			//Authenticator requires at least an empty string to avoid an NPE.
			this.token = "";
		}
	}

    hasNPEAuth(){
        return this.settings.hasOwnProperty("client_id") && 
                this.settings.hasOwnProperty("client_secret") &&
                this.settings.hasOwnProperty("tokenUri") && 
                this.settings.hasOwnProperty("scope") &&
                this.settings.hasOwnProperty("authorizationGrantType");
    }

	/**
	 * Responsible for retrieving the JWT Token authorized by the given ClientRegistration config.
	 * The Curl command being generated and executed is as follows.
	 *
	 * curl -k --location --request POST <KEY_CLOAK_URL> 
	 * --header 'Content-Type: application/x-www-form-urlencoded' 
	 * --data-urlencode "client_id=svc<CLIENT_ID>" 
	 * --data-urlencode "client_secret=<CLIENT_SECRET>" 
	 * --data-urlencode 'scope=email' 
	 * --data-urlencode 'grant_type=client_credentials'
	 * @param reg
	 */
	_retrieveNPEJWTToken() {
		token = null;

		if(config == null) {
			return;
		}
		postBody = {
            client_id: this.settings.config.client_id,
            client_secret: this.settings.client_secret,
            scope: this.settings.scope,
            grant_type: this.grant_type
        }

		try {
			data = BaseHTTPService.insert(this.settings.tokenUri,postBody,JSON.parse);
			token = data.access_token;
		} catch(error) {
			console.log(error)
		}
	}

}

export default BasePulsarOAuthentication;