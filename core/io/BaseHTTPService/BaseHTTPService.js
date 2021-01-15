/*
 * Filename: BaseHTTPService.js
 * Created Date: Tuesday, January 12th 2021, 2:00:35 pm
 * Author: Tyler Gaffaney
 * Description: This a generic HTTP Service class. You can construct the class with some optional configuration.  There are convenience methods such as read, insert, update, delete, uploadFile, which all transform the request and call 'request' which is the generic request method.
 * 
 * Copyright (c) 2021 Silicon Mountain Technologies
 */

import HTTPMethod from './HTTPMethod';
import axios from 'axios';

export default class BaseHTTPService {

	/**
	 * Constructor for the Base HTTP Service
	 * @param {Object} config Configuration data that will effect aspects of requests.
	 */
	constructor(config){

		/**
		 * Validate config
		 */

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
	 * @param {String} url Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
	 * @param {Object} data Data for the request
	 * @param {Function} onSuccess Handler for successful request.  Handler is passed response object.
	 * @param {Function} onFailure Handler for errors/failures with the request.  Handler is passed an error object.
	 * @param {Object} options Additional options for this request.
	 */
	read(url, data, onSuccess, onFailure,  options = {}){
		this.request(HTTPMethod.GET, url, data, onSuccess, onFailure, undefined, options);
	}
	
	/**
	 * Request call for inserting data.  Uses the `POST` HTTP Method.
	 * @param {String} url Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
	 * @param {Object} data Data for the request
	 * @param {Function} onSuccess Handler for successful request.  Handler is passed response object.
	 * @param {Function} onFailure Handler for errors/failures with the request.  Handler is passed an error object.
	 * @param {Object} options Additional options for this request.
	 */
	insert(url, data, onSuccess, onFailure, options = {}){
		this.request(HTTPMethod.POST, url, data, onSuccess, onFailure, undefined, options);
	}
	
	/**
	 * Request call for updating existing data.  Uses the `PATCH` HTTP Method.
	 * @param {String} url Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
	 * @param {Object} data Data for the request
	 * @param {Function} onSuccess Handler for successful request.  Handler is passed response object.
	 * @param {Function} onFailure Handler for errors/failures with the request.  Handler is passed an error object.
	 * @param {Object} options Additional options for this request.
	 */
	update(url, data, onSuccess, onFailure, options = {}){
		this.request(HTTPMethod.PATCH, url, data, onSuccess, onFailure, undefined, options);
	}

	/**
	 * Request call for deleting data.  Uses the `DELETE` HTTP Method.
	 * @param {String} url Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
	 * @param {Object} data Data for the request
	 * @param {Function} onSuccess Handler for successful request.  Handler is passed response object.
	 * @param {Function} onFailure Handler for errors/failures with the request.  Handler is passed an error object.
	 * @param {Object} options Additional options for this request.
	 */
	delete(url, data, onSuccess, onFailure, options = {}){
		this.request(HTTPMethod.DELETE, url, data, onSuccess, onFailure, undefined, options);
	}

	/**
	 * Request call for uploading a file in a request.  Files are uploaded with `POST` request
	 * @param {String} url Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
	 * @param {Object} file The javascript file object to upload
	 * @param {Object} data Data for the request
	 * @param {Function} onSuccess Handler for successful request.  Handler is passed response object.
	 * @param {Function} onFailure Handler for errors/failures with the request.  Handler is passed an error object.
	 * @param {Function} onUploadProgress Handler for upload progress.  Hanlder is passed a progress object.
	 * @param {Object} options Additional options for this request.
	 */
	uploadFile(url, file, onSuccess, onFailure, onUploadProgress, options = {}){
		options.headers = {
			"Content-Type" : "multipart/form-data"	
		}
		var formData = new FormData();
		formData.append("file", file);
		this.request(HTTPMethod.POST, url, formData, onSuccess, onFailure, onUploadProgress, options);
	}
	
	/**
	 * All purpose HTTP Request function
	 * @param {HTTPMethod} method The method for this HTTP Request 
	 * @param {String} url The url you are making this request too.  If it's a relative URI, the baseURL you passed in will be used as the base.  If  
	 * @param {String} url Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
	 * @param {Object} data Data for the request
	 * @param {Function} onSuccess Handler for successful request.  Handler is passed response object.
	 * @param {Function} onFailure Handler for errors/failures with the request.  Handler is passed an error object.
	 * @param {Function} onUploadProgress Handler for upload progress.  Hanlder is passed a progress object.
	 * @param {Object} options Additional options for this request.
	 */
	request(method, url, data, onSuccess, onFailure, onUploadProgress, options) {
		
		/**
		 * Validate method
		 */
		if(HTTPMethod[method] === undefined){
			console.error("HTTP Method " + method + " is not valid.");
			return;
		}

		const requestConfig = {
			url: url,
			method: method,
		}

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

		axios.request(requestConfig).then((response) => {
			// Transform it from an Axios response to whatever
			onSuccess(response);
		}).catch((error) => {
			// Transfrom from Axios Error to whatever
			onFailure(error);
		})
		return cancelTokenSource;
	}
}


