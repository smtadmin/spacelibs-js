/*
 * File: /src/core/io/BaseHTTPService/BaseHTTPService.js
 * Version: 0.0.1
 * Project: spacelibs-js
 * Description: This a generic HTTP Service class. You can construct the class with some optional configuration.  There are convenience methods such as read, insert, update, delete, uploadFile, which all transform the request and call 'request' which is the generic request method.
 * File Created: Monday, 18th January 2021 3:42 pm
 * Author: Tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 18th February 2021 3:11 pm
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
	constructor(config){

		// Axios Instance
		this.axiosInstance = axios.create({
			baseURL: config.host,
			timeout: config.timeoutInterval
		});

		this.settings = {
			requireSSL : config.requireSSL
		};
	}

	/**
	 * Request call for reading/selecting data.  Uses the `GET` HTTP Method.
	 * @param {string} url - Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
	 * @param {object} data - Data for the request
	 * @param {Function} onSuccess - Handler for successful request.  Handler is passed response object.
	 * @param {Function} onFailure - Handler for errors/failures with the request.  Handler is passed an error object.
	 * @param {object} options - Additional options for this request.
	 * @memberof BaseHTTPService
	 */
	read(url, data, onSuccess, onFailure,  options = {}){
		console.log("HELLO");
		this.request(HTTPMethod.GET, url, data, onSuccess, onFailure, undefined, options);
	}
	
	/**
	 * Request call for inserting data.  Uses the `POST` HTTP Method.
	 * @param {string} url - Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
	 * @param {object} data - Data for the request
	 * @param {Function} onSuccess - Handler for successful request.  Handler is passed response object.
	 * @param {Function} onFailure - Handler for errors/failures with the request.  Handler is passed an error object.
	 * @param {object} options - Additional options for this request.
	 * @memberof BaseHTTPService
	 */
	insert(url, data, onSuccess, onFailure, options = {}){
		this.request(HTTPMethod.POST, url, data, onSuccess, onFailure, undefined, options);
	}
	
	/**
	 * Request call for updating existing data.  Uses the `PATCH` HTTP Method.
	 * @param {string} url - Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
	 * @param {object} data - Data for the request
	 * @param {Function} onSuccess - Handler for successful request.  Handler is passed response object.
	 * @param {Function} onFailure - Handler for errors/failures with the request.  Handler is passed an error object.
	 * @param {object} options - Additional options for this request.
	 * @memberof BaseHTTPService
	 */
	update(url, data, onSuccess, onFailure, options = {}){
		this.request(HTTPMethod.PATCH, url, data, onSuccess, onFailure, undefined, options);
	}

	/**
	 * Request call for deleting data.  Uses the `DELETE` HTTP Method.
	 * @param {string} url - Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
	 * @param {object} data - Data for the request
	 * @param {Function} onSuccess - Handler for successful request.  Handler is passed response object.
	 * @param {Function} onFailure - Handler for errors/failures with the request.  Handler is passed an error object.
	 * @param {object} options - Additional options for this request.
	 * @memberof BaseHTTPService
	 */
	delete(url, data, onSuccess, onFailure, options = {}){
		this.request(HTTPMethod.DELETE, url, data, onSuccess, onFailure, undefined, options);
	}

	/**
	 * Request call for uploading a file in a request.  Files are uploaded with `POST` request
	 * @param {string} url - Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
	 * @param {object} file - The javascript file object to upload
	 * @param {Function} onSuccess - Handler for successful request.  Handler is passed response object.
	 * @param {Function} onFailure - Handler for errors/failures with the request.  Handler is passed an error object.
	 * @param {Function} onUploadProgress - Handler for upload progress.  Hanlder is passed a progress object.
	 * @param {object} options - Additional options for this request.
	 * @memberof BaseHTTPService
	 */
	uploadFile(url, file, onSuccess, onFailure, onUploadProgress, options = {}){
		options.headers = {
			"Content-Type" : "multipart/form-data"	
		};
		var formData = new FormData();
		formData.append("file", file);
		this.request(HTTPMethod.POST, url, formData, onSuccess, onFailure, onUploadProgress, options);
	}
	
	/**
	 * All purpose HTTP Request function
	 * @param {module:HTTPMethod} method - The method for this HTTP Request
	 * @param {string} url - The url you are making this request too.  If it's a relative URI, the baseURL you passed in will be used as the base.
	 * @param {object} data - Data for the request
	 * @param {Function} onSuccess - Handler for successful request.  Handler is passed response object.
	 * @param {Function} onFailure - Handler for errors/failures with the request.  Handler is passed an error object.
	 * @param {any} onUploadProgress - Handler for upload progress.  Hanlder is passed a progress object.
	 * @param {object} options - Additional options for this request.
	 * @returns {object} Cancel token to cancel the request
	 * @memberof BaseHTTPService
	 */	
	request(method, url, data, onSuccess, onFailure, onUploadProgress, options) {
		
		/**
		 * Validate method
		 */
		if(HTTPMethod[method] === undefined){
			console.error("HTTP Method " + method + " is not valid.");
			return;
		}

		let requestConfig = {};

		/**
		 * Add url
		 */

		requestConfig.url = url;
		
		/**
		 * Validate options
		 */
		if(options === undefined || options === null){
			console.warn("Request options was null, by default it should be an empty object {}");
		}else if(options["headers"] !== undefined){
			requestConfig.headers = options.headers;
		}

		/**
		 * HTTP Method handing
		 */
		if(data !== undefined && data !== null){
			if(method === HTTPMethod.POST || method === HTTPMethod.PATCH || method === HTTPMethod.PUT || method === HTTPMethod.DELETE){
				requestConfig.data = data;
			}else{
				requestConfig.params = data;
			}
		}

		/**
		 * Upload Progress handler
		 */
		if(onUploadProgress !== undefined){
			requestConfig.onUploadProgress = onUploadProgress;
		}

		/**
		 * Cancel tokens
		 */
		const cancelTokenSource = axios.CancelToken.source();
		requestConfig.cancelToken = cancelTokenSource.token;

		console.log(requestConfig);
		axios.request(requestConfig).then((response) => {
			// Transform it from an Axios response to whatever
			onSuccess(response);
		}).catch((error) => {
			// Transfrom from Axios Error to whatever
			onFailure(error);
		});
		return cancelTokenSource;
	}
}

export default BaseHTTPService;