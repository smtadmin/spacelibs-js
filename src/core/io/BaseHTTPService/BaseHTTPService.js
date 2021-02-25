/*
 * File: /src/core/io/BaseHTTPService/BaseHTTPService.js
 * Version: 0.0.1
 * Project: spacelibs-js
 * Description: This a generic HTTP Service class. You can construct the 
 * class with some optional configuration.  There are convenience methods 
 * such as read, insert, update, delete, uploadFile, which all transform 
 * the request and call 'request' which is the generic request method.
 * 
 * File Created: Monday, 18th January 2021 3:42 pm
 * Author: Tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 25th February 2021 4:55 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import HTTPMethod from '../HTTPMethod';
import axios from 'axios';

/**
 * Class representing the BaseHTTPService
 */
class BaseHTTPService {

	/**
	 * Constructor for the Base HTTP Service
	 * @param {object} config - Configuration data that will effect aspects of requests.
	 * @constructs BaseHTTPService
	 * @memberof BaseHTTPService
	 */
	constructor(config) {
		// Axios Instance
		this.axiosInstance = axios.create({
			baseURL: config.host,
			timeout: config.timeoutInterval
		});

		this.settings = {
			requireSSL: config.requireSSL
		};
	}

	/**
	 * Function to return the baseURL
	 * @returns {*} The set baseURL
	 */
	getBaseURL(){
		return this.axiosInstance.defaults.baseURL;
	}

	/**
	 * Request call for reading/selecting data.  Uses the `GET` HTTP Method.
	 * @param {string} url - Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
	 * @param {object} params - Params for the request
	 * @param {Function} onComplete - Handler for request completion.
	 * @param {object} options - Additional options for this request.
	 * @memberof BaseHTTPService
	 */
	read(url, params, onComplete, options = {}) {
		this.request(HTTPMethod.GET, url, null, params, onComplete, undefined, options);
	}

	/**
	 * Request call for inserting data.  Uses the `POST` HTTP Method.
	 * @param {string} url - Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
	 * @param {object} data - Data for the request
	 * @param {object} params - Params for the request
	 * @param {Function} onComplete - Handler for request completion.
	 * @param {object} options - Additional options for this request.
	 * @memberof BaseHTTPService
	 */
	insert(url, data, params, onComplete, options = {}) {
		this.request(HTTPMethod.POST, url, data, params, onComplete, undefined, options);
	}

	/**
	 * Request call for updating existing data.  Uses the `PATCH` HTTP Method.
	 * @param {string} url - Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
	 * @param {object} data - Data for the request
	 * @param {object} params - Params for the request
	 * @param {Function} onComplete - Handler for request completion.
	 * @param {object} options - Additional options for this request.
	 * @memberof BaseHTTPService
	 */
	update(url, data, params, onComplete, options = {}) {
		this.request(HTTPMethod.PATCH, url, data, params, onComplete, undefined, options);
	}

	/**
	 * Request call for deleting data.  Uses the `DELETE` HTTP Method.
	 * @param {string} url - Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
	 * @param {object} data - Data for the request
	 * @param {object} params - Params for the request
	 * @param {Function} onComplete - Handler for request completion.
	 * @param {object} options - Additional options for this request.
	 * @memberof BaseHTTPService
	 */
	delete(url, data, params, onComplete, options = {}) {
		this.request(HTTPMethod.DELETE, url, data, params, onComplete, undefined, options);
	}

	/**
	 * Request call for uploading a file in a request.  Files are uploaded with `POST` request
	 * @param {string} url - Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
	 * @param {object} file - The javascript file object to upload
	 * @param {Function} onComplete - Handler for request completion.
	 * @param {Function} onUploadProgress - Handler for upload progress.  Hanlder is passed a progress object.
	 * @param {object} options - Additional options for this request.
	 * @memberof BaseHTTPService
	 */
	uploadFile(url, file, onComplete, onUploadProgress, options = {}) {
		options.headers = {
			"Content-Type": "multipart/form-data"
		};
		var formData = new FormData();
		formData.append("file", file);
		this.request(HTTPMethod.POST, url, formData, undefined, onComplete, onUploadProgress, options);
	}

	/**
	 * All purpose HTTP Request function
	 * @param {module:HTTPMethod} method - The method for this HTTP Request
	 * @param {string} url - The url you are making this request too.  If it's a relative URI, the baseURL you passed in will be used as the base.
	 * @param {object} bodyData - Data for the request
	 * @param {object} reqParams - Data for the request
	 * @param {Function} onComplete - Handler for responses. Handler is passed response object.
	 * @param {any} onUploadProgress - Handler for upload progress.  Hanlder is passed a progress object.
	 * @param {object} options - Additional options for this request.
	 * @returns {object} Cancel token to cancel the request
	 * @memberof BaseHTTPService
	 */
	request(method, url, bodyData, reqParams, onComplete, onUploadProgress, options) {
		/**
		 * Cancel tokens
		 */
		const cancelTokenSource = axios.CancelToken.source();

		let requestConfig = {
			url: url,
			method: HTTPMethod[method],
			headers: {Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwdklQUHpzdXR3NmZtV0xOT1ZKdzZQb25tY1gtWFpobm05Y2pPMV9EYUdzIn0.eyJleHAiOjE2MTQyOTYwNTMsImlhdCI6MTYxNDI5NTc1MywianRpIjoiMTI2ZmU3NTktN2I0Yi00YjJkLTkwYjctYmQ5NzVlYjc0NTUxIiwiaXNzIjoiaHR0cHM6Ly9hcnRpZmljaWFsaXMtbWFjaGluYS5oNGNrLm1lL2F1dGgvcmVhbG1zL2V6Zm9ybSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5ODQ0MWMwMy0yM2NmLTRhZmUtYmU3NS1hYzI3MWE0NWMyOTUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJlemZvcm0tYXBpIiwic2Vzc2lvbl9zdGF0ZSI6ImE0MDY0ZTk0LWZkMjgtNGQ0Mi1hOWNmLTViYTVkNjk3MjdiMiIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImV6Zm9ybS1hcGkiOnsicm9sZXMiOlsiTWVtYmVyIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJqYW1lcyBqYW1lcyIsInByZWZlcnJlZF91c2VybmFtZSI6ImV0ZXdhIiwiZ2l2ZW5fbmFtZSI6ImphbWVzIiwiZmFtaWx5X25hbWUiOiJqYW1lcyIsImVtYWlsIjoiamFtZXNAc210LmNvbSJ9.WMiZ7bfzBbXTb4FN_NhZzBTMfJ0Z47VoTLViYAxngYfzvJC2O94jUu-CISRDrD-mu5_DRLCKVFuCAuWpl1qY-1SLTy8YYjWm6wc8_fz0NJ8557TP2-skBtLphlv5FuUTDYJXxdABgt2opbHbsju4xYxkaA_NpW6JO9CwdFHudk4y1JkZ-PfQDq7WrRZKRX0rSwnOu5vqgr_silHyddBuUVcUwTccoIj_QqTRwgXibKG85G0PpkutSDV7wwbkal7CD6C9QsIC5GpDej0MSrE35Hyy8dVaCFP8775O8xyjgw-PMw0Cg-NFFk6aNZsJfI7__YmRE5NrZwyB_EYAsyE-YA"},
			data: bodyData,
			params: reqParams,
			onUploadProgress: onUploadProgress,
			cancelToken: cancelTokenSource.token
		};

		this.axiosInstance.request(requestConfig).then((response) => {
			// Transform it from an Axios response to whatever
			onComplete(this.tranformSuccess(response));
		}).catch((error) => {
			// Transfrom from Axios Error to whatever
			onComplete(this.transformError(error));
		});

		return cancelTokenSource;
	}

	tranformSuccess(response) {
		return {
			isValid: true,
			data: response.data
		};
	}

	transformError(error) {
		return {
			isValid: false,
			data: null
		};
	}
}

export default BaseHTTPService;