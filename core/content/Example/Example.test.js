/*
 * File: Example.test
 * Version: 1.0.7
 * Project: spacelibs-javascript
 * Description: Example test for a spacelibs-js module
 * File Created: Wednesday, 20th January 2021 3:15:07 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 20th January 2021 3:56:20 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	---------------------------------------------------------
 */

import Example from './Example';


it("Does something", () => {
  var example = new Example();
  expect(example.test()).toBe("hello");
});
 