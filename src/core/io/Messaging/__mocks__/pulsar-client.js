/*
 * File: /src/core/io/BaseHTTPService/__mocks__/axios.js
 * Version: 0.0.1
 * Project: spacelibs-js
 * Description: This is a mock for the axios service
 * File Created: Thursday, 28th January 2021 1:35 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 2nd February 2021 2:51 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

module.exports = {
    Client: jest.fn((config) => {
        if (config) {
            return {
                subscribe: jest.fn((subConfig) => {
                    return {close: jest.fn()}
                }),
                close: jest.fn(),
                createProducer: jest.fn((pConfig) => {
                    return {close: jest.fn(), send: jest.fn((data) => { return "mId"}), flush: jest.fn()}
                })
            };
        }
    }),
    AuthenticationToken: jest.fn((args) => {
        if(args.token) {
            return Promise.resolve({})
        }
    })
}