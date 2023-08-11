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
import axios from "axios";
import qs from "qs"

class BasePulsarOAuthentication {

    constructor(config = {}) {
        this.settings = config;
		this.token = "";
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
	async updateToken() {
		console.log("Settings");
		console.log(this.settings);
		if(this.hasNPEAuth()) {
			this.token = await this._retrieveNPEJWTToken();
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
	async _retrieveNPEJWTToken() {
		if(this.settings == null) {
			return;
		}
		let postBody = {
            client_id: this.settings.client_id,
            client_secret: this.settings.client_secret,
            scope: this.settings.scope,
			grant_type:this.settings.authorizationGrantType
        }

		return await axios.post(`${this.settings.tokenUri}`, qs.stringify(postBody), {headers: { 'content-type': 'application/x-www-form-urlencoded' }})
			.then(
			async function (response) {
				return response.data.access_token;
		}).catch(async (err) => {
			console.log(err);
		});
	}

}

export default BasePulsarOAuthentication;
