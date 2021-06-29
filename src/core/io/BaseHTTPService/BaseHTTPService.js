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
 * Last Modified: Tuesday, 29th June 2021 10:07 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
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
		this.request(HTTPMethod.PUT, url, data, params, onComplete, undefined, options);
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
			headers: options?.headers,
			data: bodyData,
			params: reqParams,
			onUploadProgress: onUploadProgress,
			cancelToken: cancelTokenSource.token
		};

		if(requestConfig.headers == null || requestConfig.headers["Content-Type"] == null)
			requestConfig.headers = {
				"Content-Type": "application/json"
			};

		this.axiosInstance.request(requestConfig).then((response) => {
			// Transform it from an Axios response to whatever
			onComplete(this.tranformSuccess(response));
		}).catch((error) => {
			// Transfrom from Axios Error to whatever
			console.error(error);
			onComplete(this.transformError(error));
		});

		return cancelTokenSource;
	}

	/**
	 * Returns a standard response object
	 *
	 * @param {*} response Response object
	 * @returns {*} Response object
	 * @memberof BaseHTTPService
	 */
	tranformSuccess(response) {
		let responseObject = {...response.data};
		responseObject.isValid = true;
		return responseObject;
	}

	/**
	 * Returns a standard error object
	 *
	 * @param {*} error Error object
	 * @returns {*} Response object
	 * @memberof BaseHTTPService
	 */
	transformError(error) {
		let errorObject = {...error.response?.data};
		errorObject.isValid = false;
		errorObject.data = undefined;
		return errorObject;
	}
}

export default BaseHTTPService;