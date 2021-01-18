

import HTTPMethod from './HTTPMethod';
import axios from 'axios';

export default class BaseHTTPService {
	constructor(config) {

		this.axiosInstance = axios.create({
			baseURL: config.host,
			timeout: config.timeoutInterval
		});

		this.settings = {
			requireSSL: config.requireSSL
		};
	}

	read(url, data, onSuccess, onFailure, options = {}) {
		this.request(HTTPMethod.GET, url, data, onSuccess, onFailure, undefined, options);
	}

	insert(url, data, onSuccess, onFailure, options = {}) {
		this.request(HTTPMethod.POST, url, data, onSuccess, onFailure, undefined, options);
	}

	update(url, data, onSuccess, onFailure, options = {}) {
		this.request(HTTPMethod.PATCH, url, data, onSuccess, onFailure, undefined, options);
	}

	delete(url, data, onSuccess, onFailure, options = {}) {
		this.request(HTTPMethod.DELETE, url, data, onSuccess, onFailure, undefined, options);
	}

	uploadFile(url, file, onSuccess, onFailure, onUploadProgress, options = {}) {
		options.headers = {
			"Content-Type": "multipart/form-data"
		};
		var formData = new FormData();
		formData.append("file", file);
		this.request(HTTPMethod.POST, url, formData, onSuccess, onFailure, onUploadProgress, options);
	}

	request(method, url, data, onSuccess, onFailure, onUploadProgress, options) {
		if (HTTPMethod[method] === undefined) {
			console.error("HTTP Method " + method + " is not valid.");
			return;
		}

		const requestConfig = {
			url: url,
			method: method
		};

		if (options === undefined || options === null) {
			console.warn("Request options was null, by default it should be an empty object {}");
		} else if (options["headers"] !== undefined) {
			requestConfig.headers = options.headers;
		}

		if (data !== undefined && data !== null) {
			if (method === HTTPMethod.POST || method === HTTPMethod.PATCH || method === HTTPMethod.PUT || method === HTTPMethod.DELETE) {
				requestConfig.data = data;
			} else {
				requestConfig.params = data;
			}
		}

		if (onUploadProgress !== undefined) {
			requestConfig.onUploadProgress = onUploadProgress;
		}

		const cancelTokenSource = axios.CancelToken.source();
		requestConfig.cancelToken = cancelTokenSource.token;

		axios.request(requestConfig).then(response => {
			onSuccess(response);
		}).catch(error => {
			onFailure(error);
		});
		return cancelTokenSource;
	}
}