/*
 * File: /src/core/content/Example/Example.test.js
 * Version: 0.0.1
 * Project: spacelibs-js
 * Description: Example test for a spacelibs-js module
 * File Created: Thursday, 28th January 2021 1:35 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Friday, 29th January 2021 3:30 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import Example from './Example';


it("Does something", () => {
  var example = new Example();
  expect(example.test()).toBe("hello");
});
 