/*
 * File: /src/core/io/BaseHTTPService/__mocks__/axios.js
 * Version: 0.0.1
 * Project: spacelibs-js
 * Description: This is a mock for the axios service
 * File Created: Thursday, 28th January 2021 1:35 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Friday, 29th January 2021 3:29 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

module.exports = {
    get: jest.fn((url) => {
        if (url === '/something') {
            return Promise.resolve({
                data: 'data'
            });
        }
    }),
    post: jest.fn((url) => {
        if (url === '/something') {
            return Promise.resolve({
                data: 'data'
            });
        }
        if (url === '/something2') {
            return Promise.resolve({
                data: 'data2'
            });
        }
    }),
    create: jest.fn(function () {
        return this;
    }),
    CancelToken: {
        source: function () {
            return {
                token: "test"
            };
        }
    },
    request: async (data) => {
        let headers = null;
        let file = null;
        if(data.params) {
            if(data.params.error)
                throw "BOOM";
        }

        if(data.headers) {
            headers = data.headers
        }
        
        if(data.data) {
            file = data.data
        }

        return Promise.resolve({
            data: {
                file: file,
                headers: headers,
                success: true,
                message: "The request was successful"
            }
        })
    }
};