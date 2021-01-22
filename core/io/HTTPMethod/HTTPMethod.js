/*
 * File: HTTPMethod
 * Version: 1.0.9
 * Project: spacelibs-javascript
 * Description: This enum contains all possible HTTP Method types
 * File Created: Monday, 18th January 2021 3:42 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 21st January 2021 3:30 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

/**
 * Module representing HTTP Request methods
 * @module HTTPMethod
 * @property {string} GET For get requests
 * @property {string} POST For post requests
 * @property {string} PUT For put requests
 * @property {string} DELETE For delete requests
 * @property {string} PATCH For patch requests
 * @property {string} HEAD For head requests
 * @property {string} TRACE For trace requests
 * @property {string} OPTIONS For options requests
 * @property {string} CONNECT For connect requests
*/
const HTTPMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  HEAD: 'HEAD',
  TRACE: 'TRACE',
  OPTIONS: 'OPTIONS',
  CONNECT: 'CONNECT'
};

export default HTTPMethod;